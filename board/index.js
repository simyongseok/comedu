var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passport');
var util = require('./util');
var app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.util = util;
  next();
});

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', util.getPostQueryString, require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', util.getPostQueryString, require('./routes/comments'));
app.use('/files', require('./routes/files'));

app.use('/admin', require('./routes/admin/admin_home'));
app.use('/admin/users', require('./routes/admin/admin_users'));
app.use('/admin/posts', require('./routes/admin/admin_posts'));
app.use('/admin/comments', util.getPostQueryString, require('./routes/admin/admin_comments'));
app.use('/admin/files', require('./routes/admin/admin_files'));

app.use('/class', require('./routes/class/home'));
app.use('/class/users', require('./routes/class/users'));
app.use('/class/school_B', require('./routes/class/school_B'));
app.use('/class/comments', util.getPostQueryString, require('./routes/class/comments'));
app.use('/class/files', require('./routes/class/files'));




// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
