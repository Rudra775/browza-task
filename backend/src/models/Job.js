const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true
  },
  targetUrl: {
    type: String,
    required: [true, 'Please add a target URL']
  },
  budget: {
    type: Number,
    required: [true, 'Please set a budget']
  },
  status: {
    type: String,
    enum: ['PENDING', 'RUNNING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true // Creates createdAt and updatedAt automatically
});

module.exports = mongoose.model('Job', JobSchema);