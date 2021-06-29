const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res, next) => {
	Celebrity.find()
		.then(celebritiesFromDB => {
      console.log(`these are the celebrities: ${celebritiesFromDB}`); 
			res.render('celebrities/index', { celebritiesList: celebritiesFromDB });
		})
		.catch(err => {
      console.log(err)
      next();
		})
});

router.get('/:id/edit', (req, res, next) => {
	Celebrity.findById(req.params.id)
		.then(celebrityFromDB => {
			console.log(`This is the celebrity selected: ${celebrityFromDB}`)
			res.render('celebrities/edit', {celebritySelected: celebrityFromDB})
		})
		.catch((err) => {
			console.log(err)
			next();
		})
})

router.get('/:id', (req, res, next) => {
	Celebrity.findById(req.params.id)
		.then(celebrityFromDB => {
			console.log(`this is the celebrity selected: ${celebrityFromDB}`);
			res.render('celebrities/show', {celebritySelected : celebrityFromDB })
		})
		.catch(err => {
      console.log(err)
      next();
		})
})

router.get('/new', (req, res, next) => {
	res.render("celebrities/new")
})

router.post('/', (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body;
	Celebrity.create({ name, occupation, catchPhrase})
		.then(() => {
			res.redirect('/celebrities')
		})
		.catch(err => {
			console.log(err)
			res.render('celebrities/new');
			next();
		})
})

router.post('/:id/delete', (req, res, next) => {
	Celebrity.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect('/celebrities')
		})
		.catch((err) => {
			console.log(err)
			next();
		})
})

router.post('/:id', (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body;
	Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
	.then(() => {
		res.redirect('/celebrities')
	})
	.catch((err) => {
		console.log(err)
		next();
	})
})





module.exports = router;

  
