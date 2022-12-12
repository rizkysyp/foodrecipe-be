const { response } = require("../helpers/common");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../helpers/auth");
const email = require("../middlewares/email");
const ModelUsers = require("../model/users");
const Port = process.env.PORT;
const Host = process.env.HOST;
// const cloudinary = require("../config/cloudinary");
// const upload = require("../middlewares/upload");

const userController = {
  insert: async (req, res) => {
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (users) {
      return response(res, 403, false, [], "REGISTER FAILED");
    }
    /// CREATING KODE VERIFIKASI
    let digits = "0123456789";
    let token = "";
    for (let i = 0; i < 6; i++) {
      token += digits[Math.floor(Math.random() * 10)];
    }
    ////CREATE DATA
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id_users: uuidv4(),
      email: req.body.email,
      password,
      username: req.body.name,
      phonenumber: req.body.phonenumber,
      token,
    };

    try {
      const result = await ModelUsers.createUsers(data);
      if (result) {
        console.log(result);
        let sendEmail = await email(
          data.email,
          token,
          `https://${Host}:${Port}/${email}/${token}`,
          data.fullname
        );
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: data.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      let {
        rows: [users],
      } = await ModelUsers.checkEmail(email);
      if (!users) {
        return response(res, 404, false, null, " email not found");
      }
      if (users.auth == 0) {
        return response(res, 404, false, null, "email not verified");
      }
      const password = req.body.password;
      const validation = bcrypt.compareSync(password, users.password);
      const id_users = users.id_users;
      if (!validation) {
        return response(res, 404, false, null, "wrong password");
      }
      // const data = {
      //   email,
      //   token: await generateAccessToken(email, id_users),
      // };
      // res.cookie("token", data.token, {
      //   secure: true,
      //   maxAge: 120000,
      //   httpOnly: true,
      // });
      // return response(res, 200, true, data, "LOGIN SUCCESS");
      //////////////////////////////////////////
      delete users.password;
      delete users.otp;
      delete users.auth;
      let payload = {
        email: users.email,
        id: users.id_users,
      };
      users.token = generateToken(payload);
      res.cookie("user", users.token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });
      response(res, 200, true, users, "LOGIN SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "LOGIN FAILED");
    }
  },
  getDetailUsers: (req, res) => {
    const user = req.payload.id;
    ModelUsers.detailUser(user)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  updatePhoto: async (req, res) => {
    const id_users = req.payload.id;
    console.log(id_users, "ini id coy");
    const {
      photo: [photo],
    } = req.files;

    req.body.photo = photo.path;

    ModelUsers.updatePhoto(id_users, req.body)
      .then((result) =>
        response(res, 200, false, result, "Update Foto Berhasil")
      )
      .catch((err) => response(res, 400, false, err, "Update Foto Gagal"));
  },
  auth: async (req, res, next) => {
    console.log("email", req.body.email);
    console.log("password", req.body.otp);
    let {
      rows: [users],
    } = await ModelUsers.findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, "email not found");
    }
    if (users.token == req.body.otp) {
      const result = await ModelUsers.verification(req.body.email);
      return response(res, 200, true, result, "verification email success");
    }
    return response(res, 404, false, null, "wrong otp please check your email");
  },
};

exports.userController = userController;
