// Strips keys that could be used for NoSQL injection (anything starting with
// "$" or containing ".") from req.body, req.params, and req.query.
//
// NOTE: we deliberately don't use the popular `express-mongo-sanitize`
// package here — as of Express 5, req.query is a getter-only property, and
// that package tries to reassign it wholesale, which throws at request time.
// This middleware mutates objects in place (deleting/renaming keys on the
// existing object) instead of replacing them, so it works fine under
// Express 5.

const isPlainObject = (value) =>
  Object.prototype.toString.call(value) === "[object Object]";

const sanitizeValue = (value) => {
  if (Array.isArray(value)) {
    value.forEach(sanitizeValue);
    return value;
  }

  if (isPlainObject(value)) {
    for (const key of Object.keys(value)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
        continue;
      }
      sanitizeValue(value[key]);
    }
  }

  return value;
};

export const sanitizeInput = (req, res, next) => {
  if (req.body) sanitizeValue(req.body);
  if (req.params) sanitizeValue(req.params);
  // req.query is read-only as a whole object in Express 5, but its
  // properties can still be mutated/deleted individually.
  if (req.query) sanitizeValue(req.query);

  next();
};