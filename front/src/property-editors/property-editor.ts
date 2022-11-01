import React from "react";

export interface EditorProps<T> {
    value: T,
    changed: (value: T) => void,
    ref: (component: React.Component<EditorProps<any>, EditorState<any>>) => void,
}

export interface EditorState<T> {
    value: T
}

