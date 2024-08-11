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
 * @param finalWidth 
 * @param finalHeight 
 * 
 * @returns 
 */
export async function sharpImageCrop(image: ArrayBuffer, CroppingDetails: Crop, originalResolution: Resolution, finalWidth: number, finalHeight: number) {
    try {
        console.log('Original Resolution');
        console.log(originalResolution);
        console.log('Cropping:');
        console.log(CroppingDetails);

        const left = Math.round(CroppingDetails.x);
        const top = Math.round(CroppingDetails.y);
        const croppingWidth = Math.round(CroppingDetails.width);
        const croppingHeight = Math.round(CroppingDetails.height);

        console.log('Cropping Image...');
        const croppedImage = await sharp(image)
            .resize({ width: originalResolution.width, height: originalResolution.height })
            .extract({
                left: left,
                top: top,
                width: croppingWidth,
                height: croppingHeight
            })
            .toBuffer();

        console.log('Resizing and Optimizing Image...');
        const optimizedImage = await sharp(croppedImage)
            .resize({ width: finalWidth, height: finalHeight })
            .webp({ quality: 100 }) // You can adjust the quality as needed
            .toBuffer();

        const imageSize = Buffer.byteLength(optimizedImage);
        console.log(`Optimized Image Size: ${imageSize} bytes`);

        return optimizedImage;
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
