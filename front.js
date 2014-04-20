(function () {
	'use strict';

	$.get('https://api.github.com/repos/mattborn/juansan/commits',
		function (data) {
			var date = data[0].commit.author.date;
			$('.juansan-time').append(' '+ moment(date).fromNow());
		}).fail(function () {
			$('.juansan-time').append(' awhile ago.');
		});

})();
