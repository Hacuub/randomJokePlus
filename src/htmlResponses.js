// 5 - here's our 404 page

const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const cssPage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssPage);
  response.end();
};

module.exports = {
  get404Response,
  getCSSResponse,
};
