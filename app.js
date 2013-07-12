
/**
 * Module dependencies.
 */

var express = require('express'),
	routes  = require('./routes'),
	utils   = require('./lib/utils'),
	http    = require('http'),
	path    = require('path'),
	twitter = require('twitter'),
	habitat = require('habitat');

// load habitat (env management)
habitat.load();

var app  = express(),
	env  = new habitat(),
	twit = new twitter({
		consumer_key: env.get('consumer_key'),
		consumer_secret: env.get('consumer_secret'),
		access_token_key: env.get('access_token_key'),
		access_token_secret: env.get('access_token_secret')
	});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.param('since_id', function(req, res, next, since_id){
	if(/^\d+$/.test(since_id)){
		res.since_id = since_id;
	}
	next();
});

app.get('/', routes.index);


app.get('/tweets', function(req, res){
	twit.search(env.get('search_string'), function(data){
		var response = {
			statuses: [],
			search_metadata: {}
		};
		data.statuses.forEach(function(e, i, a){
			tweet = utils.simplifyTweet(e);

			response.statuses.push(tweet);
		});

		response.search_metadata.max_id = data.search_metadata.max_id;

		res.set('Content-Type:', 'application/json');
		res.send(JSON.stringify(response));
	});
});

app.get('/tweets/since/:since_id', function(req, res){
	twit.search(env.get('search_string'), { since_id: res.since_id }, function(data){
		var response = {
			statuses: [],
			search_metadata: {}
		};
		data.statuses.forEach(function(e, i, a){
			tweet = utils.simplifyTweet(e);

			response.statuses.push(tweet);
		});

		response.statuses.pop();

		response.search_metadata.max_id = data.search_metadata.max_id;

		res.set('Content-Type:', 'application/json');
		res.send(JSON.stringify(response));
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
