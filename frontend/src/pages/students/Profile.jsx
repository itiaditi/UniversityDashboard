import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  Stack,
  Center,
} from '@chakra-ui/react';

const Profile = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const userId = localStorage.getItem('userId');
     

      try {
        const response = await fetch(
          `http://localhost:8080/student/profile/${userId}`,{
            
                headers: {
                  Authorization: `${localStorage.getItem("accessToken")}`,
                }
            
          }
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch performance data');
        }
        setPerformanceData(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500" fontSize="lg">{error}</Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Student Profile
        </Text>
        <Text fontSize="lg">Name: {performanceData.name}</Text>
        <Text fontSize="lg">Email: {performanceData.email}</Text>
      </Box>
      {/* <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Subject</Th>
            <Th>Marks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {performanceData.marks.map((mark) => (
            <Tr key={mark._id}>
              <Td>{mark.subject.name}</Td>
              <Td>{mark.marks}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table> */}
    </Box>
  );
};

export default Profile;
