import React from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Card } from "antd";
import Tree from "./tree/tree.component";
import EditNode from "./editBar/edit.component";

function Formula() {
  const [formulaTree, setFormulaTree] = React.useState({
    customId: 1,
    name: "Formula 1",
    type: "calculation",
    root: true,
  });
  const [selectedNode, setSelectedNode] = React.useState({});
  const [isTreeUpdate, setIsTreeUpdate] = React.useState(false);

  const handleUpdateTree = () => {
    setIsTreeUpdate(true);
    setTimeout(() => setIsTreeUpdate(false), 100);
  };

  // TODO: Add a function to update the tree node

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
      }
      const children = at.children || [];
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
    setFormulaTree(parent);
    handleUpdateTree();
    console.log("updating: ", isTreeUpdate);
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function will create new child and sent it to the add handler
   * @param {event} e
   * @param {string} type type of node (one of [constant, variable, calculation])
   */
  const onAddElement = (e, type) => {
    console.log("addingElement: ", type);
    e.preventDefault();
    const newChild = {
      customId: Date.now() * Math.floor(Math.random() * 10000),
      name: "",
      type,
      formula: "",
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
      setFormulaTree(tree);
      handleUpdateTree();
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

  return (
    <>
      <BreadcrumbBar name="Demolition and Prep" breaclass="mb-4" />
      <Card className="r-height">
        <Tree
          formula={formulaTree}
          addNewChildren={onAddElement}
          handleTitleChange={handleTitleChange}
          // handleDefineNewFormula={this.handleDefineNewFormula}
          handleSelectNode={handleSelectNode}
        />
        {selectedNode.customId && (
          <EditNode handleClose={handleDeselectNode} node={selectedNode} />
        )}
      </Card>
    </>
  );
}

export default Formula;
