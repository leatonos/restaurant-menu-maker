'use client'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE  } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";
import React, { useEffect, useState } from 'react';
import styles from '../../css/gallery-box.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { getGallery } from '@/app/server-actions/get-gallery';
import { Gallery, GalleryFile } from '@/app/types/types';
import ImageCropper from "./image-cropper";


//Image Imports
import Image from 'next/image';
import DeleteImage from '../../../../public/trash.svg'
import closeImage from '../../../../public/close.svg'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { RestaurantMenu } from "@/app/types/types";
import { ItemChange, ItemReference, setGalleryChangeReference, setItemImage, setLogoImage } from "@/app/redux/menuCreatorSlice";
import { setCropperStatus } from "@/app/redux/gallerySlice";

interface MyProps {
    ownerId:string
    selectingImage:boolean
}

interface GalleryItemProps {
    item:GalleryFile
}



export default function UserGallery( props: MyProps ){
    
    const [gallery,setGallery] = useState<Gallery | undefined>(undefined)
    const [newImageSrc, setNewImageSrc] = useState<string>('')
    const [uploadingStatus,setUploadingStatus] = useState<string>('Upload File')
    const [selectedFiles,setSelectedFiles] = useState<GalleryFile[] | undefined>(undefined)
    
    const calcFileSize = (size:number) =>{
        if (size < 1024) {
            return size + ' bytes';
        } else if (size < 1048576) { // 1024 * 1024
            return (size / 1024).toFixed(2) + ' KB';
        } else {
            return (size / 1048576).toFixed(2) + ' MB';
        }
    }

    const updateGallery = async (ownerId:string) =>{
        const galleryRequest = await getGallery(ownerId) as Gallery
        console.log(galleryRequest)
        setGallery(galleryRequest)
    }

    const deleteSelectedFiles = async(filesToDelete: GalleryFile[]) => {

        const thisGallery = gallery as Gallery

        const deleteRequest = {
            ownerId: props.ownerId,
            galleryId: thisGallery._id as string,
            filesToDelete: filesToDelete
        }

        try {
        const response = await fetch('/api/aws-delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteRequest),
          });
    
          if (response.ok) {
            console.log('File deleted successfully');
            updateGallery(props.ownerId)
            setSelectedFiles(undefined)
          } else {
            console.error('Failed to delete file');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    useEffect(()=>{
        updateGallery(props.ownerId)
    },[])


    //Redux Actions
    const dispatch = useDispatch()
    const galleryState = useSelector((state: RootState)=> state.restaurantCreator.galleryState)
    const cropper = useSelector((state: RootState)=> state.gallery.showCropper
)
    
    const chooseImage = () =>{
        
        if(galleryState.changeReference === "Logo" && selectedFiles){
            dispatch(setLogoImage(selectedFiles[0].fileURL))
            dispatch(setGalleryChangeReference(undefined))
        }else if(selectedFiles){

            const galleryItemRef = galleryState.changeReference as ItemReference
            const ImageItemChange:ItemChange = {
                itemReference: galleryItemRef,
                change: selectedFiles[0].fileURL
            }
            dispatch(setItemImage(ImageItemChange))
            dispatch(setGalleryChangeReference(undefined))
        }

    }

    const openCropper = (files: FileWithPath[]) =>{
        setNewImageSrc(URL.createObjectURL(files[0]))
        dispatch(setCropperStatus(true))
    }

    function GalleryItem(props:GalleryItemProps){
        return(
            <div onClick={()=>setSelectedFiles([props.item])} className={styles.galleryItem}>
                <img src={props.item.fileURL} className={styles.galleryItemImage}/>
            </div>
        )
    }

    if(!gallery){
        return(
            <p style={{color:'white'}}>Loading gallery...</p>
        )
    }

    return (
        gallery &&(
            <>
                {cropper && 
                    <ImageCropper ownerId={props.ownerId} galleryId={gallery?._id as string} imgSrc={newImageSrc}/>
                }
                <div className={styles.galleryBox} style={{color:"black"}}>
                    <header className={styles.galleryHeader}>
                        { props.selectingImage &&
                            <div className={styles.optionsContainer}>
                            <div className={styles.rightSide}>
                                <button onClick={()=>dispatch(setGalleryChangeReference(undefined))} className={styles.smallBtn}>
                                    <Image className={styles.smallIcon} src={closeImage} alt={"Close Gallery"}/>
                                </button>
                            </div>
                            </div>
                        }
                    </header>
                    <main className={styles.galleryMainContainer}>
                        <aside className={styles.galleryNavigation}>
                            <h2>Navigation **Not implemented**</h2>
                            <p>Images</p>
                            <p>Fonts</p>
                        </aside>
                        <div className={styles.galleryItemListContainer}>
                            <div className={styles.galleryList}>
                                {gallery.files.map((file)=>(
                                    <GalleryItem key={file.fileId} item={file} />
                                ))}
                            </div>
                            <div className={styles.galleryUploadArea}>
                                <Dropzone 
                                    onDrop={(files) => openCropper(files)}
                                    accept={IMAGE_MIME_TYPE}
                                    >
                                    <button className={styles.uploadBtn}>Upload</button>
                                </Dropzone>
                            </div>
                        </div>
                        <div className={styles.galleryItemDetails}>
                            {selectedFiles && 
                                <>
                                    <div className={styles.galleryImageContainer}>
                                        <img src={selectedFiles[0].fileURL} className={styles.galleryDescriptionItemImage} />
                                    </div>
                                    <div className={styles.galleryItemInformation}>
                                        <h5>File name:</h5>
                                        <p>{selectedFiles[0].fileName}</p>
                                        <h5>File id:</h5>
                                        <p>{selectedFiles[0].fileId}</p>
                                        <h5>File type:</h5>
                                        <p>{selectedFiles[0].fileType}</p>
                                        <h5>File size:</h5>
                                        <p>{calcFileSize(selectedFiles[0].fileSize)}</p>
                                        <div className={styles.groupButton}>
                                            <button onClick={() => deleteSelectedFiles(selectedFiles)} className={styles.deleteBtn}>Delete</button>
                                            {props.selectingImage &&
                                                <button className={styles.selectBtn} onClick={chooseImage}>Select Image</button>
                                            }
                                        </div>
                                    
                                    </div>
                                </>
                            }
                        </div>
                    </main>
                </div>
            </>
       )
    )
}