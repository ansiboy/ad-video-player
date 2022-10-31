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

