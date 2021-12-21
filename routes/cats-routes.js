const express = require("express");

const catsController = require("../controllers/cats-controllers");

const router = express.Router();

router.get("/", catsController.getCats);
router.post("/", catsController.createCat);
router.get("/:id", catsController.getCatById);
router.put("/:id", catsController.putCatById);
router.delete("/:id", catsController.deleteCatById);

module.exports = router;
