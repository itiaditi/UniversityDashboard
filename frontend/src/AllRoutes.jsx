import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import StudentList from './pages/admin/StudentList'
import MarksPage from './pages/admin/MarksPage'
import StreamPage from './pages/admin/StreamPage'
import SubjectPage from './pages/admin/SubjectPage'


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<StudentList/>}/>
        <Route path="/studentList" element={<StudentList/>}/>
        <Route path="/marks" element={<MarksPage/>}/>
        <Route path="/stream" element={<StreamPage/>}/>
        <Route path="/subject" element={<SubjectPage/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes;
