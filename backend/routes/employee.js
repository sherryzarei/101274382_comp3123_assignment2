const express = require('express')
const router = express.Router();
const Employee = require('../models/employeeModel');
const mongoose = require('mongoose');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        const employee = await Employee.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            position: position,
            salary: salary,
            date_of_joining: date_of_joining,
            department: department
        });
        const message = "Employee created successfully.";

        res.status(201).json({
            message,
            employee_id: employee._id
        })
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const trimmedId = id.trim();

        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid Employee ID" });
        }
        
        const employee = await Employee.findById(trimmedId);
        
        if (!employee) {
            return res.status(404).json({ message: "Employee Not Found!" });
        }
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const trimmedId = id.trim();
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid Employee ID" });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(trimmedId, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee Not Found!" });
        }

        res.status(200).json({
            message: "Employee details updated successfully."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const { eid } = req.query;
        const trimmedId = eid.trim();
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid Employee ID" });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(trimmedId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee Not Found!" });
        }

        res.status(200).json({
            message: "Employee Deleted successfully."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
