//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let books = [];
let electronics = [];
let stationary = [];
let lab = [];

function Entry(name, hostel, contact, type, img,product, description, price) {
  this.name = name;
  this.hostel = hostel;
  this.contact = contact;
  this.type = type;
  this.img = img;
  this.product=product;
  this.description = description;
  this.price = price;

}

let book1 =new Entry("sushant", "aravali","98XXXXXXXX","books","book1.jpg" ,"Let Us C","A programming guide to C language by Yashvant Kanetkar", "999");
let book2 =new Entry("sushant", "aravali","98XXXXXXXX","books","book2.jpg" ,"Electrodynamics","A book for PYL100 by David Griffith", "999");
let coat =new Entry("sushant", "aravali","98XXXXXXXX","lab","coat.jpg" ,"Lab Coat", "Lab Coat for CMP100", "999");
let glasses =new Entry("sushant", "aravali","98XXXXXXXX","lab","glasses.jpg","Protective Glasses" ,"Protective Glasses for CMP100", "999");
let geometry =new Entry("sushant", "aravali","98XXXXXXXX","stationary","geometry.jpg" ,"Geometry Box","Geomtry Box for constrution", "999");
let ruler =new Entry("sushant", "aravali","98XXXXXXXX","stationary","rolling-ruler.jpg","Rolling Ruler" ,"Ruler  for MCP100 for drawing parallel lines", "999");
books.push(book1);
books.push(book2);
lab.push(coat);
lab.push(glasses);
stationary.push(ruler);
stationary.push(geometry);

app.get("/", function(req, res) {
  res.render("index", {
    pageName: "/",
    type:books
  });
});

app.post("/", function(req, res) {
  let upload = new Entry(req.body.name, req.body.hostel, req.body.contact, req.body.type, req.body.img,req.body.product,req.body.description, req.body.price);
  console.log(upload.img);

  if (upload.type==="books"){
    books.push(upload);
  }else if (upload.type==="electronics") {
    electronics.push(upload);
  }else if (upload.type==="stationary") {
    stationary.push(upload);
  }else if (upload.type==="lab") {
    lab.push(upload);
  }

  res.redirect("/thank-you");
});

app.get("/books", function(req, res) {
  res.render("index", {
    pageName: "books",
    type :books
  });
});

app.get("/electronics", function(req, res) {
  res.render("index", {
    pageName: "electronics",
    type: electronics
  });
});

app.get("/stationary", function(req, res) {
  res.render("index", {
    pageName: "stationary",
    type :stationary
  });
});

app.get("/lab", function(req, res) {
  res.render("index", {
    pageName: "lab",
    type: lab
  });
});

app.get("/add-product", function(req, res) {
  res.render("add-product");
});

app.get("/thank-you",function(req,res){
  res.render("thank-you");
});


app.listen(3000, function(req, res) {
  console.log("server started on port 3000");
});
