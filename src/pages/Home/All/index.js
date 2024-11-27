import { Button, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { db } from '../../../firebase';
import Alltickets from './Alltickets';
import jsPDF from 'jspdf';
import { downloadExcel } from "react-export-table-to-excel";
import autoTable from 'jspdf-autotable';

function All() {
  const [posts1, setPosts1] = useState([]);
  const [posts, setPosts] = React.useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch('https://unsa-feng.uonbi.ac.ke/backend/php/getAll.php');
      const jsonData = await response.json();
      setPosts(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  
  React.useEffect(() => {
    fetchData();
  }, []);



  useEffect(() => {
    // Fetch data from the server
    fetch('https://unsa-feng.uonbi.ac.ke/backend/php/getAll.php')
      .then(response => response.json())
      .then(data => {
        // Set the data in state
        setPosts1(data);
        // Filter posts immediately after getting data
      })
      .catch(error => {
        // Set the error in state
        console.log(error.message || 'An error occurred while fetching data.');
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render


  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    return savedSearchTerm || '';
  });
  const [filteredPosts, setFilteredPosts] = useState(() => {
    const savedFilteredPosts = localStorage.getItem("filteredPosts");
    return savedFilteredPosts ? JSON.parse(savedFilteredPosts) : [];
  });



    // Update filtered posts when search term changes
    useEffect(() => {
      if (searchTerm === '') {
        setFilteredPosts([]);
      } else {
        const filteredData = posts1.filter((post) =>
          post.ticketID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filteredData);
      }
    }, [searchTerm]);
  
     // Save the searchTerm and filteredPosts to localStorage when they change
     useEffect(() => {
      localStorage.setItem("searchTerm", searchTerm);
      localStorage.setItem("filteredPosts", JSON.stringify(filteredPosts));
    }, [searchTerm, filteredPosts]);
    
    const updateSearchResults = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      localStorage.setItem("searchTerm", JSON.stringify(value));
    };


    const downloadPDF = () => {
      const doc = new jsPDF();
      doc.text(`Mr/Miss UoN Attendance List - 2023`, 20, 10);
      const columns = [
        "Position",
        "Ticket ID",
        "First Name",
        "Last Name",
        "Phone",
        "Reg No",
        "Type",
      ];
      const rows = [];
      posts.map((item) =>
        rows.push([
          item.pos,
          item.ticketID,
          item.firstName,
          item.lastName,
          item.phone,
          item.regNo,
          item.type,
        ])
      );
      doc?.autoTable(columns, rows);
      doc?.save(`Mr/Miss UoN Attendance List - 2023`);
    }



    const header = ["Position", "Ticket ID", "First Name", "Last Name","Faculty", "Reg No", "Type", "Checked In"];


    const downloadExcelFile = () => {
        downloadExcel({
          fileName: "Mr/Miss UoN Attendance List - 2023",
          sheet: "Data",
          tablePayload: {
            header,
            // accept two different data structures
            body: posts.map((item) => [
              item.pos,
              item.ticketID,
              item.firstName,
              item.lastName,
              item.faculty,
              item.regNo,
              item.type,
            ])
          },
        });
    }
  return (
    <div>
    <div style={{display:'flex', alignItems:'center'}} className='gap-2 search-div'>
    <Input
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    label="Search Ticket ID, First Name or Last Name..."
    color='blue'
    onChange={updateSearchResults}
    value={searchTerm}
  />
  <span><Button onClick={downloadPDF} color='red' variant="outlined">PDF</Button></span>
  <span><Button onClick={downloadExcelFile} color='green' variant="outlined">CSV</Button></span>
    </div>
    <Alltickets filteredPosts={filteredPosts} searchTerm={searchTerm}/>
    </div>
  )
}

export default All