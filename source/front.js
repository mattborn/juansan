(function () {
	'use strict';

	$.get('https://api.github.com/repos/mattborn/juansan/commits',
		function (data) {
			var date = data[0].commit.author.date;
			$('.updated').html(moment(date).fromNow());
		}).fail(function () {
			$('.updated').html('awhile ago');
		});

})();
