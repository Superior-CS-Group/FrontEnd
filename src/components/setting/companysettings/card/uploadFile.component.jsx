import { Upload, Card } from "antd";
import ImgCrop from "antd-img-crop";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { fileToBase64 } from "../../../../utils/fileBase64";

function UploadFile({ title, size, image, id, handleChange, handleRemove }) {
  const { Dragger } = Upload;

  const handleImageChange = async (image) => {
    const imageBase64 = await fileToBase64(image);
    handleChange(imageBase64, id);
  };

  const props = {
    name: "file",
    fileList: [],
    onChange(info) {
      handleImageChange(info.file.originFileObj);
    },
  };
  return (
    <Card
      bordered={false}
      className="upload-image-box radius-12 h-100"
      title={[<h5 className="mb-0">{title}</h5>]}
    >
      <ImgCrop>
        <Dragger
          {...props}
          listType="picture-card"
          className="mb-3"
          status="done"
          name={id}
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Size by: {size}</p>
        </Dragger>
      </ImgCrop>

      {image && (
        <div className="border image-width">
          <img src={image} alt="" height="104" width="104" />
          <span onClick={() => handleRemove("", id)} className="ant-close-btn">
            <DeleteOutlined />
          </span>
        </div>
      )}
    </Card>
  );
}

export default UploadFile;
