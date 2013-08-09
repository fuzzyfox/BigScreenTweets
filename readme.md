# Big Screen Tweets
A simple to use tool to display tweets tweets in a format suitable for use at conferences. This provides a backend that acts as a proxy for some of the [Twitter API](http://dev.twitter.com/docs/api/1.1).

This project replaces [tweet-screen](http://github.com/fuzzyfox/tweet-screen).

## Current API Support

* [GET Search/tweets](https://dev.twitter.com/docs/api/1.1/get/search/tweets)
	* `/twitter/search/tweets.json`

### Additional

* Tweet out QR code generator. Uses the [Twitter Web Intents API](https://dev.twitter.com/docs/intents#tweet-intent)
	* `/qr.png`

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

### Configure

Next open .env in your prefered editor and set **all** values.

#### Required Options

* CONSUMER_KEY
* CONSUMER_SECRET
* ACCESS_TOKEN_KEY
* ACCESS_TOKEN_SECRET
* SEARCH_STRING *- the search to match tweets to*

#### Optional

* TWEET_VIA *- the username you want to accredit for causing the tweet*
* PORT *- what port to run this on*

## Usage
Run the app with:

	node app

You should now be able to open Big Screen Tweets in your browser at `localhost:8080` *(unless you've changed the port number)*
