
require('dotenv').config();
var _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const { redirect } = require('statuses');
const { constants } = require('buffer');


const app = express();

mongoose.connect("mongodb+srv://keeper:"+process.env.PASSWORD+"@cluster0.flvk0.mongodb.net/keeperDB",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });


app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const itemsSchema = {
  title: String,
  content:String
};

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
  name:String,
  items:[itemsSchema]
}

const List = mongoose.model("List", listSchema);

// app.get("/", function(req, res) {

//   console.log("successfully received");
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'),(err)=>{
//       console.log(err);
//     });

// });
app.get("/:anything", function(req, res) {

  // console.log("successfully received in anything");
  // res.redirect("/"+req.params.anything);
    res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'),(err)=>{
      if(err)console.log(err);
    });

});

app.post("/", function(req, res) {

  const itemName = req.body.title;
  const itemContent = req.body.content;

  const item = Item({
    title: itemName,
    content:itemContent
  });

  item.save();
  res.end();
  // next();
});

app.get("/home/getData",(req,res)=>{
  // console.log("in geeetData");
  var data = [];
  Item.find({},(err,items)=>{
    if(err) {
      console.log(err);
      res.json("");
    }
    else {
      items.forEach(item=>{
        data.push(item);
      })
      res.json(data);
    }
  })
  
  
})

app.post("/remove",(req,res)=>{
  const title = req.body.title;
  const content = req.body.content;
    Item.deleteOne({title:title,content:content},(err)=>{
  })

  res.end();
  // next();
});

app.get("/custom/:custom",(req,res)=>{

  const custom = req.params.custom;
  List.findOne({
    name: custom
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        
          const list = new List({
          name: custom,
          items: [{
            title:"I am created.",
            content:"I am custom List. Add things to me."
          }]
        });
        list.save();
        res.json({items:list.items});
      } else {

        res.json({
          items:foundList.items
        })

      }
    }
  });
})

app.post("/:custom",(req,res)=>{

  const name = req.params.custom;
  const title = req.body.title;
  const content = req.body.content;

  List.findOne({name:name},(err,foundList)=>{
    if(foundList){
      foundList.items.push({title:title,content:content});
      foundList.save();
    }
  })
  
res.end();
// next();

})


app.post("/:custom/remove",(req,res)=>{

  const custom = req.params.custom;
  const title = req.body.title;
  const content = req.body.content;
  console.log(custom,title,content);
  
  
  // List.findOne({name:custom},(err,foundList)=>{
  //   console.log(foundList.items);
    // foundList.items.map((item)=>{
    //   console.log(item);
    // })

    List.findOneAndUpdate({name:custom},{$pull: {items:{title:title,content:content}}},function(err,foundList){
      if(!err){
        // res.redirect("/"+listName);
      }
    })
    
  //   List.updateOne(
  //     {  },
  //     { $pull: { items:  {title:title,content:content}  } },
  //     { multi: true }
  // )
  // foundList.items.pull({title:title,content:content});
  //   foundList.save()
  // })
  res.end();
  // next();

})


let port = process.env.PORT || 4000;


app.listen(port, function() {
  console.log("Server has started successfully.");
});


// in package.json
// "build":"npm run build",
// "install-npm":"npm install",
// "heroku-postbuild":"npm run install-npm && npm run build"