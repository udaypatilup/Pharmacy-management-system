
const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');

router.post('/customer', async (req, res) => {
  try {
    const {  name,mobileNumber,email,address } = req.body;
    // Check if the id already exists
    const existingId = await Customer.findOne({ mobileNumber });
    if (existingId) {
      return res.status(400).json({ message: 'MobileNumber already exists' });
    }

    // Adds a new book
    const newCustomer = new Customer({ name,mobileNumber,email,address });
    await newCustomer.save();

    res.status(201).json({ success:true,message: 'Customer Added successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/customers', async (req, res) => {
  try {
    // Retrieve all medicines from the database
    const customers = await Customer.find();

    // Check if there are any medicines
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: 'No medicines found' });
    }

    // Return the medicines
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/customer/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({ userID: req.params.id });

    // Check if there are any medicines
    if (!customer || customer.length === 0) {
      return res.status(404).json({ message: 'No medicines found' });
    }

    // Return the medicines
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/customer/:id', async (req, res) => {
  try {
    const id = req.params;
    console.log("REACHED HERE",id)
    const { name, mobileNumber, email, address } = req.body;
    const customer = await Customer.findOne({ userID: req.params.id });
    if (!customer) {
      return res.status(404).json({ message: 'Medicine not found' });
  }
  customer.name = name;
  customer.mobileNumber = mobileNumber;
  customer.email = email;
  customer.address = address;

  // Save the updated medicine back to the database
  await customer.save();

    // Return the medicines
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/customer/:id', async (req, res) => {
  try {
    console.log(req.params)
      // Find the medicine by medicineId and delete it
      const deletedCustomer = await Customer.findOneAndDelete({ userID: req.params.id });
      
      // Check if the medicine was found and deleted
      if (!deletedCustomer) {
          return res.status(404).json({ message: 'Medicine not found' });
      }

      res.status(200).json({ message: 'Medicine deleted successfully', deletedCustomer });
  } catch (error) {
      console.error('Error deleting medicine:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
