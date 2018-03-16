// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

// set up the express app
const app = express();
const PORT = process.env.PORT || 8080;

// models
const db = require('./models');

// set up express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application
app.use(bodyParser.json());

// SET UP VIEW ENGINE
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the app directory
app.use(express.static("public"));



// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('index');
});

// syncing our sequelize models and then starting our express app
db.sequelize.sync({force:true}).then(() => {
	app.listen(PORT, () => {
		console.log(`App now listening at PORT: ${PORT}`);
	});
});






// // LISTEN TO PORT
// app.listen(PORT, () => {
// 	console.log(`App now listening at PORT: ${PORT}`);
// });