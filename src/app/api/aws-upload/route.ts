
import { NextRequest, NextResponse } from "next/server";
import { S3Client,  ListObjectsCommand,  PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = 's3-restaurant-menu-maker'
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
});

// endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}


// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const responses = await Promise.all(
    files.map(async (file) => {
      const Body = await file.arrayBuffer();
      const Key = file.name;

      // Upload the file to S3
      const response = await s3.send(new PutObjectCommand({ Bucket, Key, Body }));

      // Construct the URL for the uploaded file
      const fileUrl = `https://${Bucket}.s3.amazonaws.com/${encodeURIComponent(Key)}`;
      console.log("Uploaded file URL:", fileUrl);

      return fileUrl;
    })
  );

  console.log("All files uploaded:", responses);

  return NextResponse.json(responses[0]);
}