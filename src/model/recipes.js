const Pool = require("../config/db");

const addRecipes = ({ recipes_name, photo, video, description, id_users }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO recipes(recipes_name,photo,video,description,id_users) VALUES ('${recipes_name}','${photo}','${video}','${description}','879a0ec0-ba39-4966-b5d1-45f1fed62a80')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateRecipes = (id, { recipes_name, photo, video, description }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE recipes SET recipes_name='${recipes_name}',photo='${photo}',video='${video}',description='${description}' WHERE id_recipes='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteRecipes = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `DELETE FROM recipes WHERE id_recipes='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const detailRecipes = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM recipes WHERE id_recipes='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const recipeUsers = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM recipes WHERE id_users='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const addComents = ({ id_users, id_recipes, comments }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO comments(comments,id_users,id_recipes) VALUES ('${comments}','${id_users}','${id_recipes}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const saveRecipes = ({ id_users, id_recipes }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO bookmarks(id_users,id_recipes) VALUES ('${id_users}','${id_recipes}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getComents = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT users.name,comments.comments from comments, users WHERE id_recipes='${id}' AND comments.id_users=users.id_users`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getBookmark = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT recipes.recipes_name, recipes.photo from bookmarks,recipes WHERE bookmarks.id_users='${id}' AND bookmarks.id_recipes=recipes.id_recipes;
      `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
module.exports = {
  addRecipes,
  updateRecipes,
  deleteRecipes,
  detailRecipes,
  recipeUsers,
  addComents,
  getComents,
  saveRecipes,
};
