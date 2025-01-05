const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

router.post('/addTask', taskController.addTask);
router.put('/update/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);
router.get('/getblog', taskController.viewTasks);
router.get('/getblogs/:id', taskController.viewSingleTask);

module.exports = router;