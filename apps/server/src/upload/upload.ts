// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
import Multer from 'multer'; 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

const storage = new Multer.memoryStorage();
export const upload = Multer({
  storage
});


export async function uploadHandler(file) {
    try {
        console.log(file)
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      return cldRes
    } catch (error) {
      console.log(error);
      return ({
        message: error.message,
      });
    }
  }
  
