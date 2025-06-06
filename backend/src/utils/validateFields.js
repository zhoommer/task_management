
function validateFields(body, requiredFields) {
  for (let field of requiredFields) {
    if (
      !body.hasOwnProperty(field) ||
      body[field] == null ||
      (typeof body[field] === 'string' && body[field].trim() === '')
    ) {
      return { valid: false, missingField: field };
    }
  }
  return { valid: true };
}

module.exports = validateFields;
