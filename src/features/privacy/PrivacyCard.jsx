import React from "react";
import { Card, Row, Col, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const PrivacyCard = () => (
  <Card className="maincardDiv">
    <Row style={{ marginRight: "10px", marginTop: "10px" }} align="middle">
      <Col span={4} style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title="Privacy">
          <Button shape="circle" icon={<EyeOutlined />} size="large" />
        </Tooltip>
      </Col>
      <Col span={20}>
        <b style={{ display: "block", marginBottom: 4 }}>Privacy</b>
        <p style={{ textAlign: "start", marginBottom: 0 }}>
          All your personal data and training information will never be shared
          with any 3rd parties and will never be used for marketing without
          your consent.
        </p>
      </Col>
    </Row>
  </Card>
);

export default PrivacyCard;
