const Pool = require("../config/db");

const addRecipes = ({ name, photo, video, description }, id_users) => {
  console.log(id_users, "id model");
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO recipes(recipes_name,photo,video,description,id_users) VALUES ('${name}','${photo}','${video}','${description}','${id_users}')`,
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

const updateRecipes = (id, { name, photo, video, description }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE recipes SET recipes_name='${name}',photo='${photo}',video='${video}',description='${description}' WHERE id_recipes='${id}'`,
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

const saveRecipes = ({ id_resep }, id_users) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO bookmarks(id_users,id_recipes) VALUES ('${id_users}','${id_resep}')`,
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
const sort = ({ limit, offset, sort, sortby, search }) => {
  console.log(limit, offset, sort, sortby);
  return Pool.query(
    `SELECT recipes.id_recipes, recipes.recipes_name, recipes.photo from recipes WHERE (recipes.recipes_name) ILIKE ('%${search}%') 
    ORDER BY recipes.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `
  );
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
  sort,
};
