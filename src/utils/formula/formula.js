export const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 100000);
};

/**
 *
 * @description this function will return the object contains the two stings 1. formula: used to calcuate expression 2. formulaToShow: used to show the expression in the UI
 * @param {object[]} formulaArray
 * @returns {object}
 */
export const handleGenerateFormula = (formulaArray) => {
  if (formulaArray.length) {
    let formula = "";
    let formulaToShow = "";
    const dependsOn = [];
    for (let i = 0; i < formulaArray.length; i++) {
      if (formulaArray[i].customId?.startsWith("@@@")) {
        formula += formulaArray[i].customId;
        formulaToShow += formulaArray[i].name;
        dependsOn.push({
          ...formulaArray[i],
        });
      } else if (formulaArray[i].customId?.startsWith("###")) {
        formula += formulaArray[i].customId;
        formulaToShow += formulaArray[i].name;
        dependsOn.push({
          ...formulaArray[i],
        });
      } else if (formulaArray[i].customId?.startsWith("***")) {
        formula += formulaArray[i].customId;
        formulaToShow += formulaArray[i].name;
        dependsOn.push({
          ...formulaArray[i],
        }); // contain depends on for futher formula
      } else if (formulaArray[i].type === "arthmatic") {
        formula += formulaArray[i].value;
        formulaToShow += formulaArray[i].value;
      } else {
        formula += formulaArray[i].customId;
        formulaToShow += formulaArray[i].name;
      }
    }
    return { formula, formulaToShow, dependsOn };
  }
  return "";
};

const sign = ["+", "-", "*", "/"];
export const validateArthmaticString = (str) => {
  if (!str) {
    return { isValid: false, idx: 0 };
  }
  const validBracket = validateBrackets(str);
  if (!validBracket.isValid) {
    return {
      isValid: false,
      message: "invalid breacket",
      idx: validBracket.idx,
    };
  }
  const isValid = validateSign(str);
  return isValid;
};

const validateBrackets = (str) => {
  const bracketStack = [];
  for (let i = 0; i < str.length; i++) {
    let val = str[i];
    if (val === "(") {
      bracketStack.push({ val, idx: i });
    } else if (val === ")") {
      if (bracketStack.length) {
        bracketStack.pop();
        continue;
      } else {
        return { isValid: false, idx: i };
      }
    }
  }
  if (bracketStack.length) {
    return { isValid: false, idx: bracketStack[bracketStack.length - 1].idx };
  } else {
    return { isValid: true };
  }
};

const validateSign = (str) => {
  if (sign.includes(str[0]) || sign.includes(str[str.length - 1])) {
    return { isValid: false };
  }
  let prev = "";
  for (let i = 0; i < str.length; i++) {
    if (sign.includes(prev) && sign.includes(str[i])) {
      return { isValid: false };
    }
    prev = str[i];
  }
  return { isValid: true };
};
