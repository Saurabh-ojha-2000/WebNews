import React , { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Button } from "reactstrap";
const Navbar = () => {

    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8000")
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false)
                    // setMessage(res.data.Error)
                }
            })
            .catch(err => {
                console.log(err);
            });
    })

    const handleLogout = () => {
        axios.get("http://localhost:8000/logout")
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">WebNews</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {
                        auth ?
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav  mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>                                    
                                </ul>
                                <div className="navbar-logout">
                                    <h5 style={{color:"white",marginTop:"10px",marginRight:"30px"}}>Welcome! <strong style={{color:"grey"}}>{name}</strong> </h5>
                                    <Button className="btn-danger" onClick={handleLogout} style={{color:"white",marginRight:"20px",fontWeight:"600"}}>Logout </Button>
                                    </div>
                            </div>
                            :
                            <div>
                                <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-2" to="/Signup" role="button">Sign up</Link>
                            </div>
                    }

                </div>
            </nav>
        </div>
    )
}

export default Navbar;
