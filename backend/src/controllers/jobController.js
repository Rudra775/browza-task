const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    // Attach the login user's ID to the job
    const job = await Job.create({
      ...req.body,
      user: req.user.id 
    });
    console.log(`[LOG] New Job Created: ${job.title} (${job._id}) by User: ${req.user.id}`);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all jobs (Filtered by User)
// @route   GET /api/jobs
exports.getJobs = async (req, res) => {
  try {
    const { status, search } = req.query;
    
    //query: Only find jobs belonging to the logged-in user
    let query = { user: req.user.id };

    if (status && status !== 'All') {
      query.status = status.toUpperCase();
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job (With Ownership Check)
// @route   GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check job belongs to the logged-in user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update job status (With Ownership Check)
// @route   PATCH /api/jobs/:id/status
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    //Checkthe job belongs to the login user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // State Machine Logic
    const validTransitions = {
          'PENDING': ['RUNNING'],
          'RUNNING': ['COMPLETED', 'FAILED'],
          'COMPLETED': [],
          'FAILED': ['PENDING']
        };

        if (!validTransitions[job.status].includes(status)) {
          return res.status(400).json({ message: `Invalid transition` });
        }

        // If starting the job, update the lastRunAt timestamp
        if (status === 'RUNNING') {
          job.lastRunAt = new Date();
        }

        job.status = status;
        await job.save();
    
    console.log(`[LOG] Job ${job._id} status changed to ${status}`);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};