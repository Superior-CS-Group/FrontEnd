/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { treeIcon } from "../../../utils/svg.file";
import "./tree.css";

function Tree(props) {
  return (
    <div className="tree mb-5">
      <ul className="d-flex">
        <li className="mx-auto">
          <a className="ant-cover-b ant-cover-primary">{props.formula.name}</a>
          <div className="d-flex align-items-center justify-content-center">
            <span
              className="ant-cricle-add"
              onClick={(e) => props.addNewChildren(e, "calculation")}
            >
              {treeIcon}
            </span>
          </div>
          {props.formula.children ? (
            <ul>
              {props.formula.children.map((formula) => {
                return (
                  <li
                  // onClick={() => this.props.handleDefineNewFormula(formula)}
                  >
                    {formula.children ? (
                      <Tree formula={formula} {...props} />
                    ) : (
                      <a className="ant-cover-b ant-cover-primary">
                        <Input
                          value={formula.name}
                          onChange={(e) =>
                            props.handleTitleChange(e, formula.customId)
                          }
                          id="title-input"
                          placeholder="Enter Title"
                          size="small"
                        />
                        <EditOutlined
                          className="ms-3"
                          onClick={() => props.handleSelectNode(formula)}
                        />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

export default Tree;
