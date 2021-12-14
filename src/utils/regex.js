/* eslint-disable no-useless-escape */
const regex = {
  customInput: /![a-zA-Z]+/g,
  materialInput: /@\{\{[^\}]+\}\}/gi,
  escapeRegex: /[.*+\-?^${}()|[\]\\]/g,
  conditionalExpression: /[0-9]+\s?[<>=]{1,2}\s?[0-9]+/g,
  operationRegex: /[<>=]{1,2}/g,
};
export default regex;
