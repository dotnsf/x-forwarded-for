//. app.js
var express = require( 'express' ),
    app = express();

app.set( 'trust proxy', true );

app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var json = { status: true, ip: req.ip, remode_address: req.connection.remoteAddress };
  //console.log( req.headers );
  if( req.headers && req.headers['x-forwarded-for'] ){
    json['x-forwarded-for'] = req.headers['x-forwarded-for'];
  }

  res.write( JSON.stringify( json, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
