// vendors
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

// styles
import 'styles/App.scss';

// views
import Home from 'home/views/home.view';
import Projects from 'projects/views/projects.view';
import ProjectsAdm from 'projects/views/projects.viewADM'
import ProjectsE from 'projects/views/enrrolmentsE.view'
import SignUp from 'users/views/signup.view';
import Menu from 'components/menu.component';
import Users from 'users/views/users.view';
import Login from 'users/views/login.view';
import Leader from 'projects/views/projectsbyleader.view';
import NoAccess from 'components/no-access.component';
import UpdateUser from 'users/views/updateUser.view';

function App() {
  return (
    <>
      <Menu />
      <Container>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="projects" element={<Projects />} />
          <Route path="leader" element={<Leader />} />
          <Route path="registros" element={<ProjectsE />} />
            <Route path="administrador" element={<ProjectsAdm />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="updateUser" element={<UpdateUser />} />
          </Route>
          <Route path="no-access" element={<NoAccess />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
