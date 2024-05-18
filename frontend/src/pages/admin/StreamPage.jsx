import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";

const StreamPage = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch(
        "https://universitydashboard-1.onrender.com/admin/streams/get",
        {
          headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
          }
      }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student list");
      }
      const data = await response.json();
      console.log("line2",data);
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (id) => {
    try {
        const studentToUpdate = students.find(student => student._id === id);
        const response = await fetch(`https://universitydashboard.onrender.com/admin/streams/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
                name: studentToUpdate.name,
                email: studentToUpdate.email,
                // Add other fields as needed
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to update student");
        }
       
        setEditingId(null);
        fetchStudentList();
    } catch (error) {
        console.error("Error updating student:", error);
    }
};


  const fetchMarks = async (id) => {
    try {
      const response = await fetch(
        `https://universitydashboard-1.onrender.com/admin/marks/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch marks");
      }
      const marksData = await response.json();
      // Handle marks data
      console.log("Marks for student with ID", id, marksData);
    } catch (error) {
      console.error(error);
    }
  };
console.log(students);
  return (
    <Box className="container">
      <Table className="table" id="makeEditable">
        <Thead>
          <Tr>
           
            <Th>Stream</Th>
            <Th>Subject</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
            {/* <Th>Fetch Marks</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              {/* <Td>{student.name}</Td>
              <Td>{student.email}</Td> */}
              <Td>{student.name }</Td>
              <Td>{student.subject ? student.subject.name : "-"}</Td>
              <Td>
              {editingId === student._id ? (
                  <button onClick={() => handleSave(student._id)}>Save</button>
                ) : (
                  <IconButton
                    icon={<HiOutlinePencil />}
                    onClick={() => handleEdit(student._id)}
                  />
                )}
              </Td>
              <Td>
                <IconButton
                  icon={<MdDelete />}
                  onClick={() => handleDelete(student._id)}
                />
              </Td>
              {/* <Td>
                <IconButton
                  icon={<FiEdit2 />}
                  onClick={() => fetchMarks(student._id)}
                />
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StreamPage;
