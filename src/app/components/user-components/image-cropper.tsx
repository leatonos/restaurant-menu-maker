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
import { Resolution } from '@/app/types/types'

//Images and icons
import Image from 'next/image'
import closeImage from '../../../../public/close.svg'

//CSS Styles imports
import styles from '../../css/gallery-box.module.css'
import 'react-image-crop/dist/ReactCrop.css'

//Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { setCropperStatus, addGalleryFile } from '@/app/redux/gallerySlice'
import { GalleryFile } from '@/app/types/types'
import ItemView from '../menu-view-components/item'



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
  galleryId:string,
  imgSrc:string,
  imgFile:File,
  imageName:string
}

export default function ImageCropper(props:MyProps) {
  
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(250 / 200)
  const [originalResolution, setOriginalRes] = useState<Resolution>({width:0,height:0})
  const [saveBtnDisabled, setSaveBtnState] = useState<boolean>(false)
  const [saveBtnText, setSaveBtnText] = useState<string>('Save Image')
  const [status, setLogStatus] = useState<string>('')


  const dispatch = useDispatch()

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
      setOriginalRes({
        width:width,
        height:height
      })
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

     // Convert Blob to File
    const imageFile = new File([imageBlob], props.imageName, { type: imageBlob.type });
    console.log(imageFile)
   
    const formData = new FormData();
    formData.append('file', imageBlob, props.imageName);
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

  const uploadOriginalImage = async (fileImage:File) => {
  
   const formData = new FormData();
   setLogStatus(`Sending: ${JSON.stringify(props.imgFile)}`)
   formData.append('file', fileImage, props.imageName);
   formData.append("ownerId", props.ownerId);
   formData.append("galleryId", props.galleryId as string);
   formData.append('imageCrop', JSON.stringify(completedCrop))
   formData.append('originalResolution', JSON.stringify(originalResolution))
 
   const response = await fetch('/api/aws-upload-sharp-cropper', {
     method: 'POST',
     body: formData,
   });
 
   if (!response.ok) {
    setLogStatus(`${JSON.stringify(response)}`)
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
      setSaveBtnState(true);
      setSaveBtnText("Uploading Image...")
      //const imageBlob = await captureImage(canvas);
      setLogStatus('Attepmting sending image')
      //const result:resultType = await uploadImage(imageBlob);
      const result:resultType = await uploadOriginalImage(props.imgFile);
      setLogStatus(JSON.stringify(result))
      console.log('Image uploaded successfully:', result);
      setSaveBtnState(false);
      setSaveBtnText("Image uploaded!")
      dispatch(addGalleryFile(result.images[0]))
      dispatch(setCropperStatus(false))
    } catch (error) {
      console.error('Error uploading image:', error);
    }

  };

  return (
    <div className={styles.cropperContainer} style={{background:'white'}}>
       <header className={styles.galleryHeader}>
                <div className={styles.optionsContainer}>
                  <div className={styles.rightSide}>
                      <button onClick={()=> dispatch(setCropperStatus(false))} className={styles.smallBtn}>
                          <Image className={styles.smallIcon} src={closeImage} alt={"Close Cropper"}/>
                      </button>
                  </div>
                </div>
      </header>
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
        <div className={styles.cropper}>
          {!!props.imgSrc && (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    minWidth={200}
                    minHeight={195}
                    // circularCrop
                  >
                    <img
                      ref={imgRef}
                      className={styles.originalImage}
                      alt="Crop me"
                      src={props.imgSrc}
                      style={{transform: `scale(${scale}) rotate(${rotate}deg)`}}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
          )}
        </div>
       
              {/* This represents the cropped image preview */}
              <div className={styles.previewContainer}>
                {!!completedCrop && (
                    <>
                      <p></p>
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          objectFit: 'cover',
                          width: /*completedCrop.width*/'250px',
                          height: /*completedCrop.height*/"200px",
                        }}
                      />
                    </>
                )}
              </div>
      </div>
      
        <div className={styles.buttonWrapper}>
          <button className={styles.saveBtn} disabled={saveBtnDisabled} onClick={handleUpload}>{saveBtnText}</button>
          <button className={styles.cancelBtn} onClick={()=> dispatch(setCropperStatus(false))}>Cancel</button>
        </div>
    </div>
  )
}