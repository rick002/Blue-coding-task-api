const { Schema, default: mongoose } = require('mongoose');


const TaskSchema = new Schema({
    id: String,
    title: String,
    description: String,
    completed: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);