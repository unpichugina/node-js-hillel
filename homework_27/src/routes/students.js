const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.patch('/:name', controller.updateAge);
router.delete('/group/:group/:name', controller.deleteByGroupAndName);
router.get('/filter', controller.filter);
router.get('/sort', controller.sort);
router.get('/avg', controller.studentAverages);
router.get('/group', controller.groupByGroup);
router.get('/totalavg', controller.totalAverage);


module.exports = router;
