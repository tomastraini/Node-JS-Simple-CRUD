var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	port:3307,
	password:'',
	database:'node-shop'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;