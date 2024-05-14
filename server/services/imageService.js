const { cloudinary } = require("../config/cloudinary");
const { CLOUDINARY_STORAGE } = require("../config/config");

async function uploadImage(image,width=800) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(
        image,
        {
          upload_preset: CLOUDINARY_STORAGE,
        },
        { quality: "auto" }
      );
  
      let imageUrl = uploadResponse.url;
      let index = imageUrl.indexOf("upload/") + 6;
  
      let compressedImg =
        imageUrl.substring(0, index) +
        "/c_fit,q_auto,f_auto,w_"+width +
        imageUrl.substring(index);
  
      return compressedImg;
    } catch (err) {
      console.log(err);
    }
  }

module.exports = {
    uploadImage,
};
  