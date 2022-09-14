const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/reviews')

//define schemas
const PhotoSchema = new Schema({url: String});

const ReviewSchema = new Schema({
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
  reported: Boolean,
  reviewer_name: String,
  helpfulness: Boolean,
  photos: {
    type: [PhotoSchema]
  }
})

const ReviewMetaSchema = new Schema({
  product_id: {
    type: Number,
    unique: true
  },
  ratings: {
    1: { type: Number },
    2: { type: Number },
    3: { type: Number },
    4: { type: Number },
    5: { type: Number }
  },
  recommended: Boolean,
  characteristics: {
    size:    { type: mongoose.Decimal128 },
    fit:     { type: mongoose.Decimal128 },
    comfort: { type: mongoose.Decimal128 },
    length:  { type: mongoose.Decimal128 },
    quality: { type: mongoose.Decimal128 },
    width:   { type: mongoose.Decimal128 }
  }
})

const UserSchema = new Schema({
  user_id: {
    type: Number,
    unique: true
  },
  email: String,
  name: String,
})

//declare class of reviews using schema
const Review = mongoose.model('Review', ReviewSchema);
const ReviewMeta = mongoose.model('ReviewMeta', ReviewMetaSchema);
const User = mongoose.model('User', UserSchema);



//define CRUD operations for this class

