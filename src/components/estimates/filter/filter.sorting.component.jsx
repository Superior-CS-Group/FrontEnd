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
      leadSelected:[],
      saveFilterLoad:false,
      curentTabDat:{},
      dateFilter:'7',
      leadSource:[],
      sortDropdown:'-1'
    };
  }
componentDidMount=async()=>{
  const statusLis = await getData(`status/list`);
  // this.props.ApplyFilter()
 this.setState({leadList:statusLis.data.Data,curentTabDat:this.props.currentTabData,
  
})
}

componentDidUpdate = async () => {
  if(this.state.curentTabDat!==this.props.currentTabData){
  this.setState({curentTabDat:this.props.currentTabData,leadSelected:[],
    // dateFilter:this.props.currentTabData.filterObject.dateFilter,
    // sortDropdown:this.props.currentTabData.filterObject.sortDropdown,
    // leadSource:this.props.currentTabData.filterObject.leadSource
  })
  }
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
  handleSave=async()=>{
    console.log('budd',this.props);
    this.setState({saveFilterLoad:true})
   let {curentTabDat,leadSelected} =this.state;
   if(curentTabDat.filterObject)
   curentTabDat.filterObject.estimaitonStatus.map(r=>{
    leadSelected.push(r)
   })
   await this.props.saveFilterss({
     estimaitonStatus:leadSelected,
     dateFilter:this.state.dateFilter,
     leadSource:this.state.leadSource,
     sortDropdown:this.state.sortDropdown
    });
    this.setState({saveFilterLoad:false})
  }
  onChangeLeadSource=(e)=>{
    console.log(e);
    if(this.state.leadSource.indexOf(e) === -1)
    this.setState({leadSource:this.state.leadSource.concat(e)});
    else{
      let rm=this.state.leadSource;
      let i= rm.indexOf(e);
      rm.splice(i,1);
      this.setState({leadSource:rm});
    }
  }
  onChange=(e)=> {
    console.log(`checked =`,e);
    // let final=this.state.leadSelected;
    // final.push(e.name)
    // /this.setState({curentTabDat:this.state.curentTabDat.filterObject.estimaitonStatus.concat(e)});
   
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
     this.props.handleOk(this.state);
  }
  onRadioChange=e=>{
    console.log(e.target.value)
    this.setState({dateFilter:e.target.value})
  }
   handleChange=(value)=> {
    console.log(`selected ${value}`);
    this.setState({sortDropdown:value})
  }
  render() {
    console.log('leadout==', this.state,this.props)
   
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    let currentTab={ dateFilter:'7',
       sortDropdown:'-1',
       leadSource:[]}
    if(this.props.currentTabData)
    currentTab=this.props.currentTabData.filterObject;
    
let leadCheckbox;
    if(this.state.leadList){
   leadCheckbox=   this.state.leadList.map((r)=>{
     let currentTabDa=this.state.curentTabDat;
     let boo=false;
     if(currentTabDa){
       if(currentTabDa.filterObject){
         if(currentTabDa.filterObject.estimaitonStatus)
        currentTabDa.filterObject.estimaitonStatus.map(c=>{
          if(c=== r.name)
          boo=true
        })
       }
     }
      // /  console.log(r)
        return(<Col md={8}>
          <Checkbox
           checked={boo}
            onChange={(e)=>this.onChange(r.name)}>{r.name}</Checkbox>{" "}
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
                    {/* <Col md={12}>
                      <Form.Item name="Column" label="Column">
                        <Select defaultValue="lucy" onChange={handleChange}>
                          <Option value="jack">Column 1</Option>
                          <Option value="lucy">Column 2</Option>

                          <Option value="Yiminghe">Column 3</Option>
                        </Select>
                      </Form.Item>
                    </Col> */}
                    <Col md={12}>
                      <Form.Item name="Column" label="According to">
                        <Select defaultValue={currentTab?currentTab.sortDropdown:'-1'}  onChange={this.handleChange}>
                          <Option value="-1">Newest</Option>
                          <Option value="1">Oldest</Option>
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
                      <b>Lead Status</b>
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
                      <Radio.Group options={ [
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 28 days', value: '28' },
  { label: 'Last 90 days', value: '90' },
    ]} 
onChange={this.onRadioChange} value={currentTab?currentTab.dateFilter:'7'} />
                        {/* <Col md={8}>
                          <Radio onChange={this.onChange}>Last 7 days</Radio>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={this.onChanges}>Last 28 days</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={this.onChange}>Last 90 days</Checkbox>{" "}
                        </Col> */}
                        {/* <Col md={24} className="mt-4 text-right">
                          {" "}
                          <Space direction="vertical" size={12}>
                            <RangePicker />
                          </Space>
                        </Col> */}
                      </Row>
                    </Col>
                    <Divider />
                    <Col md={6}>
                      <b>Lead Source</b>
                    </Col>
                    <Col md={18}>
                      <Row>
                        <Col md={8}>
                          <Checkbox onChange={()=>this.onChangeLeadSource('Facebook')}>Facebook</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={()=>this.onChangeLeadSource('Website')}>Web</Checkbox>{" "}
                        </Col>
                        <Col md={8}>
                          <Checkbox onChange={()=>this.onChangeLeadSource('Referral')}>Referral</Checkbox>{" "}
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
                   
                    Clean Filters
                  </span>
                  <div className="ms-auto col-lg-4">
                    <Button
                      ghost
                      type="primary"
                      shape="round"
                      icon={<SaveOutlined />}
                      size="large"
                      loading={this.state.saveFilterLoad}
                      onClick={this.handleSave}
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
