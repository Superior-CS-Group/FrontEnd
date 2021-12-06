import React, { Component } from "react";
import {
  Button,
  Card,
  Select,
  Input,
  Modal,
  message,
  Radio,
  Row,
  Col,
  Form,
  Divider,
  Checkbox,
  DatePicker,
  Space,
} from "antd";
import fillter from "../../../images/fillter.png";

// import FilterSorting from "./filter/filter.sorting.component";
import {
  PlusCircleOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getData } from "../../../utils/fetchApi";

export default class FilterSorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisible: false,
      leadList:[],
      leadSelected:[]
    };
  }
componentDidMount=async()=>{
  const statusLis = await getData(`status/list`);
  // this.props.ApplyFilter()
 this.setState({leadList:statusLis.data.Data})
}

  //   showModal = () => {
  //     this.setState({ ModalVisible: true });
  //   };

  //   handleOk = () => {
  //     this.setState({ ModalVisible: false });
  //   };

  //   handleCancel = () => {
  //     this.setState({ ModalVisible: false });
  //   };
  onChange=(e)=> {
    console.log(`checked =`,e);
    // let final=this.state.leadSelected;
    // final.push(e.name)
    if(this.state.leadSelected.indexOf(e) === -1)
    this.setState({leadSelected:this.state.leadSelected.concat(e)});
    else{
      let rm=this.state.leadSelected;
      let i= rm.indexOf(e);
      rm.splice(i,1);
      this.setState({leadSelected:rm});
    }
  }
  filterPass=()=>{
     console.log("hey man" ,this.props);
     this.props.handleOk(this.state.leadSelected);
  }
  render() {
    console.log('leadout==', this.state,this.props)
   
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    
let leadCheckbox;
    if(this.state.leadList){
   leadCheckbox=   this.state.leadList.map((r)=>{
      // /  console.log(r)
        return(<Col md={8}>
          <Checkbox
          //  checked={false}
            onChange={()=>this.onChange(r.name)}>{r.name}</Checkbox>{" "}
        </Col>)
      })
    }
    return (
      <>
        <Modal
          style={{ top: 15 }}
          // width={1000}
          className="modal-filter modal-radius"
          visible={this.props.ModalVisible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={null}
        >
          <div className="filter-section-modal-div">
            <div className="head-div-filter d-lg-flex align-items-center">
              <h3 className="inline-block me-4 mb-4 " onClick={this.showModal}>
                <img src={fillter} className="me-3" alt="" /> Filter and Sort
              </h3>
            </div>

            <Row gutter={[24, 0]}>
              <h5>Sort By</h5>
              <Col md={24}>
                <Form layout="vertical" autoComplete="off">
                  <Row gutter={[24, 0]}>
                    <Col md={12}>
                      <Form.Item name="Column" label="Column">
                        <Select defaultValue="lucy" onChange={handleChange}>
                          <Option value="jack">Column 1</Option>
                          <Option value="lucy">Column 2</Option>

                          <Option value="Yiminghe">Column 3</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item name="Column" label="According to">
                        <Select defaultValue="Newest" onChange={handleChange}>
                          <Option value="jack">Newest</Option>
                          <Option value="lucy">Oldest</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                 
                  </Row>
                </Form>
              </Col>
            </Row>
            <Divider />

            <Row>
              {" "}
              <h5>Filter</h5>
              <Col md={24}>
                <Form layout="vertical" autoComplete="off">
                  <Row>
                
                    <Col md={6}>
                      <b>Lead Estatus</b>
                    </Col>
                    <Col md={18}>
                      <Row>
                      {leadCheckbox}
                      </Row>
                    </Col>
                    <Divider />
                    <Col md={6}>
                      <b>Dates</b>
                    </Col>
                    <Col md={18}>
                      <Row>
                        <Col md={8}>
                          <Checkbox onChange={this.onChange}>Last 7 days</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={this.onChanges}>Last 28 days</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={this.onChange}>Last 90 days</Checkbox>{" "}
                        </Col>
                        <Col md={24} className="mt-4 text-right">
                          {" "}
                          <Space direction="vertical" size={12}>
                            <RangePicker />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Divider />
                    <Col md={6}>
                      <b>Lead Source</b>
                    </Col>
                    <Col md={18}>
                      <Row>
                        <Col md={8}>
                          <Checkbox onChange={this.onChange}>Facebook</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={this.onChange}>Web</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={this.onChange}>Referral</Checkbox>{" "}
                        </Col>
                      </Row>
                    </Col>
                  
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <div className="fillter d-lg-flex align-items-center mt-4">
                  <span
                    className="inline-block me-5 fillter-btn"
                    onClick={this.showModal}
                  >
                    <Button type="primary" shape="round" size="large" onClick={this.filterPass}>
                      Apply
                    </Button>
                  </span>

                  <span className="ant-blue-plus">
                    <PlusCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Clean Filters
                  </span>
                  <div className="ms-auto col-lg-4">
                    <Button
                      ghost
                      type="primary"
                      shape="round"
                      icon={<SaveOutlined />}
                      size="large"
                    >
                      Save Filter
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </>
    );
  }
}
