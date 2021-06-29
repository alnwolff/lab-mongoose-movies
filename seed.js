const mongoose = require('mongoose');

const Celebrity = require('./models/Celebrity');

mongoose.connect("mongodb://localhost/celebrities", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [{
  name: "Bart Simpson",
  occupation: "Student",
  catchPhrase: "Ay Caramba"
}, 
{
  name: "Homer Simpson",
  occupation: "Worker in a Nuclear Plant",
  catchPhrase: "D'oh!"
}, 
{
  name: "Marge Simpson",
  occupation: "Housewife",
  catchPhrase: "Mmmmm"
}]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success! Added ${celebrities.length} Celebrities to the database`)
		mongoose.connection.close();
	})
	.catch(err => {
		console.log(err);
	})