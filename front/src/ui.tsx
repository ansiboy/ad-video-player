import { message } from "antd";

export function showError(error: Error) {
    message.error(error.message);
}