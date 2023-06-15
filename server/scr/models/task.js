const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    Heading: {
        type: String,
        required: true,
    },
    Body: {
        type: String,
        required: true,
    },
    User: {
        type : String,
        required : true
    },
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;
