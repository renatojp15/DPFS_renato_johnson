var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
let cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let productCartRouter = require('./routes/productCart');
let productsRouter = require('./routes/products');
let apiUsersRouter = require('./routes/apiUsers');
let apiProductsRouter = require('./routes/apiProducts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
  secret: 'naiyeris',
  resave: false,
  saveUninitialized: false,
}));
// Middleware para manejar sesiones
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Servir los archivos estáticos de React
// app.use(express.static(path.join(__dirname, '../FrontEnd/build')));

// Manejar cualquier otra ruta con React
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../FrontEnd/build', 'index.html'));
// });

// app.listen(5000, () => console.log('Servidor en puerto 5000'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/productCart', productCartRouter);
app.use('/products', productsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);

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
