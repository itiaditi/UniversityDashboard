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
  Input,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { FiEdit2, FiSave } from "react-icons/fi";

const SubjectPage = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    stream: "",
    subject: "",
  });

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch(
        "https://universitydashboard-1.onrender.com/admin/studentlist"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student list");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditFormData({
      name: student.name,
      email: student.email,
      stream: student.stream ? student.stream.name : "",
      subject: student.subject ? student.subject.name : "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(
        `https://universitydashboard-1.onrender.com/admin/subjects/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, ...editFormData } : student
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://universitydashboard.onrender.com/admin/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarks = async (id) => {
    try {
      const response = await fetch(
        `https://universitydashboard.onrender.com/admin/marks/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch marks");
      }
      const marksData = await response.json();
      console.log("Marks for student with ID", id, marksData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="container">
      <Table className="table" id="makeEditable">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Stream</Th>
            <Th>Subject</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
            <Th>Fetch Marks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              {editingId === student._id ? (
                <>
                  <Td>
                    <Input
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />
                  </Td>
                  <Td>
                    <Input
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                  </Td>
                  <Td>
                    <Input
                      name="stream"
                      value={editFormData.stream}
                      onChange={handleEditChange}
                    />
                  </Td>
                  <Td>
                    <Input
                      name="subject"
                      value={editFormData.subject}
                      onChange={handleEditChange}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      icon={<FiSave />}
                      onClick={() => handleSave(student._id)}
                    />
                  </Td>
                </>
              ) : (
                <>
                  <Td>{student.name}</Td>
                  <Td>{student.email}</Td>
                  <Td>{student.stream ? student.stream.name : "-"}</Td>
                  <Td>{student.subject ? student.subject.name : "-"}</Td>
                  <Td>
                    <IconButton
                      icon={<HiOutlinePencil />}
                      onClick={() => handleEditClick(student)}
                    />
                  </Td>
                </>
              )}
              <Td>
                <IconButton
                  icon={<MdDelete />}
                  onClick={() => handleDelete(student._id)}
                />
              </Td>
              <Td>
                <IconButton
                  icon={<FiEdit2 />}
                  onClick={() => fetchMarks(student._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SubjectPage;
