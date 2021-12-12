/* eslint-disable no-useless-escape */
const regex = {
  customInput: /![a-zA-Z]+/g,
  materialInput: /@\{\{[^\}]+\}\}/gi,
  escapeRegex: /[.*+\-?^${}()|[\]\\]/g,
};
export default regex;
