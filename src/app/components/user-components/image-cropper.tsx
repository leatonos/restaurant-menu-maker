"use client"
import React, { useState, useRef } from 'react'
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import { useDebounceEffect } from './useDebounceEffect'
import { canvasPreview } from './canvasPreview'
import { Resolution } from '@/app/types/types'
import imageCompression from "browser-image-compression";


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
import getImageDimensions from '@/app/utils/imageDimensions'



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
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(250 / 200)
  const [originalResolution, setOriginalRes] = useState<Resolution>({width:0,height:0})
  const [artificialResolution, setArtificialRes] = useState<Resolution>({width:0,height:0})
  const [saveBtnDisabled, setSaveBtnState] = useState<boolean>(false)
  const [saveBtnText, setSaveBtnText] = useState<string>('Save Image')
  const [status, setLogStatus] = useState<string>('')


  const dispatch = useDispatch()

  async function onImageLoad (e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
      setArtificialRes({
        width:width,
        height:height
      })
    }

    const result = await getImageDimensions(props.imgFile)
    setOriginalRes(result)

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

  const compressedFile = async (file: File) => {
     const options = {
        maxSizeMB: .2, // target compressed size
        maxWidthOrHeight: 300, // resize to standard
        useWebWorker: true,
      };

      const newFile = await imageCompression(file, options);
      console.log("Compressed file size:", file.size / 1024, "KB");

      return newFile;
  }


  const uploadOriginalImage = async (fileImage:File) => {
  
    setLogStatus(`Sending: ${JSON.stringify(props.imgFile)}`)

    // Check if the file size exceeds 1MB then compress files
    if(fileImage.size > 1 * 1024 ** 2) {
      setLogStatus('This image quite big... compressing file...')
      setSaveBtnText('Compressing Image...')
      
     const newFileImage = await compressedFile(fileImage)

     fileImage = newFileImage;

    console.log(`Compressed file size: ${newFileImage.size / 1024} KB`)

    }
    
    const formData = new FormData();
    
    console.log(`File to upload: ${fileImage.name} Size: ${fileImage.size / 1024} KB`)
    formData.append('file', fileImage, props.imageName);
    
    formData.append("owner_id", props.ownerId);
    formData.append("gallery_id", props.galleryId as string);
    
    const cropInfo = crop as Crop

    formData.append("left_pct", ((Math.floor(cropInfo.x))).toString());
    formData.append("top_pct", ((cropInfo.y)).toString());
    formData.append("right_pct", (((cropInfo.x) + (cropInfo.width))).toString());
    formData.append("bottom_pct", (((cropInfo.y) + (cropInfo.height))).toString());

    setSaveBtnText('Uploading Image...')
  
    const response = await fetch('https://qv6blssxqprcervltkvk334vsu0zehpb.lambda-url.us-east-2.on.aws/crop', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      setLogStatus(`${JSON.stringify(response)}`)
      setSaveBtnText('Failed to upload image')
      throw new Error('Failed to upload image');
    }else {
      setLogStatus('Image uploaded successfully')
      setSaveBtnText('Image uploaded!')
    }

    const result = await response.json()
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
      setLogStatus('Attepmting sending image...')
      const rawData = await uploadOriginalImage(props.imgFile);
      const result = JSON.parse(rawData.body)
      console.log(result)
      setSaveBtnState(false);
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
        <p>TOP:{crop?.y} Bottom:{((crop?.y ?? 0) + (crop?.height ?? 0))}</p>
        <p>RIGHT:{((crop?.x ?? 0) + (crop?.width ?? 0))} Left:{(crop?.x ?? 0)}</p>
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
        </div>
      </div>
      <div className={styles.cropperImages}>
       
        {/* This represents the image cropper after you select an image */}
        <div className={styles.cropper}>
          {!!props.imgSrc && (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, pixelCrop) => setCrop(pixelCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    minWidth={25}
                    minHeight={20}
                    // circularCrop
                  >
                  <img
                    ref={imgRef}
                    className={styles.originalImage}
                    alt="Crop me"
                    src={props.imgSrc}
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
                    width: completedCrop.width,
                    height: completedCrop.height,
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