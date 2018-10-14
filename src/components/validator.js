import validatejs from 'validate.js';

export function validate(values, constraints) {
  const result = validatejs(values, constraints);
  let newResult = {};

  if (result) {
    for (let key in result) {
      newResult[key] = result[key] && result[key][0];
    }

    return newResult;
  }

  return null;
}
