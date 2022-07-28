import React from "react";
import {FaHome} from "react-icons/fa";
import './style.css';

class Navbar extends React.Component {
    logout = () => {
        //delete from local storage
        localStorage.removeItem('user');
        window.location.reload(false);
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-dark text-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="/images/logo.png" alt="logo" width="200px" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><FaHome /> Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Attendance</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Resources</a>
                            </li>
                            <li className="nav-item" onClick={this.logout}>
                                <a className="nav-link" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;