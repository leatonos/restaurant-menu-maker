'use client'
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";
import React, { useEffect, useState } from 'react';
import styles from '../../css/gallery-box.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { getGallery } from '@/app/server-actions/get-gallery';
import Image from 'next/image';
import DeleteImage from '../../../../public/trash.svg'
import { Gallery, GalleryFile } from '@/app/types/types';

interface MyProps {
    ownerId:string
}

interface GalleryItemProps {
    item:GalleryFile
}


export default function UserGallery( props: MyProps ){
    const [gallery,setGallery] = useState<Gallery | undefined>(undefined)
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

    async function uploadDocuments(url: string, { arg }: { arg: { files: FileWithPath[] } }){
        const body = new FormData();
        arg.files.forEach((file) => {
          body.append("file", file, file.name);
        });
      
        body.append("ownerId", props.ownerId);
        body.append("galleryId", gallery?._id as string);


        const response = await fetch(url, { method: "POST", body });
        const result = await response.json()
        if(result){
            updateGallery(props.ownerId)
        }
        console.log(result)
      }
    const { trigger } = useSWRMutation("/api/aws-upload", uploadDocuments);


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
        <div className={styles.galleryBox} style={{color:"black"}}>
            <header className={styles.galleryHeader}>
            </header>
            <main className={styles.galleryMainContainer}>
                <aside className={styles.galleryNavigation}>
                    <h2>Navigation</h2>
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
                        <Dropzone onDrop={(files) => trigger({ files })}>
                            <button className={styles.uploadBtn}>Upload</button>
                        </Dropzone>
                    </div>
                </div>
                <div className={styles.galleryItemDetails}>
                    {selectedFiles && <>
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
                            <button onClick={() => deleteSelectedFiles(selectedFiles)} className={styles.deleteBtn}>Delete</button>
                            <button className={styles.selectBtn}>Select Image</button>
                        </div>
                    </>}
                    
                </div>
            </main>
        </div>
       )
        
    )

}