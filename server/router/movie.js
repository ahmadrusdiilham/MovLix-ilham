const ControllerMovie = require("../controllers/controller.Movie");
const authentication = require("../midlewares/authentication");

const router = require("express").Router();

router.get("/movies", ControllerMovie.fetchMovie);
router.get("/movies/:id", ControllerMovie.detailMovie);
router.get("/video/:movieId", ControllerMovie.videoMovie);

//authentication
router.use(authentication);
router.post("/mymovies", ControllerMovie.addMyMovie);
router.get("/mymovies", ControllerMovie.fetchMyMovie);
router.post("/generate-midtrans-token", ControllerMovie.midtrans);

module.exports = router;
