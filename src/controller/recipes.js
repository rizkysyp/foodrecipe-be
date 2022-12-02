require("dotenv").config();
const ModelRecipes = require("./../model/recipes");
const { response } = require("./../helpers/common");
const cloudinary = require("../config/cloudinary");

const recipesController = {
  insert: async (req, res) => {
    try {
      const { id_users } = "879a0ec0-ba39-4966-b5d1-45f1fed62a80";

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
  update: async (req, res, next) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });
      // getting url for db
      req.body.photo = image.url;

      await ModelRecipes.updateRecipes(req.params.id, req.body);
      return response(res, 200, true, req.body, "UPDATE RECIPES SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "UPDATE RECIPSE FAILED");
    }
  },
  delete: async (req, res) => {
    try {
      await ModelRecipes.deleteRecipes(req.params.id);
      response(res, 200, true, [], "delete data success");
    } catch (err) {
      response(res, 404, false, err, "delete data faill");
    }
  },
  detail: async (req, res) => {
    try {
      const comments = await ModelRecipes.getComents(req.params.id);
      const recipes = await ModelRecipes.detailRecipes(req.params.id);

      response(
        res,
        200,
        true,
        [recipes.rows, comments.rows],
        "GET RECIPES DATA SUCCESS"
      );
    } catch (error) {
      response(res, 404, false, error, "GET DATA FAILED");
    }
  },
  recipeUSer: async (req, res) => {
    try {
      const result = await ModelRecipes.recipeUsers(req.params.id);
      response(res, 200, true, result.rows, "INPUT DATA SUKSES");
    } catch (error) {
      response(res, 404, false, error, "GET DATA FAILED");
    }
  },
  addComents: async (req, res) => {
    try {
      const result = await ModelRecipes.addComents(req.body);
      response(res, 200, true, [], "INPUT COMMENT SUCCESS");
    } catch (error) {
      response(res, 404, false, error, "INPUT COMMENT FAILED");
    }
  },
  addBookmark: async (req, res) => {
    try {
      const result = await ModelRecipes.saveRecipes(req.body);
      response(res, 200, true, [], "RECIPES SAVED");
    } catch (error) {
      response(res, 404, false, error, "SAVING RECIPES FAILED");
    }
  },
};

exports.recipesController = recipesController;
