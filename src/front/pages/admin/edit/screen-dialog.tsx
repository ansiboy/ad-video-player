import { Modal, Typography } from "antd";
import React from "react";
import { Radio, Space } from 'antd';
import { ComponentTypeName, typeNames } from "../../../type-names";
import { strings } from "../../../common";

interface Props {
    onSelecte: (screenType: ComponentTypeName) => void
}

interface State {
    visibled?: boolean,
    screenType: ComponentTypeName,
}

export default class ScreenDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { visibled: false, screenType: typeNames.OneSplitView };
    }

    show() {
        this.setState({ visibled: true });
    }

    render(): React.ReactNode {
        let { visibled, screenType } = this.state;

        return <>
            <Modal title="添加屏幕" open={visibled} okText={strings.okText} cancelText={strings.cancelText}
                onCancel={() => {
                    this.setState({ visibled: false })
                }}
                onOk={() => {
                    this.props.onSelecte(screenType);
                    this.setState({ visibled: false })
                }}>
                <Typography.Text style={{ display: "block", marginBottom: 10 }}>请选择屏幕类型：</Typography.Text>
                <Radio.Group value={screenType}
                    onChange={e => {
                        screenType = e.target.value;
                        this.setState({ screenType });
                    }}>
                    <Space direction="vertical">
                        <Radio value={typeNames.OneSplitView}>单屏</Radio>
                        <Radio value={typeNames.ThreeSplitView}>三分屏</Radio>
                        <Radio value={typeNames.FourSplitView}>四分屏</Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        </>
    }

}