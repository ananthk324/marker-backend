const respond = (res, code, message) => res.status(code).json(message);

const dataTemplate = (res, data, metadata = {}) =>
  respond(res, 200, { data, ...metadata, success: true });

const errorTemplate = (res, errorCode, message, metadata = {}) =>
  respond(res, errorCode, { message, ...metadata, success: false });

const notFoundTemplate = (res, message, metadata = {}) =>
  respond(res, 404, { message, ...metadata, success: false });

const badRequestTemplate = (res, message, metadata = {}) =>
  respond(res, 400, { message, ...metadata, success: false });

const serverErrorTemplate = (res, message, metadata = {}) =>
  respond(res, 500, { message, ...metadata, success: false });

const unAuthorizedTemplate = (res, message, metadata = {}) =>
  respond(res, 401, { message, ...metadata, success: false });

module.exports = {
  errorTemplate,
  dataTemplate,
  notFoundTemplate,
  badRequestTemplate,
  serverErrorTemplate,
  unAuthorizedTemplate,
};
