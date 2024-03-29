const Client = require("../models/Client");

module.exports.loan_index = async (req, res) => {
  try {
    const clientLoans = await Client.findOne({id: req.params.id}).select('id loans');
    res.status(200).json(clientLoans);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.loan_create = async (req, res,) => {
  try {
    const client = await Client.findOneAndUpdate({id: req.params.id}, {$push: {loans: req.body}}, {new: true});
    res.status(201).json(client.loans);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.loan_update = async (req, res) => {
  try {
    const updatedclient = await Client.findOneAndUpdate({
      id: req.params.id,
      "loans.loanId": req.params.loan
    }, req.body, {new: true}).select('id loans');
    res.status(200).json(updatedclient);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.loan_delete = async (req, res) => {
  try {
    const client = await Client.findOne({id: req.params.id});
    client.loans = client.loans.filter(loan => loan.loanId !== req.params.loan);
    await client.save();
    res.status(204).json({message: 'loan deleted'});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}