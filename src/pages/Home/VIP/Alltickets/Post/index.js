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

  const updateFun = () => {
    setLoading(true)
    db.collection('registration').doc(uid).update({
      pos: position
    })
    toast.success('Position updated successfully', {
      position: "top-center",
      })
      setLoading(false)
  }

  const entryFun = () => {
    setLoading(true)
    db.collection('registration').doc(uid).update({
      checkedIn: true
    })
    toast.success(`Entry updated successfully for ${firstName} ${lastName}`, {
      position: "top-center",
      })
      setLoading(false)
  }

  const sendEmail = () => {
    setLoading(true)
    db.collection('registration').doc(uid).update({
      receivedEmail: true
    })
    sendViaEmail()
    toast.success(`Email has been sent to ${firstName} - Position: ${pos}`, {
      position: "top-center",
      })
      setLoading(false)
  }



  const sendViaEmail = async () => {
    const recipientEmail = email;
    var d = timestamp;
    //var d =val.timestamp;

    //NB: use + before variable name
    var date = new Date(+d);
    const cost = amount === 100 ? "Ordinary" : "VIP";
    const subject = encodeURIComponent(
      `Mr/Miss UoN 2023 Ticket Number: ${ticketID} - ${firstName} ${lastName}`
    );
    const body = encodeURIComponent(
      `Greetings ${firstName}, hope this mail finds you in good health. We've sent this mail to confirm to you that the registration for Mr/Miss UoN 2023 is a success. Below are the details for your booking.\n\nTicket Number: ${ticketID}\nList Position: ${pos}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nRegistration No.: ${regNo}\nPhone No.: ${phone}\nFaculty: ${faculty}\nCountry: ${country}\nAmount(KES): ${amount}.00\nType: ${cost}\nDate Registered: ${date.toDateString()}\n\nRegards,\nUwimana Jessy Bandya\nInternational Rep. Faculty Of Engineering.`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank");
  };

  return (
        <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell> 
        {ticketID}        
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
        {type}                  
        </TableCell>
        <TableCell align='right'>
        {amount}                  
        </TableCell>
        <TableCell align='right'>
        {checkedIn === 0 ? <ClearIcon style={{color:'#3498db', cursor: 'pointer'}} onClick={entryFun}/> : <DoneAllIcon style={{color:'#3498db'}}/>}                  
        </TableCell>
        <TableCell align='right'>
        {receivedEmail === 0 ? <span style={{color:'red'}}>No</span> : <span style={{color:'#3498db'}}>Yes</span>}                  
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
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
        <Button onClick={updateFun} color='blue' variant="gradient"  fullWidth>
        {loading ? 'Updating...' : 'Update'}
      </Button>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={sendEmail} color='red' variant="gradient"  fullWidth>
          Send Email
        </Button>

      </CardFooter>
    </Card>
      </Dialog>
  </TableRow>
  )
}

export default Post