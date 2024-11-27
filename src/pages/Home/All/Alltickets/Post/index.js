import { TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import ClearIcon from '@mui/icons-material/Clear';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../../../../firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Post({ amount, firstName, lastName, email, phone, checkedIn, timestamp, regNo, faculty, country, ticketID, pos, receivedEmail, type, uid, cancel }) {
  const [position, setPosition] = useState('')
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  const openModal = (pos) => {
    setPosition(pos)
    setOpen(true)
  }

  const updateFun = async(id) => {
    setLoading(true)
    const formData = {
      id,
      receivedEmail: receivedEmail,
      checkeIn:checkedIn,
      pos: position
    }

    try {
      await fetch('https://unsa-feng.uonbi.ac.ke/backend/php/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      toast.success(`Update to ${firstName} ${lastName}`, {
        position: "top-center",
        })
        setLoading(false)
    } catch (error) {
      console.log(error.message || 'An error occurred while updating emailSent.');
    }
  }

  const deleteUser = async (id) => {
    if (window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      setLoading(true);
      const formData = {
        id
      };
  
      try {
        await fetch('https://unsa-feng.uonbi.ac.ke/backend/php/delete.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        toast.success(`Deleted ${firstName} ${lastName}`, {
          position: 'top-center',
        });
        setLoading(false);
      } catch (error) {
        console.log(error.message || 'An error occurred while updating emailSent.');
      }
    }
  };
  

  const entryFun = async(id) => {

    
    const formData = {
      id,
      receivedEmail: receivedEmail,
      checkeIn: 1,
      pos: pos
    }

    try {
      await fetch('https://unsa-feng.uonbi.ac.ke/backend/php/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      toast.success(`Entry updated successfully for ${firstName} ${lastName}`, {
        position: "top-center",
        })
        setLoading(false)
    } catch (error) {
      console.log(error.message || 'An error occurred while updating emailSent.');
    }

  }



  const updateEmailSent = async (id) => {

    const formData = {
      id,
      receivedEmail: 0,
      checkeIn:checkedIn,
      pos: pos
    }

    try {
      await fetch('https://unsa-feng.uonbi.ac.ke/backend/php/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      sendViaEmail()
      toast.success(`Email has been sent to ${firstName} - Position: ${pos}`, {
        position: "top-center",
        })
        setLoading(false)
    } catch (error) {
      console.log(error.message || 'An error occurred while updating emailSent.');
    }
  };



  const sendViaEmail = async () => {
    const recipientEmail = email;
    var d = timestamp;
    //var d =val.timestamp;

    //NB: use + before variable name
    var date = new Date(+d);
    const cost = amount === 100 ? "Ordinary" : "VIP";
    const subject = encodeURIComponent(
      `Mr/Miss UoN 2023 Ticket Update`
    );
    const body = encodeURIComponent(
      `Greetings ${firstName}, hope this mail finds you well. I've sent this email to notify you that the ticket: ${ticketID} you purchased for Mr/Miss UoN 2023 has been cancelled and provided you with an updated one. I've sent a new ticket to sms via phone number: ${phone} and Email: ${email}.\n\nWe're migrating our tickets from the initial system to a new one, since you don't have to pay twice the ticket generated show 0.00 amount paid which is okay and the ticket still valid.\nThank you for understanding.\n\nIn case of any queries, kindly reach out to me via: \nRole: Support Representative/Int'l Students' Rep. Faculty Of Engineering\nEmail 1: jessy.bandya5@gmail.com\nEmail 2:bandya@students.uonbi.ac.ke\nPhone Number: +254746749307`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank");
  };

  return (
        <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell style={{fontWeight:'bold'}}> 
        {pos}.         
        </TableCell>
        <TableCell align='right'>  
        {email}                
        </TableCell>
        <TableCell align='right'>
        {firstName}                   
        </TableCell>
        <TableCell align='right'>
        {lastName}                   
        </TableCell>
        <TableCell align='right'>
        {phone}                   
        </TableCell>
        <TableCell align='right'>
        {amount}                  
        </TableCell>
        <TableCell align='right'>
        {receivedEmail === 0 ? <span style={{color:'red'}}>No</span> : <span style={{color:'#3498db'}}>Yes</span>}                  
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon onClick={() => deleteUser(uid)} style={{color:'#3498db', cursor: 'pointer', marginLeft:5}}/>
         <EditIcon onClick={() => openModal(pos)} style={{color:'#3498db', cursor: 'pointer'}}/>                
        </TableCell>

        <Dialog
        size="xs"
        open={open}
        handler={() => setOpen(false)}
        className="bg-transparent shadow-none"
      >
      <Card className="mx-auto w-full max-w-[24rem]">
      <CardBody className="flex flex-col gap-4">
      <ToastContainer />
        <Typography className="-mb-2" variant="h6">
          {ticketID} - {firstName} {lastName}
        </Typography>
        <Input
        value={position}
        color='blue'
        onChange={(e) => setPosition(e.target.value)}
        label="Position" size="lg" />
        <Button onClick={() => updateFun(uid)} color='blue' variant="gradient"  fullWidth>
        {loading ? 'Updating...' : 'Update'}
      </Button>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => updateEmailSent(uid)} color='red' variant="gradient"  fullWidth>
          Send Email
        </Button>

      </CardFooter>
    </Card>
      </Dialog>
  </TableRow>
  )
}

export default Post