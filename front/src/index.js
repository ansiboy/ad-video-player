"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const component_parse_1 = require("./component-parse");
// import reportWebVitals from './reportWebVitals';
const app_1 = __importDefault(require("./app"));
const react_router_dom_1 = require("react-router-dom");
(0, component_parse_1.loadComponentData)().then(data => {
    let rootElement = document.getElementById('root');
    if (!rootElement)
        throw new Error(`Element 'root' is not exists.`);
    const root = client_1.default.createRoot(rootElement);
    root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(app_1.default, { componentData: data })));
});
