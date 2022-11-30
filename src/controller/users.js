const { response } = require("../helpers/common");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../helpers/auth");
const email = require("../middlewares/email");
const ModelUsers = require("../model/users");
const Port = process.env.PORT;
const Host = process.env.HOST;
const cloudinary = require("../config/cloudinary");

const userController = {
  insert: async (req, res) => {
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (users) {
      return response(
        res,
        404,
        false,
        "EMAIL ALREADY REGISTERED",
        "REGISTER FAILED"
      );
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
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    if (users.verif == 0) {
      return response(res, 404, false, null, " email not verified");
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, "wrong password");
    }
    delete users.password;
    delete users.otp;
    delete users.auth;
    let payload = {
      email: users.email,
      id: users.id_users,
    };
    users.token = generateToken(payload);
    res.cookie("jwt", users.token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    response(res, 200, false, [], "LOGIN SUCCESS");
  },
  getDetailUsers: (req, res) => {
    ModelUsers.detailUser(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  updatePhoto: async (req, res) => {
    // let auth = req.headers.authorization;
    // let token = auth.split(" ")[1];
    // let decode = jwt.verify(token, key);
    // const id_user = decode.id;

    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "food",
    });
    // getting url for db
    req.body.photo = image.url;
    ModelUsers.updatePhoto(req.params.id, req.body)
      .then((result) =>
        response(res, 200, false, result, "Update Foto Berhasil")
      )
      .catch((err) => response(res, 400, false, err, "Update Foto Gagal"));
  },
};

exports.userController = userController;
