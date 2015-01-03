//MySQL Part
var mysql = require('mysql');

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Zb817941',
  database : 'xiexi',
  socketPath : '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
  port:3306
});



var CRUD = require('mysql-crud');
var mysql_CRUD = CRUD(pool, 'order');



//Server Part
var express = require('./node_modules/express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.post('/ReceiveJSON', function(req, res){
   
    var data = req.body;
    var newOrder = {}; 
    newOrder.UserName = data.name;
    newOrder.UserTel = data.tel;
    //newOrder.Year = 2015;
    newOrder.Date = data.day.day.date;
    newOrder.Time = data.time.duration;
    newOrder.City = data.city;
    newOrder.Zone = data.zone;
    newOrder.Address = data.detailAddress;
     newOrder.UserID = data.userID;

    console.log(newOrder);

	mysql_CRUD.create(newOrder, function (err, vals) {
	    //mysql callback
	    if (err) {
	    	console.log("CREATE ERROR : " + err);
	    	return;
	    };
	       
	    console.log(vals); 
      res.send("ok");
	});

   
});


app.get('/GetUserOrder', function(req, res){
	var userId = Number(req.query.id);
	var userOrder;
	console.log(userId);
	mysql_CRUD.load({'UserID':userId},function(err,data){
         // console.log(data);
         // userOrder = data;
          res.send(data);
	})
	// console.log(req);
	//console.log("The order is :" + userOrder);
	
});

// app.get('/GetUserAddress', function(req, res){
  
// });
 
app.listen(3000);
console.log('listening to http://localhost:3000');