var request = require('request');
var restify = require('restify');
var builder = require('botbuilder');
var cheerio = require('cheerio');
var modulejs = require('./Modules/module.js');
var busNumber;


// =============== BOT SETUP ===============
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD		
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create LUIS recognizer
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/a0b9e2ea-8fa8-4529-94e9-f9c8bbfb875a?subscription-key=f4ff675f7df84e838fd714dbf7a34766&verbose=true&timezoneOffset=0&q=';
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

// Intercept terms before sending to LUIS
intents.matches(/^lecturer/i, (session,args) => {
	session.beginDialog('/lecturer');
});
intents.matches(/^lecturers/i, (session,args) => {
	session.beginDialog('/lecturer');
});
intents.matches(/^lecturer details/i, (session,args) => {
	session.beginDialog('/lecturer');
});
intents.matches(/^lecturer contact details/i, (session,args) => {
	session.beginDialog('/lecturer');
});


var bot = new builder.UniversalBot(connector);
bot.dialog('/', intents);
// =============== END BOT SETUP ===============



// =============== WELCOME FUNCTION ===============
intents.matches('SayHi', [
	function(session)
	{
		session.send('Hi! How can I help you?');
	}
]);
// =============== END WELCOME FUNCTION ===============



// =============== BUS FUNCTION ===============
// function of hopper bus, you can choose one bus from the list, then choose one stop, the bot can tell you when is the next bus

// bus list
var buses = {
    "901": {
        Info: "University Park"
    },
    "902": {
    	Info: "King's Meadow"
    },
	"903": {
    	Info: "Jubilee Campus"
    },
	"904": {
    	Info: "Derby Hospital"
    },
	"905": {
    	Info: "Nottingham City Hospital"
    }
};

// if the intent calculated by LUIS matches "ShowBusStops"
intents.matches('ShowBusStops', [
	function(session)
	{	
		// ask the user for bus number
		builder.Prompts.choice(session, 'Which bus would you like to get?', buses);
	},
	function (session, results)
	{
		if(results.response) {
        	 busNumber = results.response.entity;
        }
        // read corresponding bus file which contains stop information
        var fs = require('fs');
		var stops = fs.readFileSync('Buses/' + busNumber + 'stops.txt').toString().split("\n");
		for(i in stops) {
			console.log(stops[i]);
		}
		// ask the user for stop name
		builder.Prompts.choice(session, 'Where would you like to get on?', stops);
	},
	function (session, results)
	{
        if(results.response) {
        	var chosenStop = results.response.entity;
        }
        // read corresponding timetable file
		var filename = chosenStop.replace(/\n|\r/g, "");
		filename += busNumber + "times.txt";
		var fs = require('fs');
		var times = fs.readFileSync('Buses/' + filename).toString().split("\n");
		
		// find out when is the next bus	
		var time = getTime();
		var nextTime;		
		for(i in times) {
				
			nextTime = (times[i].replace(/\n|\r/g, ""));
			if (nextTime > time)
			{
				break;
			}
		}

		// reply the user
		console.log(nextTime);
		session.send("The next bus from %s is at %s", chosenStop, nextTime);
	}
]);

// if the intent matches 901
intents.matches('Show901', [
	function (session)
	{
		// read "901stops.txt"
		busNumber = 901;
        var fs = require('fs');
		var stops = fs.readFileSync('Buses/' + busNumber + 'stops.txt').toString().split("\n");
		for(i in stops) {
			console.log(stops[i]);
		}
		builder.Prompts.choice(session, 'Where would you like to get on?', stops);
	},
	function (session, results)
	{
		// read corresponding timetable file
        if(results.response) {
        	var chosenStop = results.response.entity;
        }
		var filename = chosenStop.replace(/\n|\r/g, "");
		filename += busNumber + "times.txt";
		var fs = require('fs');
		var times = fs.readFileSync('Buses/' + filename).toString().split("\n");
		
		// find out when is the next bus
		var time = getTime();
		var nextTime;		
		for(i in times) {				
			nextTime = (times[i].replace(/\n|\r/g, ""));
			if (nextTime > time)
			{
				break;
			}
		}

		// reply the user
		console.log(nextTime);
		session.send("The next bus from %s is at %s", chosenStop, nextTime);
	}
]);

// if the intent matches 902
intents.matches('Show902', [
	function (session)
	{
		busNumber = 902;
        var fs = require('fs');
		var stops = fs.readFileSync('Buses/' + busNumber + 'stops.txt').toString().split("\n");
		for(i in stops) {
			console.log(stops[i]);
		}
		builder.Prompts.choice(session, 'Where would you like to get on?', stops);
	},
	function (session, results)
	{
        if(results.response) {
        	var chosenStop = results.response.entity;
        }
		var filename = chosenStop.replace(/\n|\r/g, "");
		filename += busNumber + "times.txt";
		var fs = require('fs');
		var times = fs.readFileSync('Buses/' + filename).toString().split("\n");
			
		var time = getTime();
		var nextTime;		
		for(i in times) {
				
			nextTime = (times[i].replace(/\n|\r/g, ""));
			if (nextTime > time)
			{
				break;
			}
		}
		
		console.log(nextTime);
		session.send("The next bus from %s is at %s", chosenStop, nextTime);
	}
]);

// if the intent matches 903
intents.matches('Show903', [
	function (session)
	{
		busNumber = 903;
        var fs = require('fs');
		var stops = fs.readFileSync('Buses/' + busNumber + 'stops.txt').toString().split("\n");
		for(i in stops) {
			console.log(stops[i]);
		}
		builder.Prompts.choice(session, 'Where would you like to get on?', stops);
	},
	function (session, results)
	{
        if(results.response) {
        	var chosenStop = results.response.entity;
        }
		var filename = chosenStop.replace(/\n|\r/g, "");
		filename += busNumber + "times.txt";
		var fs = require('fs');
		var times = fs.readFileSync('Buses/' + filename).toString().split("\n");
			
		var time = getTime();
		var nextTime;		
		for(i in times) {
				
			nextTime = (times[i].replace(/\n|\r/g, ""));
			if (nextTime > time)
			{
				break;
			}
		}

		console.log(nextTime);
		session.send("The next bus from %s is at %s", chosenStop, nextTime);
	}
]);

// if the intent matches 904
intents.matches('Show904', [
	function (session)
	{
		busNumber = 904;
        var fs = require('fs');
		var stops = fs.readFileSync('Buses/' + busNumber + 'stops.txt').toString().split("\n");
		for(i in stops) {
			console.log(stops[i]);
		}
		builder.Prompts.choice(session, 'Where would you like to get on?', stops);
	},
	function (session, results)
	{
        if(results.response) {
        	var chosenStop = results.response.entity;
        }
		var filename = chosenStop.replace(/\n|\r/g, "");
		filename += busNumber + "times.txt";
		var fs = require('fs');
		var times = fs.readFileSync('Buses/' + filename).toString().split("\n");
			
		var time = getTime();
		var nextTime;		
		for(i in times) {
				
			nextTime = (times[i].replace(/\n|\r/g, ""));
			if (nextTime > time)
			{
				break;
			}
		}

		console.log(nextTime);
		session.send("The next bus from %s is at %s", chosenStop, nextTime);
	}
]);

// if the intent matches 905
intents.matches('Show905', [
	function (session)
	{
		busNumber = 905;
        var fs = require('fs');
		var stops = fs.readFileSync('Buses/' + busNumber + 'stops.txt').toString().split("\n");
		for(i in stops) {
			console.log(stops[i]);
		}
		builder.Prompts.choice(session, 'Where would you like to get on?', stops);
	},
	function (session, results)
	{
        if(results.response) {
        	var chosenStop = results.response.entity;
        }
		var filename = chosenStop.replace(/\n|\r/g, "");
		filename += busNumber + "times.txt";
		var fs = require('fs');
		var times = fs.readFileSync('Buses/' + filename).toString().split("\n");
			
		var time = getTime();
		var nextTime;		
		for(i in times) {
				
			nextTime = (times[i].replace(/\n|\r/g, ""));
			if (nextTime > time)
			{
				break;
			}
		}

		console.log(nextTime);
		session.send("The next bus from %s is at %s", chosenStop, nextTime);
	}
]);
// =============== END BUS FUNCTION ===============



// =============== TIME & DATE FUNCTION ===============
intents.matches('ShowTime', [
	function(session)
	{		
		session.send('The time is: %s', getTime());
	
	}
]);

intents.matches('ShowDate', [
	function(session)
	{		
		session.send('The date is: %s', getDate());
	
	}
]);

function getTime() {	
	var date = new Date();
    var hour = date.getHours() + 1;
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    return   hour + ":" + min;
}

function getDate() {
    var date = new Date();
	var n = date.getDay();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return   day + "/" + month;
}

function getCurrTime() {	
	var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    return   hour + min;
}
// =============== END TIME & DATE FUNCTION ===============



// =============== LIBRARY FUNCTION ===============
// function of library, crawl library webpage to get information and reply the user with multiple cards which can be swiped between

intents.matches('ShowLibrary', [
	function(session){
		var titles = []; // library name
		var openingTimes = [];
		var images = [];

		// use "request" API to get html file of "https://www.nottingham.ac.uk/library/using/libraries/index.aspx"
		request('https://www.nottingham.ac.uk/library/using/libraries/index.aspx', function (error, response, html) {
			if (!error && response.statusCode == 200) {
				// use "cheerio" API to get the information we need
				var $ = cheerio.load(html);
				$('div.sys_threeColumns').each(function(j, element){
					// get titles
					$(this).children().each(function(i, element){
						if (j<2 || i<2)
						{
							var title = $(this).children().first().text();
							titles.push(title);
						}
					});	

					// get opening times
					$(this).children().each(function(i, element){
						if (j<2 || i<2)
						{
							var openingTime = "";
							$(this).children().each(function(t, element){
								if (t>2)
								{
									openingTime += $(this).text() + "\n\n";
								}
							});
							openingTimes.push(openingTime);
						}
					});	

					// get image urls
					$(this).find('img').each(function(i, element){
						var image = $(this).attr('src');
						images.push(image);
					});
    	        });
            }

            // create cards to display library information
            var attachs = []
        	for(i = 0; i<8; i++) 
            {
        		attachs.push(        		
        			new builder.HeroCard(session)
                    	.title(titles[i])
                    	.text(openingTimes[i])
                    	.images([
                        	builder.CardImage.create(session, "https://www.nottingham.ac.uk" + images[i])
                    	]));
        	}

        	var msg = new builder.Message(session)
				.attachmentLayout(builder.AttachmentLayout.carousel)
            	.textFormat(builder.TextFormat.xml)
            	.attachments(attachs);
            
            // reply the user
        	session.endDialog(msg);
        })

    }
]);
// =============== END LIBRARY FUNCTION ===============



// =============== CARD QUERY FUNCTION ===============
// function which gives all kinds of information about university card, you need firstly choose one categroy from the list, 
// the bot will then reply you with the corresponding infomation and further link

// card list
var cardResponse = "card"; //default response 
var cards = {
	"General Card Query": {
    	Info: "CardQuery"
    },
    "Card Collection": {
        Info: "CardCollection"
    },
    "Card Functions": {
    	Info: "CardFunctions"
    },
	"Meal Card": {
    	Info: "MealCard"
    },
	"Not Helpful": {
    	Info: cardResponse
    }
};

intents.matches('ShowCardQuery', [
function(session)
	{	
		cardResponse = session.message.text;
		builder.Prompts.choice(session, 'Are any of these what you are looking for?', cards);
	},
	function (session, results)
	{ 
		if(results.response) {
        	 CardRef = results.response.entity;
        }
        if (CardRef == "General Card Query")
		session.send("If your card has been lost, stolen, damaged, is faulty or has incorrect data on it then you may request a replacement (£15.00 fee). You need to contact the University card office on 0115-9515759 or by emailing universitycard@nottingham.ac.uk immediately. The following form will have to be delivered to the Security office, rear of the Hallward Library, University Park, Nottingham, NG7 2RD https://www.nottingham.ac.uk/estates/documents/security/university-card-replacement-form.doc");
		else if (CardRef == "Card Collection")
		session.send("Once you have applied for your first card online it will be produced within 3-5 days. If you are a current student then your card will be available for collection from your school office. If you are a new student and have uploaded your photo prior to registration then your card will be available for collection at registration. If you are a member of staff then University card support will be in contact with you to arrange the collection of your card.");
		else if (CardRef == "Card Functions")
		session.send("The University card has many functions! It is a means of identification, a library card, a building access card, a bus card (on NCT services) and a Sports Centre card (subject to joining). It can also be used for online library borrowing and photocopying authorisation.");
		else if (CardRef == "Meal Card")
		session.send("Meal Card FAQ: https://www.nottingham.ac.uk/hospitality/documents/mealcards/mealcardfaq-sep15v12.pdf");
		else
		session.send("https://google.co.uk/search?q=University+Of+Nottingham+%s", cardResponse.replace(/ /g,"+"));
	}
]);
// =============== END CARD QUERY FUNCTION ===============



// =============== WEATHER FUNCTION ===============
//you can get today's weather
intents.matches('ShowWeather', [
	function(session, args)
	{	
		var tempEntity = builder.EntityRecognizer.findEntity(args.entities, 'ShowWeather.temperature');
		var windEntity = builder.EntityRecognizer.findEntity(args.entities, 'ShowWeather.wind');
		var rainEntity = builder.EntityRecognizer.findEntity(args.entities, 'ShowWeather.rain');
		var tomorrowEntity = builder.EntityRecognizer.findEntity(args.entities, 'ShowWeather.tomorrow');
		var postcode = "ng81bb"
		var app_id = "47093cbf"
		var app_key = "146c861c4bb2dddb97cc061dbbf33d68"
		if(tomorrowEntity)
		{
		var url = "http://api.weatherunlocked.com/api/forecast/uk."+postcode;
		}
		else
		{
		var url = "http://api.weatherunlocked.com/api/current/uk."+postcode;
		}
		url += "?app_id="+app_id+"&app_key="+app_key;
			
			var options ={
			url: url,
			method: "GET",
			json:true,
			}
			
		request(options, function(error, response, body) {
		console.log(body);
		if(tomorrowEntity)
		{
			if(tempEntity)
			{
				if(body.Days[1].temp_max_c <= 10)
				{
					session.send("It'll be pretty cold tomorrow with lows of %s°C and highs of %s°C.", body.Days[1].temp_min_c, body.Days[1].temp_max_c);
				}
				else if (body.Days[1].temp_max_c <= 20)
				{
					session.send("It won't be too bad tomorrow, there are lows of %s°C and highs of %s°C.", body.Days[1].temp_min_c, body.Days[1].temp_max_c);
				}
				else if (body.Days[1].temp_max_c <= 30)
				{
					session.send("It'll be pretty warm tomorrow with lows of %s°C and highs of %s°C.", body.Days[1].temp_min_c, body.Days[1].temp_max_c);
				}
				else
				{
					session.send("It'll be very hot tomorrow with lows of %s°C and highs of %s°C.", body.Days[1].temp_min_c, body.Days[1].temp_max_c);
				}
				
			}
			else if(windEntity)
			{
				session.send("There'll be maximum windspeeds of %smph tomorrow", body.Days[1].windspd_max_mph);				
			}
			else if(rainEntity)
			{
				session.send("There'll be %smm of rain tomorrow", body.Days[1].rain_total_mm);				
			}
			else
			{
				var message = "Tomorrow's Weather: Max temp: ";				
				message += body.Days[1].temp_max_c + "°C. Min temp: ";
				message += body.Days[1].temp_min_c + "°C. Rain: ";
				message += body.Days[1].rain_total_mm + "mm. Max wind: ";			
				message += body.Days[1].windspd_max_mph + "mph.";
							
				session.send("%s", message);			
				
			}	
					
		}
		else
		{		
			if(tempEntity)
			{
				if(body.temp_c <= 10)
				{
					session.send("It's pretty cold. It's only %s°C outside", body.temp_c);
				}
				else if (body.temp_c <= 20)
				{
					session.send("It's not too bad, it's %s°C outside", body.temp_c);
				}
				else if (body.temp_c <= 30)
				{
					session.send("It's pretty warm, it's %s°C outside", body.temp_c);
				}
				else
				{
					session.send("It's very hot, it's %s°C outside!", body.temp_c);
				}
				
			}
			else if(windEntity)
			{
				session.send("The current wind speed is %smph", body.windspd_mph);				
			}
			else if(rainEntity)
			{
				session.send("%s outside", body.wx_desc);				
			}
			else
			{
				var message = "Current Weather: ";
				message += body.wx_desc + ". Temp: ";
				message += body.temp_c + "°C. Wind: ";
				message += body.windspd_mph + "mph ";
				message += body.winddir_compass + ".";
				
				session.send("%s", message);			
				
			}
		}
		})
	}
]);
// =============== END WEATHER FUNCTION ===============


// =============== DEFAULT FUNCTION ===============
// if the bot doesn't understant you, it will call this function by default

intents.onDefault([
	function(session)
	{
		session.send("I'm afraid I don't know what you mean. Type help to see what I can do!");
	}
]);
// =============== DEFAULT FUNCTION ===============


// =============== OPENING TIMES FUNCTION ===============
//you can get cafe's opentime and location

intents.matches('ShowStarbucks', [
	function(session){
	var time = getCurrTime();
	if (time <= 2000 && time >= 800)
		var message = "\n\nThe Starbucks on Jubilee Campus is currently open until 2000";
		else
		var message = "\n\nThe Starbucks on Jubilee Campus is currently closed until 0800";
		session.send("%s :)",setOpenClosedSSW("Starbucks on University Park Campus is",830,1730,1100,1600,0,2400,message));
	}
])
intents.matches('ShowBlackwells', [
	function(session){
		session.send("%s :)",setOpenClosed("The Blackwells bookshop on Jubilee Campus is",930,1700));
	}
])
intents.matches('ShowMoochBar', [
	function(session){
		session.send("%s :)",setOpenClosedSSW("The Mooch Bar on University Park Campus is",1100,2359,1200,2500,1200,2230,""));
	}
])
intents.matches('ShowTrentCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("Trent Cafe on University Park is",800,1600));
	}
])
intents.matches('ShowPavilionCafeTimes', [
	function(session){
		session.send("%s :)",setOpenClosedSSW("Pavilion Cafe on University Park Campus is",800,1700,900,1700,1000,1700,"\n\nPlease note \n\nOn performance evenings, the delicious pre-show menu service begins at 5.30pm with last orders at 6.45pm (for 7.30pm performances) or 7.15pm (for 8pm performances) "));
	}
])
intents.matches('ShowBootsTimes', [
	function(session){
		session.send("%s :)",setOpenClosedSSW("Boots on University Park Campus is",830,1900,900,1600,2500,2500,""));
	}
])

//you can get the open time of the Atrium
intents.matches('ShowTheAtrium', [
	function(session){
		var date = new Date();
		var n = date.getDay();
		var time = getCurrTime();
		var message = "\n\nPlease note \n\nHot lunch is available 11.30am–2.00pm";
		if (n == 6 || n == 0){ //Weekend
			if ((time <= 1300 && time >= 1130)||(time <= 1830 && time >= 1700))
				session.send("The Atrium on Jubilee Campus is currently open! %s", message);
			else 
				session.send("The Atrium on Jubilee Campus is closed on weekends at this time\n\n Saturday & Sunday 11.30am–1.00pm 5.00pm–6.30pm %s", message);
		}else if (n < 6){ //Weekday
			if (time <= 1930 && time >= 730)
				session.send("The Atrium on Jubilee Campus is open on weekdays until 17:30 %s", message);
			else
				if (n!=5)
					session.send("The Atrium on Jubilee Campus is closed on weekdays at this time but reopens at 7:30 %s", message);
				else
					session.send("The Atrium on Jubilee Campus is closed on weekdays at this time but reopens at 11:30 %s", message);
		}
		
	}
])
//show Cafe Terrazzo's open time
intents.matches('ShowCafeTerrazzo', [
	function(session){
		session.send("%s",setOpenClosedF("Cafe Terrazzo on University Park",830,1830,830,1700));
	}
])
//show library's Cafe open time 
intents.matches('ShowBSLibraryCafe', [
	function(session){
		session.send("%s",setOpenClosed("Library Café in the Business School South Building on Jubilee Campus is",830,1800,830,1700));
	}
])
function setOpenClosedF(name, openT, closedT, openFri, closedFri) { //Special Friday time
		var date = new Date();
		var n = date.getDay();
		var time = getCurrTime();
		if (n == 6 || n == 0){ //Weekend
				return (name + " is closed on the weekend but opens on Mondays at " + openT);
		}else if (n < 5){ //Weekday - Monday to Thursday
			if (time <= openT && time >= closedT)
				return (name + " is open on weekdays until " + closedT);
			else
				if (n==4)
					return (name + " is closed at this time but reopens at " + openFri + " on Fridays");
				else
					return (name + " is closed at this time but reopens at " + openT + " on weekdays");
		}else if (n = 5){ // Friday
			if (time <= openFri && time >= closedFri)
					return (name + " is open on weekdays until " + closedFri);
				else
					return (name + " is closed at this time but reopens at " + openT + " on weekdays");
		}		
}
intents.matches('ShowCafeRemedy', [
	function(session){
		session.send("%s",setOpenClosed("Cafe Remedy on University Park is",830,1630));
	}
])
function setOpenClosed(name, openT, closedT) {
 		var date = new Date();
		var n = date.getDay();
		var time = getCurrTime();
		if (n == 6 || n == 0){ //Weekend
				return (name + " closed on the weekend");
		}else if (n < 6){ //Weekday - Monday to Thursday
			if (time <= closedT && time >= openT)
				return (name + " open on weekdays until " + closedT);
			else
				return (name + " closed at this time but reopens at " + openT + " on weekdays");
		}
}
function setOpenClosedWeekend(name, openT, closedT, openTw, closedTw) {
 		var date = new Date();
		var n = date.getDay();
		var time = getCurrTime();
		if (n == 6 || n == 0){ //Weekend
				if (time <= closedTw && time >= openTw)
				return (name + " is open on weekends until " + closedTw);
			else
				return (name + " is closed at this time but reopens at " + openT + " on weekdays");
		}else if (n < 6){ //Weekday - Monday to Thursday
			if (time <= closedT && time >= openT)
				return (name + " is open on weekdays until " + closedT);
			else
				return (name + " is closed at this time but reopens at " + openT + " on weekdays");
		}
}
function setOpenClosedSSW(name, openT, closedT, openSat, closedSat, openSun, closedSun, message) { //SaturdaySundayWeekday
 		var date = new Date();
		var n = date.getDay();
		var time = getCurrTime();
		if (n == 6){ //Saturday
				if (time <= closedSat && time >= openSat)
				return (name + " open on weekends until " + closedSat + message);
			else{
					if (n==5)
					return (name + " closed at this time but reopens at " + openSat + " on weekdays" + message);
					else
					return (name + " closed at this time but reopens at " + openT + " on weekdays" + message);
				}
		}else if (n == 0){//Sunday
		if (time <= closedSun && time >= openSun)
				return (name + " open on weekends until " + closedSun + message);
			else
				return (name + " closed at this time but reopens at " + openT + " on weekdays" + message);
		}else if (n < 6){ //Weekday - Monday to Thursday
			if (time <= closedT && time >= openT)
				return (name + " open on weekdays until " + closedT + message);
			else
				return (name + " closed at this time but reopens at " + openT + " on weekdays" + message);
		}
}

//show all Cafe's information of the university
intents.matches('ShowCafeOasis', [
	function(session){
		session.send("%s :)",setOpenClosed("Cafe Oasis on University Park Campus is",800,1600));
	}
])
intents.matches('ShowCavendishCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("Cavendish Cafe on University Park Campus (Cavendish Hall) is",1000,1500));
	}
])
intents.matches('ShowCoatesCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("Coates Cafe on University Park Campus (Coates Building) is",830,1600));
	}
])
intents.matches('ShowJuiceBar', [
	function(session){
		session.send("%s :)",setOpenClosed("Juice Bar on University Park Campus (Portland Building Floor C) is",830,1800));
	}
])
intents.matches('ShowSirCliveGrangerCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("The Sir Clive Granger Cafe on University Park Campus is",845,1615));
	}
])
intents.matches('ShowPizzaPasta', [
	function(session){
		session.send("%s :)",setOpenClosed("Pizza Pasta on University Park Campus\n\n(Portland Food Court – Portland Building, top floor) is",1100,1600));
	}
])
intents.matches('ShowLoveChickenJoes', [
	function(session){
		session.send("%s :)",setOpenClosed("Love Chicken Joes on University Park Campus \n\n(Portland Food Court – Portland Building, top floor) is",1130,1600));
	}
])
intents.matches('ShowItemSeven', [
	function(session){
		session.send("%s :)",setOpenClosed("Item Seven on University Park Campus\n\n(Portland Food Court – Portland Building, top floor) is",1100,1600));
	}
])
intents.matches('ShowCafeAspire', [
	function(session){
		session.send("%s :)",setOpenClosed("Cafe Aspire on Jubilee Campus is",800,1600));
	}
])
intents.matches('ShowBuiltEnvironmentCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("The Built Environment Cafe on University Park Campus is",845,1615));
	}
])
intents.matches('ShowLawAndSocialSciencesCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("The Law and Social Sciences Cafe on University Park Campus is",845,1615));
	}
])
intents.matches('Show56Portland', [
	function(session){
		session.send("%s :)",setOpenClosed("The 56 at Portland Cafe on University Park Campus \n\n(Portland Building 'B' floor) is",830,1700));
	}
])
intents.matches('ShowUniParkHallsLunch', [
	function(session){
		session.send("%s :)",setOpenClosedWeekend("University Park Halls of Residence serving lunch on University Park Campus are: \n\nThe Chicken House – Derby Hall\n\nSnack - Willoughby\n\nGrab 'n' Go – Rutland Hall\n\nEat East – Hugh Stewart Hall\n\n",1230,1330,1230,1330));
	}
])
intents.matches('ShowGeorgeGreenLibraryCafe', [
	function(session){
		session.send("%s :)",setOpenClosedWeekend("George Green Library Cafe on University Park Campus",830,2000,1115,1545));
	}
])
intents.matches('ShowHallwardLibraryCafe', [
	function(session){
		session.send("%s :)",setOpenClosedWeekend("Hallward Library Cafe on University Park Campus",830,2000,1115,1545));
	}
])
intents.matches('ShowMedicalSchoolCafe', [
	function(session){
		session.send("%s :)",setOpenClosed("Medical School Cafe on University Park Campus is",815,1530));
	}
])
intents.matches('ShowHallBars', [
	function(session){
		session.send("%s\n\n%s  :)",setOpenClosedSSW("Echo Bar at Derby, Latitude at Hugh Stewart, Hops at Lenton & Wortley, Core at Newark Jubilee and Vesper at Willoughby are",1130,2300,1930,2300,1930,2200,""),setOpenClosed("Ancaster, Cavendish, Cripps, Florence Boot, Lincoln, Nightingale, Rutland & Sherwood Hall are",1930,2300));
	}
])
// =============== END OPENING TIMES FUNCTION ===============



// =============== LECTURER FUNCTION ===============
// the bot will ask for lecturer's name, you can either type full name or just first name, the bot can recognise typo

intents.matches('ShowLecturer', [
	function(session){
		session.beginDialog('/lecturer');
	}
]);

bot.dialog('/lecturer', [
	function (session) {
        builder.Prompts.text(session, "Please enter name");
    },
	function(session, results, next)
	{
		inputName = results.response;
		var fs = require('fs');
		var names = fs.readFileSync('People/peopleName.txt').toString().split("\n");
		webs = fs.readFileSync('People/peopleWeb.txt').toString().split("\n");
		// find = 0: find exact name; find = 1: find similar name; find = 2: not find; find = 3: find first name; find = 4: find family name.
		allFullNames = [];
		var find = 2; 
		var findName;
		var possibleNames = [];
		for(var i in names) {
			parts = names[i].split(", ");
			var familyName = parts[0];
			var firstName = parts[1];
			var familyFirst = parts.join(" ");
	    	parts.reverse();
			var firstFmaily = parts.join(" ");
			allFullNames.push(firstFmaily);
			if (similarity(inputName, familyFirst) > 0.9 || similarity(inputName, firstFmaily) > 0.9) 
			{
				find = 0;
				findName = firstFmaily;
				session.dialogData.theweb = webs[i];
				break;
			}
			else if (similarity(inputName, familyFirst) > 0.8 || similarity(inputName, firstFmaily) > 0.8) 
			{
				find = 1;
				findName = firstFmaily;
				session.dialogData.theweb = webs[i];
				break;
			}
			else if(similarity(inputName, firstName) > 0.8)
			{
				find = 3;
				possibleNames.push(firstFmaily);
			}
			else if(similarity(inputName, familyName) > 0.8)
			{
				find = 4;
				possibleNames.push(firstFmaily);
			}
		}
		console.log("find = " + find);
		if (find === 1)
		{
			var options = ['yes', 'no'];
			builder.Prompts.choice(session, 'Do you mean ' + firstFmaily + ' ?', options);
			// builder.Prompts.confirm(session, 'Do you mean ' + firstFmaily + ' ?');
		}
		else if(find === 3 || find === 4)
		{
			var options = possibleNames;
			builder.Prompts.choice(session, 'Which person do you mean?', options);
		}
		else if (find === 0)
		{
			next();
		}
		else
		{
			session.send('%s', 'Sorry, no results found.');
			session.replaceDialog('/lecturerAgain');
		}
	},
	function(session, results, next)
	{
		if (results.response)
		{

			if (results.response.entity == 'no')
			{
				session.send('%s', 'Then no results found.');
				session.replaceDialog('/lecturerAgain');
			}
			else if(results.response.entity == 'yes')
			{
				next();
			}
			else
			{
				var chooseName = results.response.entity;
				var index = allFullNames.indexOf(chooseName);
				session.dialogData.theweb = webs[index];
				next();
			}
		}
		else 
		{
			next();
		}
	},
	function(session, results)
	{
		var theweb = session.dialogData.theweb;
		request('https://www.nottingham.ac.uk/computerscience/people/'+theweb, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				var fullName = $('.family-name').prev().text() + ' ' + $('.family-name').text();
				// var job = $('.sys_contentBox','#peopleprofile').children().first().next().next().text();
				var office = "Office: " + $('#staffprofile-address').children().first().next().text();
                var tel = "Tel: " + $('span.value', '#staffprofile-telephone').text();
                var email = "Email: " + $('a', '#staffprofile-email').text();
                // var homepage = $('a', '#staffprofile-url').text();
                var info = '**' + fullName + '**\n\n' + office + '\n\n' + tel + '\n\n' + email;
                session.send('%s', info);
                session.replaceDialog('/lecturerAgain');
            }
        });
	}
]);

bot.dialog('/lecturerAgain', [
    function (session) {
        var options = ['yes', 'no'];
		builder.Prompts.choice(session, 'Do you want to search again?', options);
    },
    function (session, results) {
        if (results.response.entity == 'yes')
		{
			session.replaceDialog('/lecturer');			
		}
		else
		{
			session.endDialog();
		}
    }
]);

//these twos functions can give the sililarity of the input with what we expected
//if the similarity is high but not the same, it may be a typo
function similarity(s1, s2) {
  console.log("enter similarity");
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  console.log("enter editDistance");
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = [];
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
          {
          	if(newValue>lastValue)
          		newValue = lastValue;
          	if(newValue>costs[j])
          		newValue = costs[j];
          	newValue = newValue + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
// =============== END LECTURER FUNCTION ===============



// =============== EVENT FUNCTION ===============
// you can get event list in the following four days 

intents.matches('ShowEventsList', [
	function(session)
	{
		// use "request" API to get the html file of student union webpage about events
		request('https://www.su.nottingham.ac.uk/events/', function (error, response, html) {
			if (!error && response.statusCode == 200) {
				// use "cheerio" API to get useful information
				var $ = cheerio.load(html);
				for (i = 1; i <= 4 ; i++) {
					dailyData = '**' + $('h4','div.day' + i).text() + '**';
    	            $('a.msl_event_name','div.day' + i).each(function(i, element){
    	            	var a = $(this);
    		            dailyData += '\n\n' + a.text() + ': https://www.su.nottingham.ac.uk' + a.attr('href');
    	            });
    	            session.send("%s", dailyData);
                }
            }
        });
	}
]);
// =============== END EVENT FUNCTION ===============



// =============== LATE CW FUNCTION ===============
//you can know what will happen if you submit your coursework after the deadline

intents.matches('ShowLateCWPenalty', [
	function(session){
		builder.Prompts.text(session, "How many days late is your coursework?");
	},
	function(session, results){
		if(results.response){
			if(results.response < 0){
				session.send("There is no penalty for your coursework!");
			}
			else if(results.response > 20){
				session.send("The penalty for your coursework is 100%!");
			}
			else{
				session.send("The penalty for your CW will be " + 5 * results.response + "%.");
				session.send("This is according the University's general rules, however late coursework penalties can sometimes vary between modules.");
			}	
		}

	}
	
]);
// =============== END LATE CW FUNCTION ===============



// =============== STUDENT UNION FUNCTION ===============
// show Student Union's introdunction

intents.matches('ShowStudentUnion', [
	function(session){
		builder.Prompts.text(session, "The  Student's Union offers over 300 clubs and societies, volunteering opportunities, a student magazine (http://www.impactnottingham.com), TV station (http://www.nutsonline.org), and radio station (http://urn1350.net). \n\nWebsite: http://www.su.nottingham.ac.uk \nAddress: University Park Campus, Nottingham, NG7 2RD \nTelephone: +44 (0)115 82 32353 \nEmail: studentcommsoffice@nottingham.ac.uk");
	}
]);
// =============== END STUDENT UNION FUNCTION ===============


// =============== TERM TIME FUNCTION ===============
// show term and semester start and end date

intents.matches('ShowTermTimetable', [
	function(session)
	{
		var fs = require('fs');
		var contents = fs.readFileSync('Others/term.txt', 'utf8');	
		console.log(contents);		
		session.send('\n\n %s', contents);	
	}
]);
// =============== END TERM TIME FUNCTION ===============



// =============== PRINT FUNCTION ===============
//you can get the print details including print, copy etc

intents.matches('ShowPrintDetails', [
	function(session)
	{
		var fs = require('fs');
		var contents = fs.readFileSync('Others/printDetails.txt', 'utf8');	
		console.log(contents);	
		session.send('\n\n %s', contents);
	}
]);
// =============== END PRINT FUNCTION ===============



// =============== CRIPPS FUNCTION ===============
//show the cripps health center's information

intents.matches('ShowCripps', [
	function(session)
	{
		var fs = require('fs');
		var contents = fs.readFileSync('Others/cripps.txt', 'utf8');	
		console.log(contents);	
		session.send('\n\n %s', contents);
	}
]);
// =============== END CRIPPS FUNCTION ===============



// =============== MODULE FUNCTION ===============
// the bot will ask for the module code, and return related information of that module, including credit, semester, assessment, convenor

intents.matches('ShowModuleDetail', [
	function(session){
		session.beginDialog('/module');
	}
]);

bot.dialog('/module', [	
	function (session) {
        builder.Prompts.text(session, "Please enter module code:\n\n(eg. 'G52GRP' or 'GRP')");
    },
	function(session, results, next)
	{
		inputCode = results.response.toUpperCase();
		var result = modulejs.compareInput(inputCode); // call function in module.js
		var find = result[0]; // search result, can be 0, 1 or 2. 2 means there is no corresponding module.
		session.dialogData.theweb = result[1]; // the webpage url of the module
		var theCode = result[2]; // the full version of module code

		if (find == 1) // the input code is short version, eg. GRP
		{
			var options = ['yes', 'no'];
			builder.Prompts.choice(session, 'Do you mean ' + theCode + ' ?', options); // then go to the next step of the waterfall 
		}
		else if (find == 0) // the input code is full version, eg.G52GRP
		{
			next(); // go to the next step of the waterfall
		}
		else
		{
			session.send('%s', 'Sorry, no results found.');
			// ask if the user want to search for another module
			session.replaceDialog('/moduleAgain');
		}
	},
	function(session, results, next)
	{
		if (results.response) // when find = 1
		{

			if (results.response.entity == 'no') // the full version of module code is not what the user means, eg. input is "GRP", but doesn't mean "G52GRP".
			{
				session.send('%s', 'Then no results found.'); 
				session.replaceDialog('/moduleAgain');
			}
			else // the full version of module code is correct
			{
				next();
			}
		}
		else // when find = 0
		{
			next();
		}
	},
	function(session, results) // crawl module detail from webpage
	{
		var theweb = session.dialogData.theweb;
		
		request('http://modulecatalogue.nottingham.ac.uk/nottingham/asp/'+theweb, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var answer = modulejs.loadModuleDetail(html); // call function in module.js
				// scrape url   
  				var detail = "More Detail: " + 'http://modulecatalogue.nottingham.ac.uk/nottingham/asp/'+ theweb;
  				answer += detail;
    	        session.send("%s", answer);
    	        session.replaceDialog('/moduleAgain');
            }
        });
	}
]);

// so that the user can search for multiple times
bot.dialog('/moduleAgain', [
    function (session) {
        var options = ['yes', 'no'];
		builder.Prompts.choice(session, 'Do you want to search again?', options);
    },
    function (session, results) {
        if (results.response.entity == 'yes')
		{
			session.replaceDialog('/module');			
		}
		else
		{
			session.endDialog();
		}
    }
]);
// =============== END MODULE FUNCTION ===============



// =============== TRAM FUNCTION ===============

var trams = {
    "TOTON LANE>HUCKNALL": {
        Info: ""
    },
    "HUCKNALL>TOTON LANE": {
    	Info: ""
    },
	"CLIFTON>PHOENIX PARK": {
    	Info: ""
    },
    "PHOENIX PARK>CLIFTON": {
    	Info: ""
    }
};

//tram route1
var tramsRoute1 = {
	"Toton Lane(1)": {
		Info: ""
	},
	"Beeston Center(1)": {
		Info: ""
	},
	"QMC(1)": {
		Info: ""
	},
	"NG2(1)": {
		Info: ""
	},
	"Nottingham Station(1)": {
		Info: ""
	},
	"Old Market Square(1)": {
		Info: ""
	},
	"The Forest(1)": {
		Info: ""
	},
	"Wilkinson Street(1)": {
		Info: ""
	},
	"Highbury Vale(1)": {
		Info: ""
	},
	"Bulwell(1)": {
		Info: ""
	},
	"Hucknall(1)": {
		Info: ""
	}
};

//tram route2
var tramsRoute2 = {
	"Hucknall(2)": {
		Info: ""
	},
	"Bulwell(2)": {
		Info: ""
	},
	"Highbury Vale(2)": {
		Info: ""
	},
	"Wilkinson Street(2)": {
		Info: ""
	},
	"The Forest(2)": {
		Info: ""
	},
	"Old Market Square(2)": {
		Info: ""
	},
	"Nottingham Station(2)": {
		Info: ""
	},
	"NG2(2)": {
		Info: ""
	},
	"QMC(2)": {
		Info: ""
	},
	"Beeston Center(2)": {
		Info: ""
	},
	"Toton Lane(2)": {
		Info: ""
	}

};

//tram route3
var tramsRoute3 = {
	"Clifton South(3)": {
		Info: ""
	},
	"Clifton Centre(3)": {
		Info: ""
	},
	"Wilford Lane(3)": {
		Info: ""
	},
	"Nottingham Station(3)": {
		Info: ""
	},
	"Old Market Square(3)": {
		Info: ""
	},
	"The Forest(3)": {
		Info: ""
	},
	"Wilkinson Street(3)": {
		Info: ""
	},
	"Highbury Vale(3)": {
		Info: ""
	},
	"Phoenix Park(3)": {
		Info: ""
	}

};

//tram route4
var tramsRoute4 = {
	"Phoenix Park(4)": {
		Info: ""
	},
	"Highbury Vale(4)": {
		Info: ""
	},
	"Wilkinson Street(4)": {
		Info: ""
	},
	"The Forest(4)": {
		Info: ""
	},
	"Old Market Square(4)": {
		Info: ""
	},
	"Nottingham Station(4)": {
		Info: ""
	},
	"Wilford Lane(4)": {
		Info: ""
	},
	"Clifton Centre(4)": {
		Info: ""
	},
	"Clifton South(4)": {
		Info: ""
	}

};

intents.matches('ShowTram', [
	function(session)
	{	
		builder.Prompts.choice(session, 'Which route would you choose?', trams);
		
	},
	function (session, results)
	{
		if(results.response) {
        	tramRoute = results.response.entity;
        	
        	if(tramRoute == "TOTON LANE>HUCKNALL"){     		
        		//builder.Prompts.text(session, "You can choose the closest stop from following: Toton Lane, Beeston Center, UoN, QMC, NG2, Nottingham Station, Old Market Square, The Forest, Wilkinson Street, Highbury Vale, Bulwell, Hucknall.");
        		builder.Prompts.choice(session, 'You can choose the closest stop from following: ', tramsRoute1);
        	}
        	if(tramRoute == "HUCKNALL>TOTON LANE"){
        	 	//builder.Prompts.text(session, "You can choose the closest stop from following: Hucknall, Bulwell, Highbury Vale, Wilkinson Street, The Forest, Old Market Square, Nottingham Station, NG2, QMC, UoN, Beeston Center, Toton Lane.");
        		builder.Prompts.choice(session, 'You can choose the closest stop from following: ', tramsRoute2);
        	}
        	if(tramRoute == "CLIFTON>PHOENIX PARK"){
        		//builder.Prompts.text(session, "You can choose the closest stop from following: Clifton South, Clifton Center, Wilford Lane, Nottingham Station, Old Market Square, The Forest, Wilkinson Street, Highbury Vale, Phoenix Park.");
        		builder.Prompts.choice(session, 'You can choose the closest stop from following: ', tramsRoute3);
        	}
        	if(tramRoute == "PHOENIX PARK>CLIFTON"){
        		//builder.Prompts.text(session, "You can choose the closest stop from following: Phoenix Park, Highbury Vale, Wilkinson Street, The Forest, Old Market Square, Nottingham Station, Wilford Lane, Clifton Center, Clifton South");
        		builder.Prompts.choice(session, 'You can choose the closest stop from following: ', tramsRoute4);
        	}
        }
    }, 
    function (session, results)
	{

    	var date = new Date();
		var n = date.getDay();
		var time = getCurrTime();

		if(results.response){
			tramStop = results.response.entity;

        	if(n == 1 || n == 2 || n == 3 || n == 4 || n == 5){
        		session.send("The current time is: " + date);
        		
        		if(tramStop == "Toton Lane(1)" || tramStop == "Beeston Center(1)" || tramStop == "QMC(1)" || tramStop == "NG2(1)" || tramStop == "Nottingham Station(1)" || tramStop == "Old Market Square(1)" || tramStop == "The Forest(1)" || tramStop == "Wilkinson Street(1)" || tramStop == "Highbury Vale(1)" || tramStop == "Bulwell(1)" || tramStop == "Hucknall(1)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/iEKrLzL.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Toton Lane(2)" || tramStop == "Beeston Center(2)" || tramStop == "QMC(2)" || tramStop == "NG2(2)" || tramStop == "Nottingham Station(2)" || tramStop == "Old Market Square(2)" || tramStop == "The Forest(2)" || tramStop == "Wilkinson Street(2)" || tramStop == "Highbury Vale(2)" || tramStop == "Bulwell(2)" || tramStop == "Hucknall(2)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/68YAutV.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Clifton South(3)" || tramStop == "Clifton Centre(3)" || tramStop == "Wilford Lane(3)" || tramStop == "Nottingham Station(3)" || tramStop == "Old Market Square(3)" || tramStop == "The Forest(3)" || tramStop == "Wilkinson Street(3)" || tramStop == "Highbury Vale(3)" || tramStop == "Phoenix Park(3)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/90fdvAZ.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Clifton South(4)" || tramStop == "Clifton Centre(4)" || tramStop == "Wilford Lane(4)" || tramStop == "Nottingham Station(4)" || tramStop == "Old Market Square(4)" || tramStop == "The Forest(4)" || tramStop == "Wilkinson Street(4)" || tramStop == "Highbury Vale(4)" || tramStop == "Phoenix Park(4)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/kDVkBjW.png"
            		}]);
       				session.endDialog(msg);
        		}
        	}
        	if(n == 6){
        		session.send("The current time is: " + date);
        		if(tramStop == "Toton Lane(1)" || tramStop == "Beeston Center(1)" || tramStop == "QMC(1)" || tramStop == "NG2(1)" || tramStop == "Nottingham Station(1)" || tramStop == "Old Market Square(1)" || tramStop == "The Forest(1)" || tramStop == "Wilkinson Street(1)" || tramStop == "Highbury Vale(1)" || tramStop == "Bulwell(1)" || tramStop == "Hucknall(1)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/jY7xmZC.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Toton Lane(2)" || tramStop == "Beeston Center(2)" || tramStop == "QMC(2)" || tramStop == "NG2(2)" || tramStop == "Nottingham Station(2)" || tramStop == "Old Market Square(2)" || tramStop == "The Forest(2)" || tramStop == "Wilkinson Street(2)" || tramStop == "Highbury Vale(2)" || tramStop == "Bulwell(2)" || tramStop == "Hucknall(2)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/HOBY3tX.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Clifton South(3)" || tramStop == "Clifton Centre(3)" || tramStop == "Wilford Lane(3)" || tramStop == "Nottingham Station(3)" || tramStop == "Old Market Square(3)" || tramStop == "The Forest(3)" || tramStop == "Wilkinson Street(3)" || tramStop == "Highbury Vale(3)" || tramStop == "Phoenix Park(3)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/3wQ6s7T.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Clifton South(4)" || tramStop == "Clifton Centre(4)" || tramStop == "Wilford Lane(4)" || tramStop == "Nottingham Station(4)" || tramStop == "Old Market Square(4)" || tramStop == "The Forest(4)" || tramStop == "Wilkinson Street(4)" || tramStop == "Highbury Vale(4)" || tramStop == "Phoenix Park(4)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/gqaXuVq.png"
            		}]);
       				session.endDialog(msg);
        		}

        	}
        	if(n == 0){
        		session.send("The current time is: " + date);
        		if(tramStop == "Toton Lane(1)" || tramStop == "Beeston Center(1)" || tramStop == "QMC(1)" || tramStop == "NG2(1)" || tramStop == "Nottingham Station(1)" || tramStop == "Old Market Square(1)" || tramStop == "The Forest(1)" || tramStop == "Wilkinson Street(1)" || tramStop == "Highbury Vale(1)" || tramStop == "Bulwell(1)" || tramStop == "Hucknall(1)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/f4zDRRJ.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Toton Lane(2)" || tramStop == "Beeston Center(2)" || tramStop == "QMC(2)" || tramStop == "NG2(2)" || tramStop == "Nottingham Station(2)" || tramStop == "Old Market Square(2)" || tramStop == "The Forest(2)" || tramStop == "Wilkinson Street(2)" || tramStop == "Highbury Vale(2)" || tramStop == "Bulwell(2)" || tramStop == "Hucknall(2)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/9ChZabZ.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Clifton South(3)" || tramStop == "Clifton Centre(3)" || tramStop == "Wilford Lane(3)" || tramStop == "Nottingham Station(3)" || tramStop == "Old Market Square(3)" || tramStop == "The Forest(3)" || tramStop == "Wilkinson Street(3)" || tramStop == "Highbury Vale(3)" || tramStop == "Phoenix Park(3)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/ldPonSB.png"
            		}]);
       				session.endDialog(msg);
        		}

        		if(tramStop == "Clifton South(4)" || tramStop == "Clifton Centre(4)" || tramStop == "Wilford Lane(4)" || tramStop == "Nottingham Station(4)" || tramStop == "Old Market Square(4)" || tramStop == "The Forest(4)" || tramStop == "Wilkinson Street(4)" || tramStop == "Highbury Vale(4)" || tramStop == "Phoenix Park(4)"){
        		
        			var msg = new builder.Message(session)
            		.attachments([{
               			contentType: "image/png",
                		contentUrl: "http://i.imgur.com/kaDfXgj.png"
            		}]);
       				session.endDialog(msg);
        		}

        	}
   
		}	

    }

]);
// =============== END TRAM FUNCTION ===============



// =============== MENU FUNCTION ===============
// if the user want to know what the bot can do, or when the bot can't understand the user, 
// the bot will show the user a group of cards which can be swiped between, so that they can find the function they need easily

intents.matches('ShowMenu', [
	function(session){
		var msg = new builder.Message(session)
			.attachmentLayout(builder.AttachmentLayout.carousel)
            .textFormat(builder.TextFormat.xml)
            .attachments([
            	// "Hopper Bus Times" card contains five buttons, namely 901, 902, 903, 904, 905
                new builder.HeroCard(session)
                    .title("Hopper Bus Times")
                    .text("Find out when the next hopper bus will come!")
                    .images([
                        builder.CardImage.create(session, "https://www.nottingham.ac.uk/StudentServices/Images/Services/HopperBus.jpg")
                    ])
                    .buttons([
            			builder.CardAction.postBack(session, '901', '901'),
            			builder.CardAction.postBack(session, '902', '902'),
            			builder.CardAction.postBack(session, '903', '903'),
						builder.CardAction.postBack(session, '904', '904'),
            			builder.CardAction.postBack(session, '905', '905')
        			]),
        		// "Study" card contains three buttons, namely "Module", "Lecturer", "Late CW penalty"
        		new builder.HeroCard(session)
                    .title("Study")
                    .text("Find out information to help you with your course!")
                    .images([
                        builder.CardImage.create(session, "https://www.nottingham.ac.uk/StudentServices/Images/Services/exams.jpg")
                    ])
                    .buttons([
            			builder.CardAction.postBack(session, 'Module detail', 'Module'), 
            			builder.CardAction.postBack(session, 'lecturer', 'Lecturer'),
            			builder.CardAction.postBack(session, 'Late CW', 'Late CW penalty')
        			]),
        		// "Today" card contains three buttons, namely "Weather", "Library opening times" and "Shop opening times"
        		new builder.HeroCard(session)
                    .title("Today")
                    .text("Find out more about today!")
                    .images([
                        builder.CardImage.create(session, "https://www.nottingham.ac.uk/StudentServices/Images/Services/Libraries.jpg")
                    ])
                    .buttons([
                    	builder.CardAction.postBack(session, 'weather', 'Weather'),
                    	builder.CardAction.postBack(session, 'Library', 'Library opening times'),
            			builder.CardAction.postBack(session, 'selected', 'Shop opening times')
        			]),
        		// "University Life" card contains two buttons, namely "Event" and "University Card Query"
        		new builder.HeroCard(session)
                    .title("University Life")
                    .text("Find out more about general university life!")
                    .images([
                        builder.CardImage.create(session, "https://www.nottingham.ac.uk/StudentServices/Images/Services/health.jpg")
                    ])
                    .buttons([
            			builder.CardAction.postBack(session, 'events', "Event"), 
            			builder.CardAction.postBack(session, 'card', 'University Card Query')
        			])
            ]);
        session.endDialog(msg);
	}
])
// =============== END MENU FUNCTION ===============



intents.matches('ShowTimetable', [
	function(session){
				session.send("You can find your timetable here: \n\n https://timetabling.nottingham.ac.uk/");
	}
	
]);
intents.matches('ShowOpenTimesPrompt', [
	function(session){
				session.send("NottBot has many university opening times!\n\n Type in a venue name to search e.g. Starbucks");
	}
	
]);
intents.matches('ShowThanks', [
	function(session){
				session.send("No Problem \n\n Im here to help :)");
	}
	
]);