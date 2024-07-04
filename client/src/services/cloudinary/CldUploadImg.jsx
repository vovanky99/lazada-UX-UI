import axios from 'axios';
import { useState } from 'react';

export default async function CldUploadImg(data, handleUploadProgress = () => {}) {
  const cloud_name = process.env.REACT_APP_CLOUDINARY_NAME;
  const cloud_key = process.env.REACT_APP_CLOUDINARY_KEY;
  const cloud_secret = process.env.REACT_APP_CLOUDINARY_SECRET;
  const cloud_preset = process.env.REACT_APP_CLOUDINARY_PRESET_IMAGES;
  data.append('upload_preset', `${cloud_preset}`);
  try {
    axios.defaults.withCredentials = '';
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload?api_key=${cloud_key}&api_secret=${cloud_secret}`,
      data,
      {
        onUploadProgress: handleUploadProgress,
      },
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
