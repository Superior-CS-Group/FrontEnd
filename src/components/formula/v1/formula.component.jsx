import React from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card } from "antd";
import Tree from "./tree/tree.component";
import EditNode from "./editBar/edit.component";

function Formula() {
  const [formulaTree, setFormulaTree] = React.useState({
    customId: 1,
    name: "Grading",
    type: "preBuiltService",
    root: true,
    children: [],
  });
  const [selectedNode, setSelectedNode] = React.useState({});
  const [isTreeUpdate, setIsTreeUpdate] = React.useState(false);

  const handleUpdateTree = (parent) => {
    setIsTreeUpdate(true);
    setFormulaTree(parent);

    setTimeout(() => setIsTreeUpdate(false), 100);
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function will add new element to the tree
   * @param {object} newChild the object we want to add to the tree
   * @param {object} tree the original formula tree
   * @param {object} parent the parent node of the tree
   * @param {string} arrival the arrival node of the tree to stop the ininity recursion loop
   * @param {string} lookup the lookup node of the tree to stop the ininity recursion loop
   */
  const handleAddNewChild = (
    newChild,
    parent = formulaTree,
    lookup = formulaTree.customId
  ) => {
    if (!parent) {
      return;
    }
    const queue = [];
    queue.push(parent);
    while (queue.length > 0) {
      const at = queue.shift();
      if (at.customId === lookup) {
        if (at.children) {
          at.children.push(newChild);
        } else {
          const newChildren = [newChild];
          at.children = newChildren;
        }
        break;
      }
      const children = at.children || [];
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
    handleUpdateTree(parent);
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function will create new child and sent it to the add handler
   * @param {event} e
   * @param {string} type type of node (one of [constant, variable, calculation])
   */
  const onAddElement = (e) => {
    e.preventDefault();
    const newChild = {
      customId: Date.now() * Math.floor(Math.random() * 10000),
      name: "",
      type: "preBuiltService",
      formula: "",
      formulaToShow: "",
    };
    handleAddNewChild(newChild);
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function will add new element to the tree
   * @param {event} e
   * @param {number} id id of the node which we want to edit title
   * @param {object} parent  parent of the node which we want to edit title
   * @param {number} arrival the node which we want to edit
   * @param {object} tree the whole formula tree
   */
  const handleTitleChange = (
    e,
    id,
    parent = formulaTree,
    arrival = formulaTree.customId,
    tree = formulaTree
  ) => {
    if (parent.customId === id) {
      parent.name = e.target.value;
      handleUpdateTree(tree);
      return;
    }
    const children = parent.children || [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].id !== arrival) {
        handleTitleChange(e, id, children[i], parent, tree);
      }
    }
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function will select element from the tree and store it in the state
   * @param {object} node node which we want to edit formula
   */
  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };
  const handleDeselectNode = () => {
    setSelectedNode({});
  };

  /**
   * @author digimonk Technologies
   * @develover Saral Shrivastava
   * @description This function is used to update the selected node
   * @param {object} node - updated selected node
   * @param {object} parent - tree
   * @returns
   */
  const handleUpdateNode = (node, parent = formulaTree) => {
    console.log("node: ", node);
    if (!parent) {
      return;
    }
    const queue = [];
    queue.push(parent);
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode.customId === node.customId) {
        currentNode.formula = node.formula;
        currentNode.formulaToShow = node.formulaToShow;
        if (node.children?.length) {
          currentNode.children = node.children;
        } else {
          currentNode.children = null;
        }
        currentNode.formulaArray = node.formulaArray;
        console.log("currentNode: ", node, currentNode);
        break;
      }
      const children = currentNode.children || [];
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
    handleUpdateTree(parent);
    handleDeselectNode();
  };

  const saveToDB = (e, parent) => {
    e.preventDefault();
    if (!parent) {
      return;
    }
    const stack = [];
    stack.push(parent);
    while (stack.length > 0) {
      const currentNode = stack.pop();
      console.log("currentNode: ", currentNode);
      const children = currentNode.children || [];
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  };
  return (
    <>
      <BreadcrumbBar name="Demolition and Prep" breaclass="mb-4" />
      <Card className="r-height">
        <Tree
          formula={formulaTree}
          addNewChildren={onAddElement}
          handleTitleChange={handleTitleChange}
          handleSelectNode={handleSelectNode}
        />
        {selectedNode.customId && (
          <EditNode
            handleClose={handleDeselectNode}
            node={selectedNode}
            handleUpdateNode={handleUpdateNode}
          />
        )}
      </Card>
      <button onClick={(e) => saveToDB(e, formulaTree)}>Save TO DB</button>
    </>
  );
}

export default Formula;
