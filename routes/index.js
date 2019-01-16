var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.con;
    var data = "";

    db.query('SELECT * FROM test', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('index', { title: '先鋒科技', data: data});
    });

});
router.get('/add', function(req, res, next) {

    // use userAdd.ejs
    res.render('userAdd', { title: 'Add User', msg: '' });
});
router.get('/qrcode', function(req, res, next) {

    // use userAdd.ejs
    res.render('qrcode', { title: '', msg: '' });
});

router.post('/userAdd', function(req, res, next) {

    var db = req.con;

    var sql = {
        id: req.body.id,
        name: req.body.name,
        color: req.body.color,
		length:  req.body.length
    };

    //console.log(sql);
    var qur = db.query('INSERT INTO test SET ?', sql, function(err, rows) {
		 console.log('insert '+sql);
        if (err) {
            console.log(err);
        }
		
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


module.exports = router;
