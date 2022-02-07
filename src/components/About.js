import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import mypic from '../Images/mypic.jpg'

const About = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/about")
    } else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container accordion-style">
      <div className="row">
        <label htmlFor="profile-pic" className="text-center mb-3"><h3>My-Profile</h3></label>
        <div className="col-md-4 mx-2 text-center">
          <img className="img-thumbnail w-auto h-50" src={mypic} alt="" />
        </div>
        <div className="col-md-7 ">
          <div className="accordion accordion-style" id="panelsStayOpen-headingOne">
            <div className="accordion-item accordion-style">
              <h2 className="accordion-header " id="headingOne">
                <button className="accordion-button accordion-style " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><strong>About Me</strong>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p><strong>I am a person with enthujiasm,passionate towards my Work</strong></p>
                  <p><strong>Name:</strong>Chinmay Shripad Halsikar</p>
                  <p><strong>School:</strong>Shri Keshavraj High School,Latur</p>
                  <p><strong>Higher Education:</strong>Government Polytechnic Pune (Diploma In CSE)</p>
                  <p><strong>Degree:</strong>B.Tech In CSE At PAHSU Solapur</p>
                </div>
              </div>
            </div>
            <div className="accordion-item accordion-style">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed accordion-style" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><strong>My Skills</strong>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <p><strong>Core Skills:</strong>C,C++,Java,HTML,CSS,Java Script</p>
                  <p><strong>Main Skills:</strong>MERN Stack(MongoDB,ExpressJS,ReactJS,NodeJS)</p>
                  <p><strong>Other Skills:</strong>Communication </p>
                </div>
              </div>
            </div>
            <div className="accordion-item accordion-style">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed accordion-style" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><strong>Personal Info</strong>
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p><strong>Phone No:</strong>7575757575</p>
                  <p><strong>Address:</strong>"House No-4,Near Rajiv Gandhi School,Ring Road,Latur"</p>
                  <p><strong>Gmail:</strong>personalatcshalsikar@gmail.com</p>
                  <p><strong>Hobbies:</strong>Playing cricket,Listening Songs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About;
