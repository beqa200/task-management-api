import mongoose from "mongoose";
import slugify from "slugify";

const subtaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  isCompleted: { type: Boolean, default:false },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  subtasks: [subtaskSchema],
});

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (val: string) {
        let count = 0;
        let columnSchema: any = this;
        for (let i = 0; i < columnSchema.parent().columns.length; i++) {
          if (columnSchema.parent().columns[i].name == val) {
            count++;
          }
        }
        return count <= 1;
      },

      message: "Name should be unique",
    },
    required: true,
  },
  tasks: [taskSchema],
});

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
  },
  columns: [columnSchema],
});

boardSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
