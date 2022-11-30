const Pool = require("../config/db");

const addRecipes = ({ recipes_name, photo, video, description, id_users }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO recipes(recipes_name,photo,video,description,id_users) VALUES ('${recipes_name}','${photo}','${video}','${description}','${id_users}')`,
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
};
