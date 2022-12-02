const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.PHOTO_CLOUD_NAME,
  api_key: process.env.PHOTO_KEY,
  api_secret: process.env.PHOTO_SECRET,
});

const deletePhoto = async (image, type) => {
  cloudinary.uploader.destroy(
    image,
    {
      resource_type: type,
    },
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log(result);
    }
  );
};

module.exports = {
  deletePhoto,
};
