import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
    let navigate=useNavigate();
    const host="http://localhost:5000"
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
            const response =await fetch(`${host}/api/auth/createuser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({name,email,password})
            });
            const json = await response.json() 
            console.log(json)
            if(json.success){
                //redirect
                localStorage.setItem('token',json.authtoken);
                navigate("/");
                props.showAlert("Account created successfully","success")
            }
            else{
                props.showAlert("Invalid Credentials","danger")
            }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <h2 className="mx-3 my-3">Sign Up To Use iNoteBook</h2>
             <form onSubmit={handleSubmit}>
                <div className="form-group mx-3 my-3">
                    <label htmlFor="Email" className="h5 my-2 fw-bold">Your Name</label>
                    <input type="text"className="form-control" id="name" name="name" onChange={onChange}placeholder="Enter email" required/>
                </div>
                <div className="form-group mx-3 my-3">
                    <label htmlFor="Email" className="h5 my-2 fw-bold">Email Address</label>
                    <input type="email"className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} placeholder="Enter email" required />
                </div>
                <div className="form-group mx-3 my-3">
                    <label htmlFor="Password" className="h5 my-2 fw-bold">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" required />
                </div>
                <div className="form-group mx-3 my-3">
                    <label htmlFor="Cpassword" className="h5 my-2 fw-bold">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm Password" required/>
                </div>
                <button type="submit" className="btn btn-primary mx-3 my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup
