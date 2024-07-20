"use client"
import React, { useState, useRef } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { useDebounceEffect } from './useDebounceEffect'
import { canvasPreview } from './canvasPreview'

//CSS Styles imports
import styles from '../../css/gallery-box.module.css'
import 'react-image-crop/dist/ReactCrop.css'

//Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { setCropperStatus, addGalleryFile } from '@/app/redux/gallerySlice'
import { GalleryFile } from '@/app/types/types'



// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number,aspect: number,) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

interface MyProps {
  ownerId:string
  galleryId:string
  imgSrc:string
}

export default function ImageCropper(props:MyProps) {
  
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(200 / 150)


  const dispatch = useDispatch()

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob)

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  const captureImage = (canvas: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/webp', 0.7);
    });
  };

  const uploadImage = async (imageBlob:Blob) => {
    const formData = new FormData();
    formData.append('file', imageBlob, props.imgSrc);
    formData.append("ownerId", props.ownerId);
    formData.append("galleryId", props.galleryId as string);
  
    const response = await fetch('/api/aws-upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json()

    console.log(result)
  
    return result
  };

  const handleUpload = async () => {

    interface resultType{
      message:string;
      images:GalleryFile[]
    }

    try {
      const canvas = previewCanvasRef.current as HTMLCanvasElement;
      const imageBlob = await captureImage(canvas);
      const result:resultType = await uploadImage(imageBlob);
      console.log('Image uploaded successfully:', result);
      dispatch(addGalleryFile(result.images[0]))
      dispatch(setCropperStatus(false))
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className={styles.cropperContainer} style={{background:'white'}}>
      <div className={styles.cropControls}>
        <div>
          <label htmlFor="scale-input">Zoom </label>
          <input
            id="scale-input"
            type="range"
            min='0.1'
            max='5'
            step="0.1"
            value={scale}
            disabled={!props.imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="range"
            min='-180'
            max='180'
            value={rotate}
            disabled={!props.imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
       
        </div>
      </div>
      <div className={styles.cropperImages}>
        {/* This represents the image cropper after you select an image */}
        < div className={styles.cropper}>
          {!!props.imgSrc && (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={200/150}
                    minWidth={200}
                    minHeight={150}
                    // circularCrop
                  >
                    <img
                      ref={imgRef}
                      alt="Crop me"
                      src={props.imgSrc}
                      style={{ width:'100%', transform: `scale(${scale}) rotate(${rotate}deg)` }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
          )}
        </div>
       
              {/* This represents the cropped image preview */}
              <div className={styles.previewContainer}>
                {!!completedCrop && (
                    
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          objectFit: 'contain',
                          width: completedCrop.width,
                          height: completedCrop.height,
                        }}
                      />
                  
                )}
              </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.saveBtn} onClick={handleUpload}>Save Image</button>
          <button className={styles.cancelBtn} onClick={()=> dispatch(setCropperStatus(false))}>Cancel</button>
        </div>
    </div>
  )
}