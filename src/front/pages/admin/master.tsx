import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { LockOutlined, WindowsOutlined, ApiOutlined } from "@ant-design/icons";
import "./master.scss";
import { paths } from "../../common";
import "antd/dist/antd.css";

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
                    { key: paths.admin.edit, icon: <WindowsOutlined />, label: "屏幕设计" },
                    { key: paths.admin.password, icon: <LockOutlined />, label: "修改密码" },
                    { key: paths.admin.remote, icon: <ApiOutlined />, label: "远程控制" }
                ]}>
            </Menu>
            <Footer style={{ paddingLeft: 0, paddingRight: 0, textAlign: "center", background: "white" }}>
                <Button type="primary">退出</Button>
            </Footer>
        </Sider>
        <Layout>
            <Content style={{ backgroundColor: "white" }}>
                <Outlet />
            </Content>
        </Layout>
    </Layout>
}