import React from 'react';
import { ComponentData, parseComponentData } from '../component-parse';

export interface Props {
    componentData: ComponentData,
    children?: React.ReactNode
}

export default function HomePage(props: Props) {
    if (!props.componentData ||
        (props.componentData.props.children || []).length == 0) {
        return <div className='text-center' style={{ padding: 100 }}>
            暂无播放
        </div>
    }

    let c = parseComponentData(props.componentData);
    return c;
}




