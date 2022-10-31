import { Button, Checkbox, Form, Input, Row, Col, Switch } from 'antd';
import React from "react";

export default function RemotePage() {
    return <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ width: 600, marginLeft: 10, marginTop: 20 }}
    >
        <Form.Item label="运行远程登录" valuePropName="checked">
            <Switch checked={true} />
        </Form.Item>
        <Form.Item label="远程地址">
            http://47.243.143.36:42986
        </Form.Item>
    </Form>
}