var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var hunting = 1;
var waitinline = 0;
//function sleep (time) {
//  return new Promise((resolve) => setTimeout(resolve, time));
//}
//var pokemon = [name,level];
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = [/^>A wild/,/Hey Blue/,/broke free!/,/Times up,  Blue/,/Let's go, Blue/,/Hi Blue, Lets Train/,/Fight'em Blue/,/!battle blue/,/fuck blue/,/catch!/];
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
  if(hunting == 1){ 
  waitinline = 0
  botResponse = "!catch";
  botResponse = "I'll catch this one first try!";
  botResponse = "!catch";
  }
}
else if (message == 1){
	botResponse = "What do you want, nerd?";
}
else if (message == 2){
		botresponse = "!catch";
		botresponse = "I'll catch you this time!";
}
else if (message == 3){
	hunting = 0;
	botResponse = "I better leave some for the rest of you.";
}
else if (message == 4){
	hunting = 1;
	botResponse = "Yeah, let's go!";
}
else if (message == 5){
botResponse = "!train status";	
}
else if (message == 6){
botResponse = "PKMN Trainer Blue wants to fight";
botResponse = "!battle bott";
}
else if (message == 7){
	botResponse = "Bring it on, twerp! You can't beat me!";
}
else if (message == 8){
	botResponse = "Hey, what's your problem, kid?";
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
