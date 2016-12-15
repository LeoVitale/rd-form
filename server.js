var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var validator = require('express-validator');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(validator());

app.use(express.static(path.join(__dirname, './')));

// Home page route
app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

app.post('/', function (req, res) {
  //req.checkBody("lead.email", "Enter a valid email address.").isEmail();
  req.checkBody({
    'lead.email': {

      optional: false,
      isEmail: {
        errorMessage: 'Digite um e-mail valido'
      }
    },
    'lead.name': { //
      optional: false, // won't validate if field is empty
      isLength: {
        options: [{
          min: 3,
          max: 20
        }],
        errorMessage: 'Seu nome deve conter entre 3 e 20 caracteres' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'Nome Requerido'
    }
  });

  req.getValidationResult().then(function (result) {
    var errors = result.mapped();
    console.log(errors);
    try {
      result.throw();
      res.status(200).send('success!!!!!');
    } catch (e) {
      res.status(500).send(e.array());
    }
  });

});

app.listen(3010, function () {

});