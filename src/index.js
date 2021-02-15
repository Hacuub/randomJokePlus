// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');

const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');

const jsonHandler = require('./jsonResponses.js');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code

const urlStruct = {
  '/random-joke': jsonHandler.getRandomJokeResponse,
  '/random-jokes': jsonHandler.getRandomJokeResponse,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  const { limit } = params;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, limit);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
