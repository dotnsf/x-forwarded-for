//. app.js
var express = require( 'express' ),
    app = express();

if( 'TRUST_PROXY' in process.env && process.env.TRUST_PROXY ){
  //. true:           IPアドレス=Proxy経由とみなされ、X-FORWARDED-FOR の左端の値
  //. false(default): IPアドレス=直接接続とみなされ、remoteAddress の値
  app.set( 'trust proxy', true );
}

app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  //. TRUST_PROXY 設定をクエリパラメータで上書き
  if( req.query.trust_proxy ){
    var tp = req.query.trust_proxy;
    if( tp == '0' ){
      app.set( 'trust proxy', false );
    }else if( tp == '1' ){
      app.set( 'trust proxy', true );
    }
  }

  //. 解析
  var json = { status: true, ip: req.ip, remode_address: req.socket.remoteAddress };
  //console.log( req.socket );
  if( req.headers && req.headers['x-forwarded-for'] ){
    var tmp = req.headers['x-forwarded-for'].split( ',' );
    var x = [];
    for( var i = 0; i < tmp.length; i ++ ){
      x.push( tmp[i].trim() );
    }
    json['x-forwarded-for'] = x;
  }

  //. 設定のリセット
  if( 'TRUST_PROXY' in process.env && process.env.TRUST_PROXY ){
    app.set( 'trust proxy', true );
  }else{
    app.set( 'trust proxy', false );
  }

  res.write( JSON.stringify( json, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
