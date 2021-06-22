const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Product = require('./models/product');


const router = require('express').Router();


//db
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/myDB");


mongoose.connection.on('connected',()=>{
  console.log('Csatlakozva az addatbázishoz');
});

mongoose.connection.on('error',(err)=>{
  if(err){
    console.log('Nem tud csatlakozni az adatbázishoz ' + err);
  }

});



router.post('/addUser', (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(req.body, (error, data) => {

    if (error) {
      console.log(error)


    } else {
      res.json(data)
    }
  });
});

router.get('/getAllusers', (req,res) => {
  User.find({})
    .exec(function (err, users){
      if(err){
        console.log("Hiba a felhasználók lekérdezésében!");
      }else{
        res.json(users);
      }
    });

});

router.get('/getAllproducts', (req,res,next) => {
  Product.find({})
    .exec(function (err, products){
      if(err){
        console.log("Hiba a termékek lekérdezésében!");
      }else{
        res.json(products);
      }
    });


});

router.post('/addProduct', (req, res) => {

  const product = new Product();
  product.name = req.body.name;
  product.producttype = req.body.producttype;
  product.origin = req.body.origin;
  product.quantity = req.body.quantity;

  product.save(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  });
});

router.delete('/delete/:id',function(req,res){

  console.log(req.params.id)
  Product.findOneAndRemove({_id:req.params.id},function(err,product){
      if(err){
          res.send("Sikertelen törlés!");
      }else{
          console.log(product);
          res.json(product);
      }
  });
});

router.put('/inc/:id',function(req,res){

  console.log(req.params.id)
  Product.findOneAndUpdate({_id:req.params.id},{ $inc:{quantity:1} },function(err,product){
      if(err){
          res.send("Sikertelen növelés!");
      }else{
          console.log(product);
          res.json(product);
      }
  });
});

router.put('/dec/:id',function(req,res){

  console.log(req.params.id)
  Product.findOneAndUpdate({_id:req.params.id},{ $inc:{quantity:-1} },function(err,product){
      if(err){
          res.send("Sikertelen csökkentés!");
      }else{
          console.log(product);
          res.json(product);
      }
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('', router);


app.listen(port, () => {
  console.log("Szerver elérése a következő: " + port);
});
