import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {navbarHover, collapseNavbar} from '../../utility/script';

export default function Navbar(){
    return (
        <Fragment>
            {/* <div id="topNavBtn" onClick={() => collapseNavbar()}>
                click
            </div> */}
            <div className="topNav" id="myTopnav">
                <ul className="navbar" id="navbar">
                    <li>
                        <Link to="/" onClick={() => navbarHover(0)} className="navLink navActive">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => navbarHover(1)} className="navLink">About Me</Link>
                    </li>
                    <li>
                        <Link to="/resume" onClick={() => navbarHover(2)}  className="navLink">Resume</Link>
                    </li>
                    <li>
                        <Link to="/course" onClick={() => navbarHover(3)} className="navLink">Course</Link>
                    </li>
                    <li>
                        <Link to="/project" onClick={() => navbarHover(4)} className="navLink">Project</Link>
                    </li>
                    <li>
                        <Link to="/github" onClick={() => navbarHover(5)} className="navLink">Github</Link>
                    </li>
                    <li>
                        <Link to="internship" onClick={() => navbarHover(6)} className="navLink">Internship</Link>
                    </li>
        
                    <li>
                        <Link to="#" onClick={() => collapseNavbar()} className="navLink">
                            <i className="fa fa-bars"></i>
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </Fragment>
    )
}