var express = require('express');
var http = require('http');
var app = express();
var fs = require("fs");
var cors = require('cors');
var bodyParser = require('body-parser');
var os = require("os");

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

var note =  {"description": "test note 5","schedule": "28 Aug 2021, Sat"}
var month = "notes";
app.get('/ot-notes/api/listNotes', function (req, res) {
   fs.readFile( __dirname + "/" + month + ".json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/ot-notes/api/addNote', function (req, res) {
   // First read existing users.
    fs.readFile( __dirname + "/" + month + ".json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      console.log('Length: ', data.length + 1);
      data[data.length] = {"description":req.query.description, "schedule": req.query.schedule}
      // data[4] = note;
      console.log('loggggggggggggggggggg> ', data );
      res.end( JSON.stringify(data));
      fs.writeFile(month + '.json', JSON.stringify(data), function(err, result) {
            if(err) console.log('error',err);
        });
   });
})


app.put('/ot-notes/api/updateNote/:schedule', function (req, res) {
   fs.readFile( __dirname + "/" + month + ".json", 'utf8', function (err, data) {
         var notes = JSON.parse( data );
         console.log('param:>>>>>>>>>> ', req.params.schedule);
         objIndex = notes.findIndex((obj => (obj != null && obj.schedule == req.params.schedule)));
         console.log("Before update: ", notes[objIndex])
         notes[objIndex].description = req.query.description;
         console.log("After update: ", notes);
         res.end( JSON.stringify(notes));
        fs.writeFile(month + '.json', JSON.stringify(notes), function(err, result) {
            if(err) console.log('error',err);
        });
   });
})


//REMOVE a note by date
app.delete( '/ot-notes/api/deleteNote/:schedule', ( req, res ) => {
      fs.readFile( __dirname + "/" + month + ".json", 'utf8', function (err, data) {
      var notes = JSON.parse( data );
      console.log("Parameter: " + req.params.schedule);
      objIndex = notes.findIndex((obj => (obj != null && obj.schedule == req.params.schedule)));
      console.log("Note to be deleted: " + notes[objIndex]);
      console.log("At " + objIndex + " Indexxxxx");
      notes.splice(objIndex, 1);
      console.log("After deletion ... " + JSON.stringify(notes));
      res.end( JSON.stringify(notes) );
      fs.writeFile(month + '.json', JSON.stringify(notes), function(err, result) {
            if(err) console.log('error',err);
        });
   });
})



app.get('/ot-notes/api/note/:schedule', function (req, res) {
   // First read existing notes..
   fs.readFile( __dirname + "/" + month + ".json", 'utf8', function (err, data) {
      var notes = JSON.parse( data );
      if(req.params.schedule != null) {
      console.log("GET/Parameter: " + req.params.schedule);
      objIndex = notes.findIndex((obj => (obj != null && obj.schedule === req.params.schedule)));
      console.log(notes[objIndex]);
      res.end( JSON.stringify(notes[objIndex]) );
      }
   });
})


var server = app.listen(3000, '0.0.0.0', function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at https://%s:%s", host, port)
})
