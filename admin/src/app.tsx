import React from 'react';
import { Routes, Route } from "react-router-dom";
import MasterPage from "./pages/master"
import EditPage from './pages/edit';
import PasswordPage from './pages/password';
import RemotePage from './pages/remote';
import { paths } from './common';


function App() {
  return <Routes>
    <Route element={<MasterPage />} >
      <Route path={paths.edit} element={<EditPage />} />
      <Route path={paths.password} element={<PasswordPage />} />
      <Route path={paths.remote} element={<RemotePage />} />
    </Route>
  </Routes>
}

export default App;

// import { Breadcrumb, Layout, Menu } from 'antd';
// import React from 'react';

// const { Header, Content, Footer } = Layout;

// const App: React.FC = () => (
//   <Layout className="layout">
//     <Header>
//       <div className="logo" />
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         defaultSelectedKeys={['2']}
//         items={new Array(15).fill(null).map((_, index) => {
//           const key = index + 1;
//           return {
//             key,
//             label: `nav ${key}`,
//           };
//         })}
//       />
//     </Header>
//     <Content style={{ padding: '0 50px' }}>
//       <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>List</Breadcrumb.Item>
//         <Breadcrumb.Item>App</Breadcrumb.Item>
//       </Breadcrumb>
//       <div className="site-layout-content">Content</div>
//     </Content>
//     <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//   </Layout>
// );

// export default App;