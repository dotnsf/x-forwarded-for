//. app.js
var express = require( 'express' ),
    app = express();

if( 'TRUST_PROXY' in process.env && process.env.TRUST_PROXY ){
  app.set( 'trust proxy', true );
}

app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var json = { status: true, ip: req.ip, remode_address: req.connection.remoteAddress };
  //console.log( req.headers );
  if( req.headers && req.headers['x-forwarded-for'] ){
    var tmp = req.headers['x-forwardef-for'].split( ',' );
    var x = [];
    for( var i = 0; i < tmp.length; i ++ ){
      x.push( tmp[i].trim() );
    }
    json['x-forwarded-for'] = x;
  }

  res.write( JSON.stringify( json, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
