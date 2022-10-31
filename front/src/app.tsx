import './app.scss';
import React from 'react';
import { ComponentData } from './component-parse';
import { Route, Routes } from 'react-router-dom';
import { paths } from './common';
import MasterPage from './pages/admin/master';
import EditPage from './pages/admin/edit';
import PasswordPage from './pages/admin/password';
import RemotePage from './pages/admin/remote';
import LoginPage from './pages/admin/login';
import HomePage from './pages/home';

interface Props {
  componentData: ComponentData
}

export default function App(props: Props) {
  return <Routes>
    <Route path={paths.home} element={<HomePage componentData={props.componentData} />} />
    <Route path={paths.admin.login} element={<LoginPage />} />
    <Route element={<MasterPage />} >
      <Route path={paths.admin.edit} element={<EditPage />} />
      <Route path={paths.admin.password} element={<PasswordPage />} />
      <Route path={paths.admin.remote} element={<RemotePage />} />
    </Route>
  </Routes>
}

