var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var Payton = 0;
var Michael = 0;
var Garrett = 0;
var Bayne = 0;
var Nathaniel = 0;
var botID = process.env.BOT_ID;
var hunting = 1;
//function sleep (time) {
//  return new Promise((resolve) => setTimeout(resolve, time));
//}
//var pokemon = [name,level];
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = [/>Payton Bruckmeier is going to/,/Hey Wraith/,/>Michael Fernandez is going to/,/>Garrett Jones is going to/,/>Bayne is going to/,/>Nathaniel Franklin is going to/,/Wraith, set portal/,/Mozambique here!/,/Fuck Wraith/,/is starting in/];
  var i;
  for (i = 0; i < botRegex.length; i++) {
    if (request.text && botRegex[i].test(request.text)){ 
    this.res.writeHead(200);
    postMessage(i);
    this.res.end();
	}
 }   
  if (i == 15) {
  console.log("don't care");
   this.res.writeHead(200);
   this.res.end();
 }
}
//function train(){
//var team = [];
//var getTeam = JSON.parse(this.req.chunks[0]);

//if (getHours() == 0 || getHours() == 6 || getHours() == 12 || getHours() == 18){
//botResponse = "!battle bott";	
//}

function postMessage(message) {
  var botResponse, options, body, botReq;
if(message == 0){
  Payton = 1;
  }
else if (message == 1){
	botResponse = "I should've seen that coming.";
}
else if (message == 2){
	Michael = 1;
}
else if (message == 3){
	Garrett = 1;
}
else if (message == 4){
	Bayne = 1;
}
else if (message == 5){
	Nathaniel = 1;
}
else if (message == 6){
	botResponse = "Setting Portal";
	Payton = 0;
	Michael = 0;
	Garrett = 0;
	Bayne = 0;
	Nathaniel = 0;
}
else if (message == 7){
	botResponse = "Not today.";
}
else if (message == 8){
	botResponse = "You challenged the wrong person.";
}
else if (message == 9){
	if (Payton == 0 || Michael == 0 || Garrett == 0 || Nathaniel == 0 || Bayne == 0){
		botResponse = "Not everyone has accepted the invite.";
	}
}

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };
message = 0;
  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
