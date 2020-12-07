const yup = require('yup');
const { uptime } = require('process');
const helmet = require("helmet");
const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
var bodyParser = require('body-parser');
const app = express()
const port = 3000


let schema = yup.object().shape({
  name: yup.string().trim().max(10).matches(/^[a-zA-z]+$/).required()
})


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!11')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.post('/soap', function (req, res) {
  res.send("Tekst soap")
})

app.post('/rest', function (req,res) {
  res.send("Tekst rest")
})

// 1
app.get('/info', function(req, res) {
  res.status(200);
  res.json({'24346':1});
})

// 2
app.get('/hello/:name', function (req,res){
  schema
    .isValid(req.params)
    .then(function(valid) 
    {
      if(valid == true)
      {
        res.send("Hello " + req.params.name + "!")
        res.status(200);
      }
      else
      {
        res.status(400);
        res.send("Error");
      }
  });
})


// 3 
var tab1 = [];
app.post('/store', function (req,res) {
  tab1.push(req.body.input);
  res.status(201);
  res.json({stored_data: tab1});
})

var tab2 = [];

app.post('/parse', function(req,res) {
  const form = 'C:/Users/Solda/web_services/file.txt';
  //const form = formidable({multiples: true});
  //path.basename(form) 
  form.parse(req, (err, fields, files) => {
    fs.readFile(files.file.path, function read(err, data) {
       const values = data.toString().trim().split(";");
       const result = [];
       values.forEach((item) => {
         const parsedItem = item.replace(":",";");
         const [key, value] = parsedItem.split(";");
         const parsedValue = Number(value);
         if (!Number.isNaN(parsedValue)) {
          result[key] = parsedValue;
        } else {
          const subValues = value.split(",");
          result[key] = {};
          subValues.forEach((subItem) => {
            const [subKey, subValue] = subItem.split(":");
            result[key][subKey] = Number(subValue);
          });
        }
       });
      //var buff = Buffer.from(file);
      res.json(result);
      res.status(200);
    });
  });
});