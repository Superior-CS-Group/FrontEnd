import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import ImageGallery from "react-image-gallery";

export default class View extends Component {
  render() {
    const images = [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
      },
    ];
    return (
      <>
        <Card>
          <Row gutter={[24, 0]}>
            <Col lg={12}>
              <ImageGallery items={images} />
            </Col>
            <Col lg={10} offset={1}>
              <h3 className="text-primary">1 ton boulder</h3>
              <h4>
                {" "}
                Cost: <b className="text-success">$175</b>
              </h4>

              <h4>Quantity: 1</h4>
              <div className="description">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}
