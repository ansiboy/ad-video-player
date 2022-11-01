import React from "react";

export interface EditorProps<T> {
    propertyValue: T,
    propertyName: string,
    changed: (value: T) => void,
}

export interface EditorState<T> {
    value: T
}

