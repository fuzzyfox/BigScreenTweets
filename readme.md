# Big Screen Tweets
A simple to use tool to display tweets tweets in a format suitable for use at conferences. This provides a backend that acts as a proxy for some of the [Twitter API](http://dev.twitter.com/docs/api/1.1).

This project replaces [tweet-screen](http://github.com/fuzzyfox/tweet-screen).

## Current API Support

* [GET Search/tweets](https://dev.twitter.com/docs/api/1.1/get/search/tweets)
	* `/twitter/search/tweets.json`

### Additional

* Tweet out QR code generator. Uses the [Twitter Web Intents API](https://dev.twitter.com/docs/intents#tweet-intent)
	* `/qr.png`

## Front-End

## Installation
In order to run Big Screen Tweets you need the following:

* Node
* A fork of this repository (if you plan to customize)
* Twitter OAuth details (this won't be the case for much longer)

### Setup
Clone and install:

	git clone git@github.com:[youruser]/BigScreenTweets.git
	cd BigScreenTweets && npm install

Create configuration file:

	cp env.sample .env

Next open .env in your prefered editor and set **all** values.

Finally run the app with:

	node app