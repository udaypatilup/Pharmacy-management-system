
const express = require('express');
const router = express.Router();
const Medicine = require('../model/medicine');

router.post('/medicine', async (req, res) => {
  try {
    console.log("REACHED HERE medicine")
    const {  medicineID,name,companyName,quantity,pricePerUnit } = req.body;
    // Check if the id already exists
    const existingId = await Medicine.findOne({ medicineID });
    if (existingId) {
      return res.status(400).json({ message: 'Id already exists' });
    }
    console.log(req.body)
    // Adds a new book
    const newMedicine = new Medicine({ medicineID,name,companyName,quantity,pricePerUnit });
    await newMedicine.save();

    res.status(201).json({ success:true,message: 'Medicine Added successfully' });
  } catch (error) {

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getMedicines', async (req, res) => {
    try {
      // Retrieve all medicines from the database
      const medicines = await Medicine.find();
  
      // Check if there are any medicines
      if (!medicines || medicines.length === 0) {
        return res.status(404).json({ message: 'No medicines found' });
      }
  
      // Return the medicines
      res.status(200).json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/medicines/:id', async (req, res) => {
    try {
      const medicines = await Medicine.findOne({ medicineID: req.params.id });
  
      // Check if there are any medicines
      if (!medicines || medicines.length === 0) {
        return res.status(404).json({ message: 'No medicines found' });
      }
  
      // Return the medicines
      res.status(200).json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.put('/medicines/:id', async (req, res) => {
    try {
      const id = req.params;
      console.log("REACHED HERE",id)
      const { name, companyName, quantity, pricePerUnit } = req.body;
      const medicine = await Medicine.findOne({ medicineID: req.params.id });
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }
    medicine.name = name;
    medicine.companyName = companyName;
    medicine.quantity = quantity;
    medicine.pricePerUnit = pricePerUnit;

    // Save the updated medicine back to the database
    await medicine.save();

      // Return the medicines
      res.status(200).json(medicine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  
  // DELETE a medicine by medicineId
  router.delete('/medicines/:id', async (req, res) => {
      try {
        console.log(req.params)
          // Find the medicine by medicineId and delete it
          const deletedMedicine = await Medicine.findOneAndDelete({ medicineID: req.params.id });
          
          // Check if the medicine was found and deleted
          if (!deletedMedicine) {
              return res.status(404).json({ message: 'Medicine not found' });
          }
  
          res.status(200).json({ message: 'Medicine deleted successfully', deletedMedicine });
      } catch (error) {
          console.error('Error deleting medicine:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  });
  
module.exports = router;
