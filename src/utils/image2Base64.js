export default function image2base64(file, cb) {
  let base64 = "";
  if (!file) return base64;
  const reader = new FileReader();
  reader.onload = (e) => {
    base64 = e.target.result;
    cb(base64);
  };
  reader.readAsDataURL(file);
}
