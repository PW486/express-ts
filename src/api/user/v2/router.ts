import express from 'express';

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.send('user2');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('user2/about');
});

module.exports = router;
