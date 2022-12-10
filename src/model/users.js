const Pool = require("../config/db");

const createUsers = (data) => {
  const { id_users, email, username, password, phonenumber, token } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO users(id_users,email,name,password,phonenumber,auth,token) VALUES ('${id_users}','${email}','${username}','${password}','${phonenumber}',0,'${token}')`,
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

const checkEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const detailUser = (id) => {
  return Pool.query(
    `SELECT users.name, users.photo,users.phonenumber FROM users WHERE id_users='${id}' `
  );
};
const updatePhoto = (id, { photo }) => {
  return Pool.query(`UPDATE users SET photo='${photo}' WHERE id_users='${id}'`);
};
module.exports = {
  createUsers,
  checkEmail,
  updatePhoto,
  detailUser,
};
