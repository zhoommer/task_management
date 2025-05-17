const createError = require('http-errors');
const path = require('path');
const routes = require('./src/routes/index');
const accessLogStream = require('./src/utils/logging');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./src/config/db');

require('dotenv').config();

// port constant
const PORT = process.env.PUBLIC_NODE_PORT_NUMBER || 3000;

const app = express();

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routes
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// db errors
db().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
