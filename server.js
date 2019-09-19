const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();

// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
  // OPTIONAL: Includes more verbose logging
  verbose: true,
}));


// app.use(serveStatic(`${__dirname}/dist`));
// app.use(serveStatic(`${path.dirname(__filename)}/dist`));
app.use(serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 5000;
app.listen(port);
