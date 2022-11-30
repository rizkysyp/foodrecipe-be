require("dotenv").config();
const ModelRecipes = require("./../model/recipes");
const { response } = require("./../helpers/common");
const cloudinary = require("../config/cloudinary");

const recipesController = {
  insert: async (req, res) => {
    try {
      const { id_users } = req.payload;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });
      req.body.photo = image.url;
      console.log(id_users);
      await ModelRecipes.addRecipes(req.body, id_users);
      return response(res, 200, true, req.body, "INPUT RECIPES SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "input data fail");
    }
  },
};

exports.recipesController = recipesController;
