// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');


const app = express();

// SET UP VIEW ENGINE
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the app directory
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('index');
});

// 






// LISTEN TO PORT
app.listen(PORT, () => {
	console.log(`App now listening at PORT: ${PORT}`);
});