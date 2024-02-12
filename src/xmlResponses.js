// Seperate XML Handler code because XML is messy, as opposed to JSON

const respondXML = (request, response, status, xml) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(xml);
  response.end();
};

const success = (request, response) => {
  const xml = '<response><message>Response was successful.</message></response>';
  respondXML(request, response, 200, xml);
};

const badRequest = (request, response, params) => {
  let xml = '<response><message>Required params are present.</message></response>';

  if (!params.valid || params.valid !== 'true') {
    xml = '<response><message>Missing valid query parameter set to true.</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, xml);
  }

  return respondXML(request, response, 200, xml);
};

const unauthorized = (request, response, params) => {
  let xml = '<response><message>You have successfully viewed the content.</message></response>';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    xml = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, xml);
  }

  return respondXML(request, response, 200, xml);
};

const forbidden = (request, response) => {
  const xml = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
  respondXML(request, response, 403, xml);
};

const internal = (request, response) => {
  const xml = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
  respondXML(request, response, 500, xml);
};

const notImplemented = (request, response) => {
  const xml = '<response><message>A get request for this page has not been implemented yet.</message><id>notImplemented</id></response>';
  respondXML(request, response, 501, xml);
};

const notFound = (request, response) => {
  const xml = '<response><message>404 Not Found.</message><id>notFound</id></response>';
  respondXML(request, response, 404, xml);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
