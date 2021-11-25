import React from "react";
import { Row, Col, Card, Collapse, Input, Table } from "antd";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditOutlined, CloseCircleFilled } from "@ant-design/icons";
import { arrowdown, arrowup, drag, ellps, eye } from "../../../utils/svg.file";

const { Panel } = Collapse;

function Estimation({ formula, handleEditField, index, columns }) {
  return (
    <Panel
      header={formula.title}
      extra={[
        <>
          $4,785.00{" "}
          <span className="closeicon-panel">
            <CloseCircleFilled />
          </span>
        </>,
      ]}
      key={index}
    >
      <Row gutter={[24, 0]}>
        {formula.elements.map((element, idx) => {
          return (
            <Col lg={6} span={24} key={idx}>
              <Card
                bordered={false}
                className={`radius-12 mb-3  count-card`}
                bodyStyle={{ padding: "16px" }}
              >
                <div className="text-end drgicon">
                  <span className="me-1">{drag}</span> <span>{ellps}</span>
                </div>
                <span>{element.name}</span>

                <div className="d-flex align-items-center justify-content-between">
                  {element.type === "manual" || element.type === "prefilled" ? (
                    <Input
                      onChange={(e) => {
                        handleEditField(e, index, "elements", idx);
                      }}
                      name="value"
                      value={element.value}
                    />
                  ) : (
                    <h4>{element.value}</h4>
                  )}
                  <EditOutlined />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Card className="radius-12 ant-estimate-table-card">
        <Table
          className="ant-table-estmating add-estimates-table"
          columns={columns}
          dataSource={formula.materials}
          size="middle"
          pagination={false}
        />
      </Card>
    </Panel>
  );
}

export default Estimation;


/**
 * <Estimation
                      formula={formula}
                      index={index}
                      handleEditField={handleEditField}
                      columns={columns}
                      key={index}
                    />
 */