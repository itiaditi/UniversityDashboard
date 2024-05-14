import React, {  useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
const Login = () => import('./pages/common/Login');
const Signup = () => import('./pages/common/Signup');
const StudentList = () => import('./pages/admin/StudentList');
const MarksPage = () => import('./pages/admin/MarksPage');
const StreamPage = () => import('./pages/admin/StreamPage');
const SubjectPage = () => import('./pages/admin/SubjectPage');

import { AuthContext } from './components/AuthContext';
// const AuthContext = () => import('./components/AuthContext');

// eslint-disable-next-line react/prop-types, no-unused-vars
const PrivateRoute = ({Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn.isAuth ? <Component/> : <Navigate to="/login" />;
};

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
          <Route path="/" element={<PrivateRoute Component={StudentList} />} />
          <Route path="/studentList" element={<PrivateRoute Component={StudentList} />} />
          <Route path="/marks" element={<PrivateRoute Component={MarksPage} />} />
          <Route path="/stream" element={<PrivateRoute Component={StreamPage} />} />
          <Route path="/subject" element={<PrivateRoute Component={SubjectPage} />} />
       
      </Routes>
    </div>
  );
};

export default AllRoutes;
