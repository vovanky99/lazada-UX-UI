import axios from 'axios';

export default async function CldUploadImg(data, handleUploadProgress = () => {}, signature) {
  const cloud_name = process.env.REACT_APP_CLOUDINARY_NAME;
  const cloud_key = process.env.REACT_APP_CLOUDINARY_KEY;
  const cloud_secret = process.env.REACT_APP_CLOUDINARY_SECRET;
  const cloud_preset = process.env.REACT_APP_CLOUDINARY_PRESET_IMAGES;
  data.append('upload_preset', `${cloud_preset}`);
  data.append('signature', signature);
  try {
    axios.defaults.withCredentials = '';
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload?api_key=${cloud_key}&api_secret=${cloud_secret}&return_delete_token=true&timestamp=173719931`,
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
