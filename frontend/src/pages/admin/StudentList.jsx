import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Input } from "@chakra-ui/react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch("https://universitydashboard-1.onrender.com/admin/studentList");
      if (!response.ok) {
        throw new Error("Failed to fetch student list");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id) => {
    
    setEditingId(null); 
  };

  return (
    <Box className="container">
      <Table className="table" id="makeEditable">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>
                {editingId === student._id ? (
                  <Input
                    defaultValue={student.name}
                    onBlur={() => handleSave(student._id)}
                  />
                ) : (
                  student.name
                )}
              </Td>
              <Td>
                {editingId === student._id ? (
                  <Input
                    defaultValue={student.email}
                    onBlur={() => handleSave(student._id)}
                  />
                ) : (
                  student.email
                )}
              </Td>
              <Td>
                {editingId === student._id ? (
                  <button onClick={() => handleSave(student._id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(student._id)}>Edit</button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StudentList;
