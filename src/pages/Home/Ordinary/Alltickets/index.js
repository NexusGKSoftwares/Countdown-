import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import { db } from '../../../../firebase';


function Alltickets({ filteredPosts, searchTerm }) {
      const [posts, setPosts] = React.useState([])
      const pageSize = 10; // Number of posts per page
      const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 5) : 1;
      });
    const [prevPage, setPrevPage] = useState(1);

      const totalPages = Math.ceil(posts.length / pageSize);
  
      useEffect(() => {
        // Fetch data from the server
        const fetchData = async () => {
        fetch('https://unsa-feng.uonbi.ac.ke/backend/php/getAll.php')
          .then(response => response.json())
          .then(data => {
        // Filter posts based on type "Ordinary"
        const ordinaryPosts = data.filter(post => post.type === 'Ordinary');

        // Map the filtered data to the expected format
        const mappedPosts = ordinaryPosts.map(post => ({
          id: post.id, // Adjust based on the structure of your data
          post: post, // Adjust based on the structure of your data
        }));

        // Set the data in state
        setPosts(mappedPosts);
          })
          .catch(error => {
            // Set the error in state
            console.log(error.message || 'An error occurred while fetching data.');
          });
        }

          const interval = setInterval(fetchData, 2000);

          // Clean up interval on component unmount
          return () => {
            clearInterval(interval);
          };
      }, []); // Empty dependency array ensures the effect runs once after the initial render
  
  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

    // Save the currentPage to localStorage when it changes
    useEffect(() => {
      localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

// Get the posts for the current page
const getCurrentPosts = () => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return posts.slice(startIndex, endIndex);
};

  useEffect(() => {
    // Save the current page before updating the data
    setPrevPage(currentPage);
  }, [posts]);

  useEffect(() => {
    // Set the current page back to its previous value after data update
    setCurrentPage(prevPage);
  }, [prevPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}}>T. ID</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">F. NAME</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">L. NAME</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">PHONE</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">TICKET</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">AMOUNT(KES)</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">ENTRY</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">E. SENT</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">REGISTERED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {searchTerm === "" ?(
          posts?.length > 0 ?(
             <>
             {
                getCurrentPosts().map(({id, post}) => (
                    <Post
                    key={id} 
                    amount={post.amount}
                    firstName={post.firstName}
                    lastName={post.lastName}
                    email={post.email}
                    phone={post.phone}
                    checkedIn={post.checkeIn}
                    timestamp={post.timestamp}
                    regNo={post.regNo}
                    faculty={post.faculty}
                    country={post.country}
                    ticketID={post.ticketID}
                    pos={post.pos}
                    receivedEmail={post.receivedEmail}
                    type={post.type}
                    uid={post.uid}
                    cancel={post.cancel}
                    />
                  ))
  }
             </>
          ):(
            <div style={{display:'table',margin:'auto',fontSize:18}}>loading...</div>
          )
       ):(
        <>
        {
         filteredPosts.length > 0 ?(
           <>
           {
                           filteredPosts.map((posts2) => (
 
 <Post 
 amount={posts2.amount}
 firstName={posts2.firstName}
 lastName={posts2.lastName}
 email={posts2.email}
 phone={posts2.phone}
 checkedIn={posts2.checkedIn}
 timestamp={posts2.timestamp}
 regNo={posts2.regNo}
 faculty={posts2.faculty}
 country={posts2.country}
 ticketID={posts2.ticketID}
 pos={posts2.pos}
 receivedEmail={posts2.receivedEmail}
 type={posts2.type}
 uid={posts2.uid}
 cancel={posts2.cancel}
 />
 ))
                           }
           </>
         ):(
          <><center><h4>Not found...</h4></center></>
         )       
       
       }
        </>
       )}
        </TableBody>
      </Table>
    </TableContainer>

    <center style={{display:'table',margin:'auto',marginTop:5,marginBottom:5}}>
    <Pagination
    count={totalPages}
    page={currentPage}
    onChange={handlePageChange}
    variant="outlined"
    shape="rounded"
    color="primary"
  />
    </center>
  </Paper>
  )
}

export default Alltickets