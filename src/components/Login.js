import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate=useNavigate();
    const host="http://localhost:5000";

    const handleSubmit=async (e)=>{
        e.preventDefault();
            const response =await fetch(`${host}/api/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({email:credentials.email,password:credentials.password})
            });
            const json = await response.json() 
            console.log(json)
            if(json.success){
                //redirect
                localStorage.setItem('token',json.authtoken);
                navigate("/");
                props.showAlert("Logged In Successfully","success");
            }
            else{
                props.showAlert("Invalid Details","danger")
            }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <h2 className="mx-3 my-3">Log In To Use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3 mx-3">
                    <label htmlFor="exampleInputEmail1" className="h5 my-2 fw-bold">Email address</label>
                    <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" />
                </div>
                <div className="form-group my-3 mx-3">
                    <label htmlFor="exampleInputPassword1" className="h5 my-2 fw-bold">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password"placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3 mx-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login;
