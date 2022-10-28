import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, PageHeader } from "antd";
import { LockOutlined, WindowsOutlined, ApiOutlined } from "@ant-design/icons";
import "./master.scss";
import { paths } from "../common";

const { Sider, Content, Footer, Header } = Layout;

export default function MasterPage() {
    let navigate = useNavigate();
    return <Layout style={{ width: "100%", height: "100%", position: "absolute" }}>
        <Sider width={140}>
            <Menu style={{ height: "calc(100% - 80px)" }}
                onClick={e => {
                    navigate(e.key)
                }}
                items={[
                    { key: "/", icon: <WindowsOutlined />, label: "屏幕设计" },
                    { key: paths.password, icon: <LockOutlined />, label: "修改密码" },
                    { key: paths.remote, icon: <ApiOutlined />, label: "远程控制" }
                ]}>
            </Menu>
            <Footer style={{ paddingLeft: 0, paddingRight: 0, textAlign: "center", background: "white" }}>
                <Button type="primary">退出</Button>
            </Footer>
        </Sider>
        <Layout>
            {/* <Header style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "white" }}>退出</Button>
            </Header> */}
            <Content style={{ backgroundColor: "white" }}>
                <Outlet />
            </Content>
        </Layout>
    </Layout>
}