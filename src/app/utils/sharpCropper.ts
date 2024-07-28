import sharp from 'sharp'
import { Crop } from 'react-image-crop'

/**
 * 
 * @param image 
 * @param CroppingDetails 
 * @param width 
 * @param height 
 * @returns 
 */
export async function sharpImageCrop(image: ArrayBuffer, CroppingDetails: Crop, width:number, height:number) {


    console.log(CroppingDetails)

    const left = Math.round(CroppingDetails.x)
    const top = Math.round(CroppingDetails.y)
    const croppingWidth = Math.round(CroppingDetails.width)
    const croppingHeight = Math.round(CroppingDetails.height)
    
    const resizedImage = sharp(image)
        .extract({
            left: left,
            top: top,
            width: croppingWidth,
            height: croppingHeight
        })
        .resize({width:width, height:height})
        .toBuffer()

    return resizedImage
}
