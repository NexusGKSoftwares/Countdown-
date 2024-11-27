import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";

import logo from '../../logo.svg';
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { updateAuthId } from "../../redux/dataSlice";
import Swal from "sweetalert2";
 
export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  const authId = useSelector((state) => state.authId);
  const dispatch = useDispatch();
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const logout  = () =>{
    auth.signOut();
    dispatch(updateAuthId(''))
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 2000
    })
  }
 

 
  return (
    <Navbar style={{background:'#3498db', border: '1px #3498db solid'}} className="sticky top-0 z-10 h-max max-w-full rounded-none px-1 py-2 lg:px-4 lg:py-4">
    <div className="flex items-center justify-between text-blue-gray-900">
      <Typography
        className="mr-4 cursor-pointer py-1.5 font-medium"
      >
      <img src={logo} className="App-logo" alt="logo" />
      </Typography>
      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-x-1">
        {authId ?(
            <Avatar onClick={logout} src="https://kisumucodl.uonbi.ac.ke/sites/default/files/2020-08/University_Of_Nairobi_Towers.jpg" alt="AD" size="sm" className="cursor-pointer"/>
        ):(
            <Button
            variant="outlined"
            size="sm"
            style={{background:'#fff', color:'#3498db'}}
            color="blue"

          >
            <span>Sign in</span>
          </Button>
        )}
        </div>
      </div>
    </div>
  </Navbar>
  );
}