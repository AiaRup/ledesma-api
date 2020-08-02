/* eslint max-classes-per-file: ["error", 3] */

exports.EntityNotFoundError = class EntityNotFoundError extends Error {
  constructor(data) {
    super();
    this.name = 'EntityNotFoundError';
    this.message = `Entity ${JSON.stringify(data)} not found`;
    this.stack = data;
    this.statusCode = 404;
  }
};

exports.EntityExistsUnprocessableEntityError = class EntityExistsUnprocessableEntityError extends Error {
  constructor(data) {
    super();
    this.name = 'EntityExistsUnprocessableEntityError';
    this.message = `Entity ${JSON.stringify(data)} not found`;
    this.stack = data;
    this.statusCode = 422;
  }
};

exports.BadRequest = class BadRequest extends Error {
  constructor(data) {
    super();
    this.name = 'BadRequest';
    this.message = `BadRequest - ${JSON.stringify(data)}`;
    this.stack = data;
    this.statusCode = 400;
  }
};
