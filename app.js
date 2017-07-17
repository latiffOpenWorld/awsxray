var express = require('express');
var app = express();
var AWSXRay = require('aws-xray-sdk');
var logger = require('winston');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
//Use this plugins to record information about the service hosting your application.
//Use to set origin field on the segment, and resource type .For example, AWS::ElasticBeanstalk::Environment.
// AWSXRay.config([AWSXRay.plugins.EC2Plugin,AWSXRay.plugins.ElasticBeanstalkPlugin]);
// /sampling strategy that determines which requests get traced. 
AWSXRay.middleware.setSamplingRules('sampling-rules.json');
//To log output from the SDK, call AWSXRay.setLogger(logger), where logger is an object that provides
//standard logging methods (warn, info, etc.).
AWSXRay.setLogger(logger);
AWSXRay.setDaemonAddress('127.0.0.1:2000');
app.use(AWSXRay.express.openSegment('MyApp'));
AWSXRay.middleware.enableDynamicNaming('*.example.com');
app.get('/', function (req, res) {
 res.send('Hello world');
});
app.use(AWSXRay.express.closeSegment());
app.listen(3000);