if ( !Array.prototype.forEach ) {
	Array.prototype.forEach = function(fn, scope) {
		for(var i = 0, len = this.length; i < len; ++i) {
			if (i in this) {
				fn.call(scope, this[i], i, this);
			}
		}
	};
}

module.exports = {
	simplifyTweet: function(tweet){
		return {
			id: tweet.id,
			created_at: tweet.created_at,
			text: tweet.text,
			user: {
				name: tweet.user.name,
				screen_name: tweet.user.screen_name,
				profile_image_url: tweet.user.profile_image_url
			},
			entities: {
				media: tweet.entities.media
			}
		};
	}
};