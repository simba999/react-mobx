const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'));
	app.get('*', function(req,res){
		res.sendFile(__dirname + '/build/index.html');
	})
};

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
