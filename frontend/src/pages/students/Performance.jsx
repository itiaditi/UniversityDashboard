import React, { useEffect, useState } from 'react';
import {PieChart} from 'react-minimal-pie-chart';
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
import { MdPieChartOutline } from 'react-icons/md';

const Performance = () => {
  const [data, setData] = useState([
    { title: "anuj", value: 10, color: '#E38627' },
    { title: "anuj1", value: 20, color: 'red' },
    { title: "anuj2", value: 30, color: 'green' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [numVal,setNumber] = useState([10,20,30,40,50,60,70,80,90,100]);
    const [detail]=useState([{
        name:"anuj",marks:"80",color:"red"
    }])
    useEffect(() => {
      const interval = setInterval(() => {
        setData([
          { title: "anuj", value: Math.floor(Math.random() * 100), color: '#E38627' },
          { title: "atul", value: Math.floor(Math.random() * 100), color: 'red' },
          { title: "akshay", value: Math.floor(Math.random() * 100), color: 'green' }
        ]);
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
  // useEffect(() => {
  //   const fetchPerformanceData = async () => {
  //     const userId = localStorage.getItem('userId');
     

  //     try {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/users`,{
            
  //               // headers: {
  //               //   Authorization: `${localStorage.getItem("accessToken")}`,
  //               // }
            
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       if (!response.ok) {
  //         throw new Error(data.message || 'Failed to fetch performance data');
  //       }
  //       setPerformanceData(data);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   fetchPerformanceData();
  // }, []);


  // if (loading) {
  //   return (
  //     <Center h="100vh">
  //       <Spinner size="xl" />
  //     </Center>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Center h="100vh">
  //       <Text color="red.500" fontSize="lg">{error}</Text>
  //     </Center>
  //   );
  // }


   
  
console.log(data);
  return (
    <Box p={6}>
       
      {/* <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Student Performance
        </Text>
        <Text fontSize="lg">Name: {performanceData.student.name}</Text>
        <Text fontSize="lg">Email: {performanceData.student.email}</Text>
        <Text fontSize="lg">Total Marks: {performanceData.totalMarks}</Text>
      </Box>
      <Table variant="simple">
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
     <Box w={"50%"} h={"50%"}>
     <PieChart 
      data={data} 
    />
     </Box>
        
    </Box>
  );
};

export default Performance;
