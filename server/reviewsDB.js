const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews')

//define schema
const reviewsSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    unique: true
  },
  product_id: Number,
  rating: Number,
  summary: String,
  response: String,
  body: String,
  date: Date,
  reported:
  reviewer_name: String,
  helpfulness: Boolean,
  //change this to an array of strings
  photos: String
})

//declare class of reviews using schema
const Reviews = mongoose.model('Reviews', reviewsSchema);


//define CRUD operations for this class

