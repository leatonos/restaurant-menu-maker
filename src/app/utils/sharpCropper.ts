import sharp from 'sharp'
import { Crop } from 'react-image-crop'
import { Resolution } from '../types/types'

/**
 * Gets an ArrayBuffer and crops the image returns a Buffer
 * you can use this buffer to send it to AWS
 * 
 * @param image 
 * @param croppingDetails 
 * @param width 
 * @param height 
 * 
 * @returns 
 */
export async function sharpImageCrop(image: ArrayBuffer, croppingDetails: Crop, originalResolution:Resolution, finalWidth:number, finalHeight:number) {


    console.log('Original Resolution')
    console.log(originalResolution)
    console.log('Cropping:')
    console.log(croppingDetails)

    const left = Math.round(croppingDetails.x)
    const top = Math.round(croppingDetails.y)
    const croppingWidth = Math.round(croppingDetails.width)
    const croppingHeight = Math.round(croppingDetails.height)

    const coords = {
        left: left,
        top: top,
        width: croppingWidth,
        height: croppingHeight
    }


    console.log('Cropping Image...')
    
    const croppedImage = await sharp(image)
        .resize({width:originalResolution.width, height:originalResolution.height})
        .extract({
            left: left,
            top: top,
            width: croppingWidth,
            height: croppingHeight
        })
        .toBuffer()

    /*
    
       console.log('Resizing and Optimizing Image...')
        const optimizedImage = sharp(croppedImage)
        .resize({ width: finalWidth, height: finalHeight })
        .webp({ quality: 80 }) // You can adjust the quality as needed
        .toBuffer()

    
    */
 
    return croppedImage

   
}
