const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createJob, getJobs, getJobById, updateJobStatus } = require('../controllers/jobController');

router.post('/', protect, createJob);
router.get('/', protect, getJobs);
router.get('/:id', protect, getJobById);
router.patch('/:id/status', protect, updateJobStatus);

module.exports = router;