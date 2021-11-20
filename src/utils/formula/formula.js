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
    // let isValid = validateArthmaticString(tempFormula);
    // if (e && isValid.validate) {
    //   const newService = { ...this.state.newService };
    //   newService.id = randomId();
    //   newService.value = formula;
    //   newService.formula = tempFormula;
    //   newService.dependsOn = dependsOn;
    //   console.log({ newService });
    //   this.setState({
    //     services: [...this.state.services, newService],
    //     newService: {
    //       id: null,
    //       name: "",
    //       value: "",
    //       formula: "",
    //       dependsOn: [],
    //     },
    //     serviceTempArray: [],
    //     serviceValue: [],
    //     tempServiceToShow: "",
    //   });
    // }
    // if (!isValid.validate) {
    //   this.setState({ error: true });
    // } else {
    //   this.setState({ error: false });
    // }
    console.log("formula: ", { formula, formulaToShow });
    console.table({ formula, formulaToShow });
    return { formula, formulaToShow };
  }
  return "";
};
