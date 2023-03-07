const { Food } = require("../../db");
const foods = require("../../fileTemp");

module.exports = getFoods = async (req, res) => {
  try {
    const { name } = req.query;
    let resp = [];
    let rep = [];
    if (name) {
      resp = [];
      let mape = foods.map(
        (i) =>
          (de = {
            id: i.id,
            available: i.available,
            type: i.type,
            name: joins(name, i.name),
            fat: i.fat,
            image: i.image,
            review: i.review.map((j) => j.name),
            sodium: i.sodium,
            sugar: i.sugar,
            price: i.price,
            description: i.description,
            discount: i.discount,
            qualification: i.qualification,
            amount: i.amount,
          })
      );
      const filds = mape.filter((e) => e.name !== "Not found");
      const users = await Food.findAll();
      let mape2 = users.map(
        (i) =>
          (de = {
            id: i.id,
            available: i.available,
            type: i.type,
            name: joins(name, i.name),
            fat: i.fat,
            image: i.image,
            review: i.review.map((j) => j.name),
            sodium: i.sodium,
            sugar: i.sugar,
            price: i.price,
            description: i.description,
            discount: i.discount,
            qualification: i.qualification,
            amount: i.amount,
          })
      );
      const fild = mape2.filter((e) => e.name !== "Not found");
      if (fild.length > 0) {
        for (var i = 0; i < fild.length; i++) {
          resp.push(fild[i]);
        }
      }
      if (filds.length > 0) {
        for (var i = 0; i < filds.length; i++) {
          resp.push(filds[i]);
        }
      }
      if (resp.length < 1) {
        resp[0] = { message: "Not found by that name" };
      }
      return res.status(200).send(resp);
    }
    rep = [];
    const uses = await Food.findAll();
    if (uses.length > 0) {
      for (var i = 0; i < uses.length; i++) {
        rep.push(uses[i]);
      }
    }
    if (foods.length > 0) {
      for (var i = 0; i < foods.length; i++) {
        rep.push(foods[i]);
      }
    }
    res.status(200).send(rep);
  } catch (error) {
    res.status(400).send(error.message);
  }
};