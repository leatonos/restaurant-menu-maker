import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import AWS from 'aws-sdk';

interface ImageCropperProps {
  bucketName: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

const EasyImageCropper: React.FC<ImageCropperProps> = ({
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any | null>(null);

  const onCropChange = useCallback((crop: any) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleCrop = useCallback(async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);

      // Upload to S3
      const s3 = new AWS.S3({
        accessKeyId,
        secretAccessKey,
        region,
      });
      const params = {
        Bucket: bucketName,
        Key: 'cropped-image.jpg', // Replace with desired key
        Body: croppedImage, // Assuming croppedImage is a Blob
        ContentType: 'image/jpeg', // Adjust content type as needed
      };
      try {
        await s3.upload(params).promise();
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, [image, croppedAreaPixels, getCroppedImg, bucketName, region, accessKeyId, secretAccessKey]);

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      )}
      <button onClick={handleCrop}>Crop and Upload</button>
    </div>
  );
};

export default EasyImageCropper;
