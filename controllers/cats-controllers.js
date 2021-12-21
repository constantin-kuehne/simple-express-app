const mongoose = require("mongoose");
const createError = require("http-errors");

const Cat = require("../models/cat");

const getCats = async (req, res, next) => {
  Cat.find({})
    .then((cats) =>
      res.render("cats-get-all", { title: "Liste der Katzen", cats: cats })
    )
    .catch((err) =>
      next(createError(500, "Something went wrong, please try again later."))
    );
};

const getCatById = async (req, res, next) => {
  const catId = req.params.id;
  Cat.findById(catId)
    .then((cat) => {
      if (!cat) {
        return next(createError(404, `Cannot find cat with id "${catId}"`));
      }
      res.render("cats-get-one", { title: `Katze mit Id ${catId}`, cat: cat });
    })
    .catch((err) =>
      next(createError(500, "Something went wrong, please try again later."))
    );
};

const createCat = async (req, res, next) => {
  console.log(req.body);
  const { name, owner } = req.body;
  const createdCat = new Cat({ name, owner });
  createdCat
    .save()
    .then((cat) => res.redirect(`/cats/${createdCat.id}`))
    .catch((err) => next(createError(500, `Creating cat "${name}" failed`)));
};

const deleteCatById = async (req, res, next) => {
  const catId = req.params.id;
  const cat = await Cat.findByIdAndDelete(catId);
  res.send(`Done ${cat}`);
};

const putCatById = async (req, res, next) => {
  const catId = req.params.id;
  const { name, owner } = req.body;
  const cat = await Cat.findByIdAndUpdate(catId, { name, owner });
  res.send(`Done ${cat}`);
};

exports.getCats = getCats;
exports.getCatById = getCatById;
exports.createCat = createCat;
exports.deleteCatById = deleteCatById;
exports.putCatById = putCatById;
