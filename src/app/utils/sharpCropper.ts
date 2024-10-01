import sharp from 'sharp';
import { Crop } from 'react-image-crop';
import { Resolution } from '../types/types';

/**
 * Gets an ArrayBuffer and crops the image, then returns a Buffer
 * you can use this buffer to send it to AWS
 * 
 * @param image 
 * @param CroppingDetails 
 * @param originalResolution 
 * @param artificialResolution 
 * @param finalWidth 
 * @param finalHeight 
 * 
 * @returns 
 */
export async function sharpImageCrop(image: ArrayBuffer, CroppingDetails: Crop, originalResolution: Resolution, artificialResolution:Resolution ,finalWidth: number, finalHeight: number) {
    try {
        console.log('Original Resolution');
        console.log(originalResolution);
        console.log('Artificial Res:');
        console.log(artificialResolution);
        console.log('Cropping:');
        console.log(CroppingDetails);

        const YRatio = originalResolution.height/artificialResolution.height
        const XRatio = originalResolution.width/artificialResolution.width

        const left = Math.round(CroppingDetails.x * XRatio);
        const top = Math.round(CroppingDetails.y * YRatio);
        const croppingWidth = Math.round(CroppingDetails.width * XRatio);
        const croppingHeight = Math.round(CroppingDetails.height * YRatio);

        console.log('Cropping Image...');
        const croppedImage = await sharp(image)
            //.resize({ width: originalResolution.width, height: originalResolution.height })
            .extract({
                left: left,
                top: top,
                width: croppingWidth,
                height: croppingHeight
            })
            .toBuffer();

        return croppedImage;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error processing image:', error);
            throw new Error(`Error processing image: ${error.message}`);
        } else {
            console.error('Unknown error processing image:', error);
            throw new Error('Unknown error processing image');
        }
    }
}
