/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { treeIcon } from "../../../utils/svg.file";
// import "./tree.css";

function Tree(props) {
  return (
    <div className="tree mb-5">
      <ul className="d-flex">
        <li className="mx-auto">
          <a className="ant-cover-b ant-cover-primary">{props.formula.name}</a>
          {!props.formula.root && (
            <EditOutlined
              className="ms-3"
              onClick={() => props.handleSelectNode(props.formula)}
            />
          )}
          <div className="d-flex align-items-center justify-content-center">
            {props.formula.formulaToShow}
          </div>
          {props.formula.root && (
            <div className="d-flex align-items-center justify-content-center">
              <span className="ant-cricle-add" onClick={props.addNewChildren}>
                {treeIcon}
              </span>
            </div>
          )}
          {props.formula.children && props.formula.children.length ? (
            <ul>
              {props.formula.children.map((formula) => {
                return (
                  <li>
                    {formula.children ? (
                      <Tree {...props} formula={formula} />
                    ) : (
                      <>
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
                        <span>{formula.formulaToShow}</span>
                      </>
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
