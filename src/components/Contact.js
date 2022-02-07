import React,{ useEffect ,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
const Result=()=>{
    return(
        <p>Your Message Has Been Sent.</p>
    )
}
const Contact = (props) => {
    
    let navigate=useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/contact")
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
      }, []);
      const form=useRef();
      const[result,showResult]=useState(false)
      const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_k57066b', 'template_obxu6bk', form.current, 
        'user_2vdTxgX3j0SnKK8T6voBx')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
          showResult(true)
      };
    return (
        <div>
        <div className="container mt-2" >
            <h3 className="fw-bold">Stay Connected With Us!!</h3>
            <form ref={form} onSubmit={sendEmail} >
                <div className="form-group">
                    <label className="fw-bold mb-1" htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"  className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label className="fw-bold mb-1" htmlFor="exampleInputEmail1">Phone Number</label>
                    <input type="number"  className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label className="fw-bold mb-1" htmlFor="exampleFormControlTextarea1">Leave A Messgae For Us</label>
                    <textarea className="form-control my-2"  id="exampleFormControlTextarea1" rows="5" placeholder="Write Something Here..."></textarea>
                </div>
                <button type="submit"  className="btn btn-primary mt-2 fw-bold">Submit</button>
                <div className="row">
                    {result ?<Result/> :null}</div>
            </form>
        </div>
        <div className="container my-4 " >
            <div className="row mx-2 ">
                <div className="col-md-5 h6 mx-3">
                    <h4 className="fw-bold mx-2 text-center" >Address </h4>
                    <div className="text-center " >
                    <span className="container" >"InfoTech Towers" Street -27,<br />Near Panchmukhi Hanuman Temple,<br />Kothrud-411 303, Pune, <br />Contact No: 7577575773 <br /> Email:chinmayhalsikar@gmail.com </span>
                    </div>
                </div>
                <div className="col-md-6" >
                    <h4 className="fw-bold mx-2 text-center">Follow Us On</h4>
                    <div className="text-center" >
                    <a href="https://www.instagram.com/accounts/login/"><i className="fab fa-instagram fa-3x mx-3 my-2" ></i></a>
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-square fa-3x mx-3 my-2" ></i></a>
                    <a href="https://github.com/"><i className="fab fa-github-square fa-3x mx-3 my-2" ></i></a>
                    <a href="https://www.linkedin.com/login/"><i className="fab fa-linkedin fa-3x mx-3 my-2" ></i></a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
