const axios = require("axios");
const { MyMovie, User } = require("../models/index");
const midtransClient = require("midtrans-client");
class ControllerMovie {
  static async fetchMovie(req, res, next) {
    try {
      const { page, title } = req.query;
      console.log(title);
      if (!title) {
        const { data } = await axios({
          url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`,
          },
        });
        let popularMovies = data.results.map((el) => {
          return {
            id: el.id,
            title: el.title,
            release_date: el.release_date,
            imageUrl: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
          };
        });
        res.status(200).json(popularMovies);
      } else {
        console.log(title);
        const { data } = await axios({
          url: `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${title}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`,
          },
        });
        let searchMovies = data.results.map((el) => {
          return {
            id: el.id,
            title: el.title,
            release_date: el.release_date,
            imageUrl: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
          };
        });
        res.status(200).json(searchMovies);
      }
    } catch (err) {
      next(err);
    }
  }
  static async detailMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `https://api.themoviedb.org/3/movie/${id}`,
        method: "GET",
        params: {
          language: "en-US",
        },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_KEY}`,
        },
      });
      let detailMovies = {
        id: data.id,
        title: data.title,
        rating: data.vote_average,
        synopsis: data.overview,
        imageUrl: "https://image.tmdb.org/t/p/w500" + data.poster_path,
        genre: data.genres,
        release_date: data.release_date,
      };
      res.status(200).json(detailMovies);
    } catch (err) {
      next(err);
    }
  }
  static async videoMovie(req, res, next) {
    try {
      const { movieId } = req.params;
      const { data } = await axios({
        url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        method: "GET",
        params: {
          language: "en-US",
        },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_KEY}`,
        },
      });
      let dataVideo = data.results.slice(-1).map((el) => {
        return {
          video: `https://www.youtube.com/embed/${el.key}`,
        };
      });
      res.status(200).json(dataVideo);
    } catch (err) {
      next(err);
    }
  }
  static async addMyMovie(req, res, next) {
    try {
      const { movieId, title, release_date, imageUrl } = req.body;
      const newMyMovie = await MyMovie.create({
        movieId,
        title,
        release_date,
        imageUrl,
        UserId: req.user.id,
      });
      res.status(201).json(newMyMovie);
    } catch (err) {
      next(err);
    }
  }
  static async fetchMyMovie(req, res, next) {
    try {
      const myMovies = await MyMovie.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(myMovies);
    } catch (err) {
      next(err);
    }
  }
  static async midtrans(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 25000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerMovie;
