const express = require('express');
const { addStream, updateStream ,deleteStream,addSubject, updateSubject, deleteSubject, addMark, updateMark, deleteMark, getStudentList, getMark, getStreams, getSubject, getSubjects} = require('../controllers/admin.controller');
const { auth } = require('../middleware/auth.middleware');
const { access } = require('../middleware/access.middleware');
const adminRouter = express.Router();

// Streams
adminRouter.post('/streams/get',auth,access("admin"), getStreams);
adminRouter.post('/streams/add',auth,access("admin"), addStream);
adminRouter.patch('/streams/update/:id',auth,access("admin"), updateStream);
adminRouter.delete('/streams/delete/:id',auth,access("admin"), deleteStream);

// Subjects
adminRouter.post('/subjects/get',auth,access("admin"), getSubjects);
adminRouter.post('/subjects/add',auth,access("admin"), addSubject);
adminRouter.put('/subjects/update/:id',auth,access("admin"), updateSubject);
adminRouter.delete('/subjects/delete/:id',auth,access("admin"), deleteSubject);

// Marks
adminRouter.get('/marks/get',auth,access("admin"),getMark);
adminRouter.post('/marks/add',auth,access("admin"), addMark);
adminRouter.put('/marks/update/:id',auth,access("admin"), updateMark);
adminRouter.delete('/marks/delete/:id',auth,access("admin"), deleteMark);

// StudentList
adminRouter.get('/studentList',auth,access("admin"), getStudentList);

module.exports = {adminRouter};
