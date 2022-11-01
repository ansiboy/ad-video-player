import React from "react";

export interface EditorProps<T> {
    propertyValue?: T,
    propertyName: string,
    changed: (value: T) => void,
    ref?: (e: React.Component<EditorProps<any>, EditorState<any>>) => void,
}

export interface EditorState<T> {
    propertyValue?: T
}

