// src/routes/PaperDiveIns/PaperDiveIns.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PaperDiveIns.css'; // Import the CSS file
import papers from './papers';

const PaperDiveIns = () => {
    return (
        <div className="container">
            {/* Description Section */}
            <h1 className="title struct">Deep Dives into AI Research</h1>
            {/*
            <p className="description">
                Welcome to the Paper Dive-Ins page! Here, we explore various research papers and their implications in the field of AI and machine learning.
                
            </p>*/}

            {/* Single Column Layout */}
            <div className="grid struct">
                {papers.map((paper, index) => (
                    <div key={index+"_"+paper.title.replace(" ","")}>
                                            <Link to="/paper-breakdown" state={{ htmlFile: paper.htmlFile, title: paper.title}} >
                                
                       
                                    <div className="flex-container" >
                    {/* Left Side: Image */}
                    <div className="image-container">
                        <img
                            src={paper.img.src} // Replace with your image URL
                            alt={paper.img.alt}
                            className="image"
                        />
                    </div>

                    {/* Right Side: Title and Tags */}
                    <div className="md:w-2/3 md:pl-4">
                        <h2 className="title-paper">{paper.title}</h2>
                        {/*
                        <Link to="/paper-breakdown" state={{ markdownFile: paper.markdownFile }} className="title-paper">
                                {paper.title}
                        </Link>
                        */}
                        <div className="text-gray-600 mb-2">
                        {paper.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="tag">{tag}</span>
                                ))}
                        </div>
                        <p className="description-paper">
                            {paper.description}
                        </p>
                    </div>
                </div>
                </Link>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default PaperDiveIns;