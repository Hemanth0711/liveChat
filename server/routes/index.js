var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/', function (req, res, next) {
  res.render('index', { title: 'Chat' });
});

router.get('/api', (req, res, next) => {
  res.render('index', { title: "Users" });
})

module.exports = router;