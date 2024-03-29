const Client = require("../models/Client");

module.exports.client_index = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.client_details = async (req, res) => {
  try {
    const client = await Client.findOne({id: req.params.id});
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.client_create = async (req, res,) => {
  const client = new Client({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newclient = await Client.save();
    res.status(201).json(newclient);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.client_update = async (req, res) => {
  try {
    const updatedclient = await Client.findOneAndUpdate({id: req.params.id}, req.body, {new: true});
    res.status(200).json(updatedclient);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.client_delete = async (req, res) => {
  try {
    await Client.findOneAndDelete({id: req.params.id});
    res.status(204).json({message: 'client deleted'});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}