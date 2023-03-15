const { User } = require("../../db");
const joinsFunction = require("../../helpers/joinsFunction");

module.exports = getUsers = async (req, res) => {
  try {
    const { name } = req.query;
    if( name ){
      const users = await User.findAll({where: { name: name }});
      if(users){
        return res.status(200).send(users);
      } else {
        return res.status(200).send({ message: "It was not found" });
      }
    } else {
    const uses = await User.findAll();
    if (uses) {
      res.status(200).send(uses);
    } else {
      res.status(200).send({ message: "No users" });
    }
  }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
