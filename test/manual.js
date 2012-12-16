"use strict";

var ide = require( 'crosstalk-ide' )(),
    workerPath = require.resolve( '../index' );

var worker;

worker = ide.run( workerPath );

var validRequestSignature = {
  awsAccessKeyId : "KEYNAME",
  date : "Thu, 14 Aug 2008 17:08:48 GMT",
  secretAccessKey : "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
};

worker.send( 'api.aws.signature.version3', validRequestSignature, null, true );