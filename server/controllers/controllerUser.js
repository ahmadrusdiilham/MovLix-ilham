const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const url = require("url");
const axios = require("axios");
class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });
      res.status(200).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "email_is_required" };
      }
      if (!password) {
        throw { name: "password_is_required" };
      }
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      const isPasswordValid = comparePassword(password, findUser.password);
      if (!isPasswordValid) {
        throw { name: "invalid_email/password" };
      }
      const access_token = signToken({ id: findUser.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async discordLogin(req, res, next) {
    try {
      const { code } = req.query;
      if (code) {
        const formData = new url.URLSearchParams({
          client_id: process.env.CLIENT_ID_DISCORD,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code.toString(),
          redirect_uri: "https://movlix-deploy.web.app/login",
        });
        const output = await axios.post(
          "https://discord.com/api/oauth2/token",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (output.data) {
          const access = output.data.access_token;

          const userInfo = await axios.get(
            "https://discord.com/api/users/@me",
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
          const [user, isCreated] = await User.findOrCreate({
            where: {
              email: userInfo.data.email,
            },
            defaults: {
              email: userInfo.data.email,
              password: "ini_discord",
            },
            hooks: false,
          });
          const access_token = signToken({
            id: user.id,
          });
          res.status(200).json({ access_token });
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = ControllerUser;
