// Works in modern browsers + IE9, but Modernizr has a polyfill baked in for function.bind.
// Hat tip Paul Irish
var o=$({});$.subscribe=o.on.bind(o),$.unsubscribe=o.off.bind(o),$.publish=o.trigger.bind(o);

// Does an inplace shuffle of an array in O(n) time. 
// Uses the Fisher-Yates Shuffle.
Array.prototype.shuffle||(Array.prototype.shuffle=function(){for(var b,c,a=this.length;a;)c=Math.floor(Math.random()*a--),b=this[a],this[a]=this[c],this[c]=b});

// Remove first element, place it at the end.
// Returns the first element before move.
Array.prototype.cycle||(Array.prototype.cycle=function(){var a=this.shift();return this.push(a),a});

var queue  = [],
	tweets = [];

function tweetToQueue(){
	var tweet = tweets.pop();
	if(tweet) queue.push(tweet);
	return tweet;
}

function getTweets(since_id){
	since_id = since_id || false;
	var url = '/tweets/' + ((since_id) ? 'since/' + since_id : '');

	$.getJSON(url, function(data){
		data.statuses.reverse();
		tweets = tweets.concat(data.statuses);

		// automatically get new tweets
		setTimeout(function(){getTweets(data.search_metadata.max_id);}, 1000);
	});
}

function displayTweets(num, speed){
	var tweet = {};
	for(var i = 0; i < num; i++){
		tweet = tweetToQueue() || queue.cycle();
		$('body').append(JSON.stringify(tweet));
	}

	if(tweets.length < num){
		tweets.shuffle();
	}

	// automatically display next set of tweets
	setTimeout(function(){displayTweets(num, speed);}, speed);
}