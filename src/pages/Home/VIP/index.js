import { Button, Input } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { db } from '../../../firebase';
import Alltickets from './Alltickets';
import jsPDF from 'jspdf';
import { downloadExcel } from "react-export-table-to-excel";
import autoTable from 'jspdf-autotable';

function VIP() {
    const [posts1, setPosts1] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredPosts, setFilteredPosts] = React.useState([]);

    useEffect(() => {
      db.collection('registration').where("type", "==", "VIP").orderBy("timestamp","asc").onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => doc.data()))
        })
  }, [])
  
    React.useEffect(() => {
      db.collection('registration').where("type", "==", "VIP").onSnapshot((snapshot) => {
        setPosts1(snapshot.docs.map((doc) => doc.data()))
      })
  
      if (posts1 !== undefined) {
        const finalPosts = posts1.filter(res => {
          return res?.ticketID?.toString()?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })
  
        setFilteredPosts(finalPosts)
      }else {
        return <div>No results3</div>
      }
    }, [searchTerm])
  
    const updateSearchResults = (e) => {
      setSearchTerm(e.target.value)
      // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
    }


    const downloadPDF = () => {
      const doc = new jsPDF();
      doc.text(`Mr/Miss UoN Attendance List - 2023 (VIP Tickets)`, 20, 10);
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
      doc?.save(`Mr/Miss UoN Attendance List - 2023 (VIP Tickets)`);
    }



    const header = ["Position", "Ticket ID", "First Name", "Last Name","Email", "Phone", "Reg No", "Type", "Checked In"];


    const downloadExcelFile = () => {
        downloadExcel({
          fileName: "Mr/Miss UoN Attendance List - 2023 (VIP Tickets)",
          sheet: "Data",
          tablePayload: {
            header,
            // accept two different data structures
            body: posts.map((item) => [
              item.pos,
              item.ticketID,
              item.firstName,
              item.lastName,
              item.email,
              item.phone,
              item.regNo,
              item.type,
              item.checkedIn,
            ])
          },
        });
    }
  return (
    <div>
    <div style={{display:'flex', alignItems:'center'}} className='gap-2 search-div'>
    <Input
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    label="Search Ticket ID..."
    color='blue'
    onChange={updateSearchResults}
  />
  <span><Button onClick={downloadPDF} color='red' variant="outlined">PDF</Button></span>
  <span><Button onClick={downloadExcelFile} color='green' variant="outlined">CSV</Button></span>
    </div>
    <Alltickets filteredPosts={filteredPosts} searchTerm={searchTerm}/>
    </div>
  )
}

export default VIP