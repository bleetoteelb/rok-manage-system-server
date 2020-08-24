const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { init } = require('./services/init');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const memberRouter = require('./routes/member');
const osirisRouter = require('./routes/osiris');
const configRouter = require('./routes/config');
const showlistRouter = require('./routes/showlist');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/member', memberRouter);
app.use('/api/osiris', osirisRouter);
app.use('/api/config', configRouter);
app.use('/api/showlist', showlistRouter);
app.use('/*', indexRouter);

// Init server
init();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
