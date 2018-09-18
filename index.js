const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
	token: 'xoxb-436868198145-436728307408-AESyBWTq0xBejmhUvSa1qZwX',
	name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
	const params = {
		icon_emoji:':smiley:'
	};

	bot.postMessageToChannel(
		'general',
		'Get Ready To Laugh with @jokebot',
		params

		);
});

// Error Handler

bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', data => {
	if (data.type !== 'message'){
		return;
	}
	handleMessage(data.text);
});

// Respond to Data
function handleMessage(message) {
	if(message.includes(' chucknorris')){
		chuckJoke();
	} else if (message.includes(' yomama')){
		yoMamaJoke();
	} else if (message.includes(' random')){
		randomJoke();
	} else if (message.includes(' help')){
		runHelp();
	}
}

// Tell a chuck Norris Joke

function chuckJoke() {
	axios.get('http://api.icndb.com/jokes/random')
	.then(res => {
		const joke = res.data.value.joke;
		//console.log(res);

		const params = {
		icon_emoji:':laughing:'
	};

	bot.postMessageToChannel('general',`chucknorris Joke: ${joke}`,params);
	})
}

// Yo Mama's Joke

function yoMamaJoke() {
	axios.get('http://api.yomomma.info')
	.then(res => {
		const joke = res.data.joke;
		//console.log(res);

		const params = {
		icon_emoji:':laughing:'
	};

	bot.postMessageToChannel('general',`Yo momma's joke: ${joke}`,params);
	})
}

// Tell a Random Joke

function  randomJoke(){
	const rand = Math.floor(Math.random()*2) + 1;
	if (rand === 1){
		chuckJoke();
	} else if (rand === 2){
		yoMamaJoke();
	}
}

// Get Help

function runHelp(){
	const params = {
		icon_emoji:':question:'
	};

	bot.postMessageToChannel('general',`type @jokebot  with either 'chucknorris', 'yomama' or 'random' to get a joke`,params);
}