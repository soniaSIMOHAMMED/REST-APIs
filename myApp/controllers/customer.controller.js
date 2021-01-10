

const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  console.log(db.customers);
    // Validate request
    if (!req.body.firstname) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
      return;
    }
  
    // Create a Customer
    const customer = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        address : req.body.address,
        age : req.body.age
    };
  
    // Save Customer in the database
    Customer.create(customer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      });
  };

//   exports.create = (req, res) => {
//     let customer = {};

//     try{
//         // Building Customer object from upoading request's body
//         customer.firstname = req.body.firstname;
//         customer.lastname = req.body.lastname;
//         customer.address = req.body.address;
//         customer.age = req.body.age;
    
//         // Save to MySQL database
//         Customer.create(customer).then(result => {    
//             // send uploading message to client
//             res.status(200).json({
//                 message: "Upload Successfully a Customer with id = " + result.id,
//                 customers: [result],
//                 error: ""
//             });
//         });
//     }catch(error){
//         res.status(500).json({
//             message: "Fail!",
//             customers: [],
//             error: error.message
//         });
//     }
// }



exports.findAll = (req, res) => {
    const firstname = req.query.firstname;
    var condition = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : null;
  
    Customer.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Customer.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving customer with id = " + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Customer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update customer with id = ${id}. Maybe customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating customer with id = " + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Customer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "customer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete customer with id = ${id}. Maybe customer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete customer with id = " + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Customer.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} customers were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      });
  };

