import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  calorie: {
    type: Number,
    required: true,
  },
  carbohydrate : {
    type: Number,
    required: true,
  },
  protein : {
    type: Number,
    required: true,
  },
  fat : {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
