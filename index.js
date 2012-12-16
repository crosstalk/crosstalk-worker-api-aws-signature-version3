/*
 * index.js : Crosstalk AWS version 3 signature generator
 *
 * (C) 2012 Crosstalk Systems Inc.
 */
"use strict";

var crypto = require( 'crypto' ),
    dateformat = require( 'dateformat' );

var SIGNATURE_METHOD = "HmacSHA256",
    SIGNATURE_VERSION = 3;

var hmac = function hmac ( key, stringToSign, format ) {

  return crypto.createHmac( 'sha256', key ).update( stringToSign )
     .digest( format );

}; // hmac

var version3 = function version3 ( params, callback ) {

  if ( ! callback ) return; // nothing to do

  //
  // required params
  //
  var awsAccessKeyId = params.awsAccessKeyId,
      secretAccessKey = params.secretAccessKey;

  if ( ! awsAccessKeyId ) return callback( { message : "missing awsAccessKeyId" } );
  if ( ! secretAccessKey ) return callback( { message : "missing secretAccessKey" } );

  //
  // optional params
  //
  var date = params.date;

  if ( ! date ) date = dateformat( new Date(), 
     "UTC:ddd, dd mmm yyyy HH:MM:ss Z" );

  var signature = hmac( secretAccessKey, date, 'base64' );

  var authorizationHeader = "AWS3-HTTPS " +
     "AWSAccessKeyId=" + awsAccessKeyId + ',' +
     "Algorithm=" + SIGNATURE_METHOD + ',' +
     "Signature=" + signature;

  return callback( null, {
    authorization : authorizationHeader,
    signature : signature,
    signatureMethod : SIGNATURE_METHOD,
    signatureVersion : SIGNATURE_VERSION
  });

}; // version3

crosstalk.on( 'api.aws.signature.version3', 'public', version3 );