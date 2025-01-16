var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

// Read all employees
router.get('/', (req, res) => {
    const employees = employeeService.getAllEmployees();
    res.render('employees', { employees: employees })
  });

  // Read a Employee by ID
router.get('/:id', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    res.render('employee', { employee: employee, editMode: false });
  });
  
  // View edit form for an employee
router.get('/:id/edit', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    res.render('employee', { employee: employee, editMode: true });
  });
  
  // Update an employee
router.post('/:id/edit', (req, res) => {
    const updatedEmployee = {
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary,
        role: req.body.role
    };
    const employee = employeeService.updateEmployee(parseInt(req.params.id), updatedEmployee);
    if (!employee) return res.status(404).send('Employee not found');
    res.redirect(`/employees/${req.params.id}`);
  });

  module.exports = router;