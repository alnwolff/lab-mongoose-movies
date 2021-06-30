const router = require("express").Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then(moviesFromDB => {
      console.log(`These are the movies from the DataBase ${moviesFromDB}`)
      res.render('movies/index', { moviesList: moviesFromDB });
    })
    .catch((err) => {
      console.log(err);
      next();
    })
});

router.get('/new', (req, res, next) => {
  Celebrity.find()
    .then(celebritiesFromDB => {
      console.log(`celebrities from the database: ${celebritiesFromDB}`)
      res.render('movies/new', {celebritiesList : celebritiesFromDB})
    })
    .catch(err => {
      console.log(err);
      next();
    })
})

router.post('/', (req, res, next) => {
	const {title, genre, plot, cast} = req.body;
  
	Movie.create({title, genre, plot, cast})
		.then(movieCreated => {
      console.log(movieCreated)
			res.redirect('/movies')
		})
		.catch(err => {
			console.log(err)
			res.render('movies/new');
			next();
		})
})

router.get('/:id/edit', (req, res, next) => {
	Movie.findById(req.params.id)
    // .populate('cast')
		.then(movieFromDB => {
			// console.log(`This is the celebrity selected: ${movieFromDB}`)
      Celebrity.find()
        .then(celebrityFromDB => {
			res.render('movies/edit', {movieSelected: movieFromDB, celebritiesFromDB: celebrityFromDB})
        })
        .catch(err => {
          console.log(err);
          next(err);
        })
		})
		.catch((err) => {
			console.log(err)
			next();
		})
})

router.post('/:id/edit', (req, res, next) => {
	const {title, genre, plot, cast} = req.body;
	Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
	.then(() => {
		res.redirect('/movies')
	})
	.catch((err) => {
		console.log(err)
		next();
	})
})

module.exports = router;