import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "ticktocktreasure",
  api_key: "675972988826879",
  api_secret: "taB9BmTM0vUbLocHNmiKYjvxYjE",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export const uploads = (image) => {
  console.log(image);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        resolve(result.secure_url);
      } else {
        console.log(error.message);
        reject({ message: error.message });
      }
    });
  });
};
