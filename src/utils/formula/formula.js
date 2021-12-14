/* eslint-disable no-eval */
import regex from "../regex";

function escapeRegExp(string) {
  return string.replace(regex.escapeRegex, "\\$&"); // $& means the whole matched string
}

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

/**
 * @description this function will evaluate the hidden values of the formula
 * @param {object} expression - the expression object = {
 *          name: string,
 *          value: string?,
 *          isConditional: boolean,
 *          expression: {
 *            condition: string,
 *            fullfill: string,
 *            fail: string
 *         }
 *       }
 */
export const processConditionalExpression = (expression) => {
  const newExpression = { ...(expression || {}) };
  console.log("processing: ", expression.expression.tempValue);
  if (
    expression.isConditional &&
    regex.conditionalExpression.test(expression.expression.tempValue)
  ) {
    const condition = expression.expression.tempValue;
    const splited = condition.split(regex.operationRegex);
    let operation = condition.match(regex.operationRegex);
    operation = operation ? operation[0].trim() : null;
    const num1 = Number(eval(splited[0]));
    const num2 = Number(eval(splited[1]));
    const result = evaluateCondition(num1, num2, operation);
    if (result) {
      newExpression.value = expression.expression.fullfill;
    } else {
      newExpression.value = expression.expression.fail;
    }
  }
  return newExpression;
};
export const processNonConditionalHiddenValues = (
  hiddenValue,
  hiddenValueList
) => {
  const usedHiddenValueList = hiddenValueList.map((item) => {
    console.log("hiddenValue: ", hiddenValue);
    return {
      title: `@{{hidden||${item._id}||${item.name}}}`,
      value: item.value,
    };
  });
  console.log("usedHiddenValueList", usedHiddenValueList, hiddenValue);
  usedHiddenValueList.forEach((item) => {
    const newReg = new RegExp(escapeRegExp(item.title), "g");
    hiddenValue.value = hiddenValue.value.replace(newReg, item.value);
  });
  return hiddenValue;
};
/**
 *  @description this function will evaluate the expression
 * @param {number} num1
 * @param {number} num2
 * @param {string} operation
 * @returns boolean
 */
function evaluateCondition(num1, num2, operation) {
  let res = false;
  switch (operation) {
    case "<":
      res = num1 < num2;
      break;
    case ">":
      res = num1 > num2;
      break;
    case ">=":
      res = num1 >= num2;
      break;
    case "<=":
      res = num1 <= num2;
      break;
    case "=":
      res = num1 === num2;
      break;
    default:
      res = false;
      break;
  }
  return res;
}
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

export const processElements = (formula, elements) => {
  const usedElements = elements.map((element) => {
    return {
      title: `@{{element||${element._id}||${element.name}}}`,
      price:
        element.finalCalculatedValue !== undefined
          ? (
              element.finalCalculatedValue *
              (element.multiplicationFactor === undefined ||
              element.multiplicationFactor === null
                ? 1
                : Number(element.multiplicationFactor))
            ).toString()
          : `${element.value} * ${
              element.multiplicationFactor === undefined ||
              element.multiplicationFactor === null
                ? 1
                : element.multiplicationFactor
            }`,
      usedMaterials: element.formula,
      customInput:
        element.customInput?.map((customInput) => {
          return {
            title: `@{{custom||${customInput._id}||${customInput.name}}}`,
            value: customInput.value,
          };
        }) || [],
    };
  });

  usedElements.forEach((element) => {
    const regex = new RegExp(escapeRegExp(element.title), "g");
    try {
      formula = formula.replace(regex, element.price);
      if (element.customInput) {
        element.customInput.forEach((customInput) => {
          const regex = new RegExp(escapeRegExp(customInput.title), "g");
          formula = formula.replace(regex, `(${customInput.value})`);
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  });
  // console.log("element: ", formula);
  return formula;
};

/**
 * User Elements:
 *  const usedElements = elements.map((element) => {
        return {
          title: `@{{element||${element._id}||${element.name}}}`,
          price:
            element.finalCalculatedValue !== undefined
              ? (
                  element.finalCalculatedValue *
                  (element.multiplicationFactor === undefined ||
                  element.multiplicationFactor === null
                    ? 1
                    : Number(element.multiplicationFactor))
                ).toString()
              : `${element.value} * ${
                  element.multiplicationFactor === undefined ||
                  element.multiplicationFactor === null
                    ? 1
                    : element.multiplicationFactor
                }`,
          usedMaterials: element.formula,
          customInput:
            element.customInput?.map((customInput) => {
              return {
                title: `@{{custom||${customInput._id}||${customInput.name}}}`,
                value: customInput.value,
              };
            }) || [],
        };
      });
      usedElements.forEach((element) => {
        const regex = new RegExp(escapeRegExp(element.title), "g");
        try {
          formula = formula.replace(regex, element.price);
          if (element.customInput) {
            element.customInput.forEach((customInput) => {
              const regex = new RegExp(escapeRegExp(customInput.title), "g");
              formula = formula.replace(regex, customInput.value);
            });
          }
          if (hiddenValues) {
            hiddenValues = hiddenValues.map((item) => {
              if (item.isConditional) {
                const matchRegex = item.expression.condition.match(regex);
                if (matchRegex) {
                  const tempValue = item.expression.condition.replace(
                    regex,
                    element.price
                  );
                  item.expression.tempValue = tempValue;
                }
              }
              return item;
            });
          }
        } catch (error) {
          console.log("error: ", error);
        }
      });
 */

export const processFormulaMaterials = (formula, materials) => {
  const usedMaterials = materials.map((item) => {
    return {
      title: `@{{catalog||${item._id}||${item.name}}}`,
      price: item.price,
    };
  });
  // console.log("usedMateriasl: ", formula);
  usedMaterials.forEach((material) => {
    const regex = new RegExp(escapeRegExp(material.title), "g");
    formula = formula.replace(regex, `(${material.price})`);
  });
  // console.log("material: ", formula);
  return formula;
};

export const processHiddenValuesWithMaterials = (formula, hiddenValues) => {
  const usedHiddenValues = hiddenValues.map((item) => {
    return {
      title: `@{{hidden||${item._id}||${item.name}}}`,
      price: item.value,
    };
  });
  console.log("usedHiddenValues: ", usedHiddenValues);
  usedHiddenValues.forEach((hiddenValue) => {
    const regex = new RegExp(escapeRegExp(hiddenValue.title), "g");
    formula = formula.replace(regex, `(${hiddenValue.price})`);
  });
  // console.log("usedHiddenValues: ", formula, usedHiddenValues);
  return formula;
};

/**
 * const usedMaterials = materials.map((item) => {
        return {
          title: `@{{catalog||${item._id}||${item.name}}}`,
          price: item.price,
        };
      });

      usedMaterials.forEach((material) => {
        const regex = new RegExp(escapeRegExp(material.title), "g");
        formula = formula.replace(regex, material.price);
        if (hiddenValues) {
          hiddenValues = hiddenValues.map((item) => {
            if (item.isConditional) {
              const matchRegex = item.expression.condition.match(regex);
              if (matchRegex) {
                const tempValue = item.expression.condition.replace(
                  regex,
                  material.price
                );
                item.expression.tempValue = tempValue;
              }
            }
            return item;
          });
        }
      });
 */
