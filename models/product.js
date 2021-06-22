const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name : {
      type : String,
      required : true
    },
    producttype : {
      type : String,
      required : true
    },
    origin : {
      type : String,
      required : true
    },
    quantity : {
      type : Number,
      required : true
    }

  },
  {
    collection: 'products'
  });


const Product = module.exports = mongoose.model("Product", productSchema, 'products');
