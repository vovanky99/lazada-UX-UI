import CldUploadImg from '../cloudinary/CldUploadImg';

export default function UploadTinyMCE(callback, value, meta) {
  const input = document.createElement('input');
  if (meta.filetype === 'image') {
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', function (e) {
      const files = e.target.files[0];
      const data = new FormData();
      data.append('file', files);
      const reader = new FileReader();
      reader.onload = (e) => {
        CldUploadImg(data)
          .then((result) => {
            callback(result.url, { alt: files.name });
            console.log(result);
          })
          .catch((e) => console.log(e));
      };
      reader.readAsDataURL(files);
    });
  }
}
