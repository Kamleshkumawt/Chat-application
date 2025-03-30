import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'project name must be unique'],
    trim: true,
    minlength: [3, 'Name must be a at last 3 characters log'],
  },
  image: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
  minimize: false,
  strict: false,
});

const Project = mongoose.model("project", projectSchema);

export default Project;
