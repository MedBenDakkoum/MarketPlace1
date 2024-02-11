const User = require("../models/User");
const Store = require("../models/Store");
const Admin = require("../models/Admin");
const { cloudinary } = require("../config/cloudinary");
const { CLOUDINARY_STORAGE } = require("../config/config");

async function getStoreNameById(id) {
  let store = await Store.find({ _id: id }).select("title -_id");
  return store[0].title;
}
async function getSellerStoreById(id) {
  let seller = await User.find({ _id: id });
  return seller[0].idStore;
}
async function getStoreById(id) {
  let store = await Store.find({ _id: id });
  return store[0];
}
async function getSellers() {
  var sellers = await User.find({ isSeller: true }).select("-password");
  for (let i = 0; i < sellers.length; i++) {
    sellers[i] = sellers[i].toJSON();
    let store = await getStoreNameById(sellers[i].idStore);
    sellers[i]["storeName"] = store;
  }
  return sellers;
}

async function addSeller(userData) {
  try {
    let {
      name,
      email,
      gender,
      phoneNumber,
      password,
      repeatPassword,
      isSeller,
      storeName,
      categories,
      line1,
      line2,
      zipcode,
      city,
      country,
      state,
    } = userData;
    let errors = [];
    let checkUser = await User.findOne({ email });
    if (checkUser) errors.push("This email address is already in use; ");
    if (storeName.length == 0) errors.push("Store Name is Required");
    if (categories.length == 0)
      errors.push("At least one categorie is Required");
    if (line1.length == 0) errors.push("Address Line 1 is Required");
    //city, country, state
    if (zipcode.length == 0) errors.push("Zip Code is Required");
    if (country.length == 0) errors.push("Country is Required");
    if (state.length == 0) errors.push("Country is Required");

    if (name.length < 3 || name.length > 50)
      errors.push(
        "Name should be at least 3 characters long and max 50 characters long; "
      );
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false)
      errors.push("Please fill a valid email address; ");
    if (password !== repeatPassword) errors.push("Passwords should match; ");
    if (password.length < 8)
      errors.push("Password should be at least 8 characters long; ");
    if (password.length > 20)
      errors.push("Password should be at max 20 characters long; ");
    if (errors.length >= 1) throw { message: [errors] };
    let newData = {};
    let store = new Store({ title: storeName, categories: categories });
    let storeId = await store.save();
    newData = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      gender: gender,
      isSeller: true,
      idStore: storeId._id,
      address: {
        line1: line1,
        line2: line2,
        zipCode: zipcode,
        city: city,
        country: country,
        state: state,
      },
    };

    let user = new User(newData);
    return await user.save();
  } catch (err) {
    console.error(err);
    return "error";
  }
}
async function getSellerById(id) {
  var seller = await User.find({ _id: id, isSeller: true }).select("-password");
  let sellerStore = await getStoreById(seller[0].idStore);
  seller[0] = seller[0].toJSON();
  seller[0].store = sellerStore;
  return seller[0];
}
async function updateSeller(id, data) {
  try {
    let sellerData = { ...data.seller } || {};
    let storeData = { ...data.store } || {};
    let storeID = await getSellerStoreById(id);
    let rslt1 = await Store.findOneAndUpdate({ _id: storeID }, storeData);
    let rslt2 = await User.findOneAndUpdate(
      { _id: id, isSeller: true },
      sellerData
    );
    return { rslt1, rslt2 };
  } catch (err) {
    console.error(err);
  }
}
async function getAdmin(id) {
  try {
    let a = await Admin.findById(id);
    if (a) {
      return a;
    } else {
      throw { statusCode: 404, message: "No user with this id found" };
    }
  } catch {
    throw { statusCode: 404, message: "No user with this id found" };
  }
}
async function uploadImage(image) {
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
      "/c_fit,q_auto,f_auto,w_800" +
      imageUrl.substring(index);

    return compressedImg;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getSellers,
  getAdmin,
  getSellerById,
  updateSeller,
  uploadImage,
  addSeller,
};
