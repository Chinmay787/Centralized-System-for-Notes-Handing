import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../styles/DarkMode.css";

const Navbar = (props) => {
    let clickedClass="clicked";
        const body=document.body;
        const lightTheme="light";
        const darkTheme="dark";
        let theme;
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
        props.showAlert("Logged Out Successfully", "success")
    }
    const DarkMode = () => {
        if(localStorage){
            theme=localStorage.getItem("theme");
        }
        if(theme=== lightTheme || theme===darkTheme){
            body.classList.add(theme);
        }
        else{
            body.classList.add(lightTheme);
        }
    }
    const switchTheme=(e)=>{
            if(theme===darkTheme){
                body.classList.replace(darkTheme,lightTheme);
                e.target.classList.remove(clickedClass);
                localStorage.setItem("theme","light");
                theme=lightTheme;
            }else{
                body.classList.replace(lightTheme,darkTheme)
                e.target.classList.add(clickedClass);
                localStorage.setItem("theme","dark");
                theme=darkTheme;
            }
        }
    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg d-flex">
            <div className="container-fluid d-flex">
                <Link className="navbar-brand " to="/">MyNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token') ? <form className="d-flex justify-content-end">
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Log In</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
            </div>
            <div className="mx-3">
                <button className={theme==='dark' ? clickedClass:"" }id="darkMode" onClick={(e)=>{switchTheme(e); DarkMode()}} ></button>
            </div>
        </nav>
    )
}
export default Navbar;
