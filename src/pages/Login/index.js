import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardFooter,
  CardBody,
} from "@material-tailwind/react";
import logo from '../../logo.svg'
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthId } from "../../redux/dataSlice";
import Swal from "sweetalert2";
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
            
          }
        })
        dispatch(updateAuthId(user?.uid))
      }
    })
    return () => unsubscribe()
  }, [])

  const signIn = () => {
    setLoading(true)

    if(!email){
      toast.error('Email is required!',{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true      
      })
      setLoading(false)
    }else if(!password){
      toast.error('Password is required!',{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true      
      })
      setLoading(false)
    }else{
      auth.signInWithEmailAndPassword(email,password)
      .then((auth) =>{
        setLoading(false)
       Swal.fire({
        icon: 'success',
        title: 'Welcome back to the Dashboard!',
        showConfirmButton: false,
        timer: 2000
      })
    })
      .catch((e) =>{
              toast.error(e.message, {
                position: toast.POSITION.TOP_CENTER
            })      
            setLoading(false)     
      })
    }    
  }
  return (
    <Card style={{display:'table', margin:'auto', marginTop:25, border:'1px #3498db solid', padding:5, background:'#fff'}} className="w-96">
    <CardHeader
      variant="gradient"
      color="blue"
      className="mb-4 grid h-28 place-items-center"
    >
      <Typography variant="h3" color="white">
      <center><img src={logo} style={{height:50}} className="App-logo" alt="logo" /></center>
      </Typography>
    </CardHeader>
    <CardBody className="flex flex-col gap-4">
      <Input label="Email" type="email" size="lg" color="blue" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <Input label="Password" type="password" size="lg" color="blue"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
    </CardBody>
    <CardFooter className="pt-0">
      <Button onClick={signIn} color='blue' className="mt-6" fullWidth>
      {loading ? <CircularProgress style={{color:'#fff'}} size={25} /> : 'Sign In'}
      </Button>
      <Typography variant="small" className="mt-6 flex justify-center">
        Forgotten Password?
      </Typography>
    </CardFooter>
  </Card>
  );
}