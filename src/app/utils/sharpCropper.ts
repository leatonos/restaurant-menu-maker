import sharp from 'sharp'
import { Crop } from 'react-image-crop'
import { Resolution } from '../types/types'

/**
 * Gets an ArrayBuffer and crops the image returns a Buffer
 * you can use this buffer to send it to AWS
 * 
 * @param image 
 * @param CroppingDetails 
 * @param width 
 * @param height 
 * 
 * @returns 
 */
export async function sharpImageCrop(image: ArrayBuffer, CroppingDetails: Crop, originalResolution:Resolution, finalWidth:number, finalHeight:number) {


    console.log('Original Resolution')
    console.log(originalResolution)
    console.log('Cropping:')
    console.log(originalResolution)

    const left = Math.round(CroppingDetails.x)
    const top = Math.round(CroppingDetails.y)
    const croppingWidth = Math.round(CroppingDetails.width)
    const croppingHeight = Math.round(CroppingDetails.height)
    console.log('Cropping Image...')
    const resizedImage = sharp(image)
        .resize({width:originalResolution.width, height:originalResolution.height})
        .extract({
            left: left,
            top: top,
            width: croppingWidth,
            height: croppingHeight
        })
        .resize({width:250, height:200})
        .toBuffer()

    return resizedImage
}
