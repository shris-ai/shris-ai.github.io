// src/routes/TopBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css'; // Import the CSS file
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { GrNotes } from "react-icons/gr";
import { ImLab } from "react-icons/im";
import { IoMdContact } from "react-icons/io";

const TopBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className='topbar-title'>
                    <Link to="/" className="topbar-title">
                    <div className="navbar-title hindi">सृष्टि</div>
                    <div className="navbar-title">|</div>
                    <div className="navbar-title">Shristi Gautam</div>
                    </Link>
                    </div>
                    
                    <div className="navbar-links">
                        <Link to="/paper-dive-ins" className="navbar-link">
                            <span className='icons' alt="Notes" title="Notes">
                                <GrNotes size="20px" />
                            </span>
                        </Link>
                        <Link to="/paper-dive-ins" className="navbar-link">
                            <span className='icons' alt="Lab" title="Lab">
                                <ImLab size="20px" />
                            </span>
                        </Link>
                        <Link to="/paper-dive-ins" className="navbar-link">
                            <span className='icons' alt="Paper Dive-Ins" title="Paper Dive-Ins">
                                <HiDocumentMagnifyingGlass size="20px" />
                            </span>
                            {/*<span>Paper Dive-Ins</span>*/}
                        </Link>
                        <Link to="/" className="navbar-link">
                            <span className='icons' alt="About" title="About">
                                <IoMdContact size="20px" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopBar;