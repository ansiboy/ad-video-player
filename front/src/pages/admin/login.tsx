import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import "antd/dist/antd.css";
import { paths } from "../../common";

export default function LoginPage() {
    let navigate = useNavigate();
    return <div>
        <Button type="primary" onClick={e => navigate(paths.admin.edit)} >登录</Button>
    </div>
}