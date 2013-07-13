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

// wicked closure pattern w/ hat tip to Paul Irish [source](https://gist.github.com/paulirish/315916)
window.bst = (function(window, document, undefined){
	var $ = window.jQuery;

	return {
		_tweets: [],
		_queue: [],
		_timers: {},
		_tweetToQueue: function(){
			var tweet = this._queue.pop();
			if(tweet) this._tweets.push();
			return tweet;
		},
		_fetchTweets: function(since_id){
			since_id = since_id || false;
			var url = '/twitter/search/tweets.json' + ((since_id) ? '?since_id=' + since_id : ''),
				that = this;

			$.getJSON(url, function(data){
				data.statuses.reverse();
				that._queue = that._queue.concat(data.statuses);
			});
		},
		init: function(){
			options = {
				fetch_interval: 1000
			};

			this._timers.fetch = setInterval(this._fetchTweets, options.fetch_interval);
		},
		deinit: function(){
			// stop fetching tweets
			clearInterval(this._timers.fetch);

			// clear the queues
			this._tweets = [];
			this._queue  = [];
		},
		getTweets: function(n){
			var tweets = [];
			for(var i = 0; i < n; i++){
				tweets.push(this._tweetToQueue() || this._tweets.pop());
			}

			if(this._queue.length === 0){
				this._tweets.shuffle();
			}

			return tweets;
		}
	};
})(this, this.document);