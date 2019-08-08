// code from:
// https://github.com/pevers/images-scraper

var Scraper = require ('images-scraper')
  , google = new Scraper.Google()

// will take ALOT of time if num=undefined
google.list({
	keyword: 'sad animal facts site:sadanimalfacts.com',
	num: 20,
	detail: true,
	nightmare: {
		show: true
    }
//     ,
//   advanced: {
//     imgType: 'photo', // options: clipart, face, lineart, news, photo
//     resolution: undefined, // options: l(arge), m(edium), i(cons), etc.
//     color: undefined // options: color, gray, trans
//   }
})
.then(function (res) {
	console.log('first 10 results from google', res);
}).catch(function(err) {
	console.log('err',err);
});