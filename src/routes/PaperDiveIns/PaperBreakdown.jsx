import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { useLocation } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import DOMPurify from 'dompurify'; // Add this import for security


const PaperBreakdown = () => {
    const location = useLocation();
    const { markdownFile, htmlFile, title } = location.state || { markdownFile: '' };
    const [markdownContent, setMarkdownContent] = useState('');
    const [content, setContent] = useState('');
    const [isHtml, setIsHtml] = useState(false);

{/*
    useEffect(() => {
        if (markdownFile) {
            fetch(markdownFile)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(text => {
                    // Only convert tabs to spaces, preserve LaTeX
                    const processedText = text.replace(/\t/g, '    ');
                    setMarkdownContent(processedText);
                })
                .catch(error => console.error('Error loading markdown file:', error));
        }
    }, [markdownFile]);
*/}

useEffect(() => {
    // Determine which file to load
    const fileToLoad = htmlFile || markdownFile;
    if (fileToLoad) {
        fetch(fileToLoad)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                setIsHtml(!!htmlFile);
                if (htmlFile) {
                    // For HTML content, sanitize it first
                    const sanitizedHtml = DOMPurify.sanitize(text);
                    setContent(sanitizedHtml);
                } else {
                    // For markdown, process as before
                    const processedText = text.replace(/\t/g, '    ');
                    setContent(processedText);
                }
            })
            .catch(error => console.error('Error loading file:', error));
    }
}, [markdownFile, htmlFile]);

    return (
        <div className="container">
            <h1 className="title struct">{title}</h1>
            <div className="markdown-content struct">
                {isHtml ? (
                    //Render HTML content
                    <div className='html-content'
                    dangerouslySetInnerHTML={{__html:content}}
                    />

                ):(
                    //test
                    <ReactMarkdown
                    children={markdownContent}
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[[rehypeKatex, { strict: false, trust: true }]]}
                    components={{
                        p: ({children}) => (
                            <p className="markdown-paragraph">{children}</p>
                        ),
                        pre: ({children}) => {
                            if (children && children.props) {
                                // Split content into lines to preserve indentation
                                const lines = children.props.children.split('\n').map((line, index) => {
                                    // Count leading spaces
                                    const indent = line.match(/^\s*/)[0].length;
                                    return (
                                        <div 
                                            key={index} 
                                            className="markdown-line"
                                            style={{ paddingLeft: `${indent * 0.5}em` }}
                                        >
                                            <ReactMarkdown
                                                children={line.trimLeft()}
                                                remarkPlugins={[remarkMath, remarkGfm]}
                                                rehypePlugins={[[rehypeKatex, { strict: false, trust: true }]]}
                                                components={{
                                                    p: ({children}) => <>{children}</>,
                                                    strong: ({children}) => (
                                                        <strong className="markdown-bold">{children}</strong>
                                                    ),
                                                    math: ({value}) => (
                                                        <span className="math-block">
                                                            <span className="katex-display">{'$$' + value + '$$'}</span>
                                                        </span>
                                                    ),
                                                    inlineMath: ({value}) => (
                                                        <span className="math-inline">{'$' + value + '$'}</span>
                                                    )
                                                }}
                                            />
                                        </div>
                                    );
                                });
                                return <div className="markdown-indented">{lines}</div>;
                            }
                            return <div className="markdown-indented">{children}</div>;
                        },
                        code: ({inline, children}) => 
                            inline ? (
                                <code className="markdown-inline-code">{children}</code>
                            ) : (
                                <pre className="markdown-block">{children}</pre>
                            ),
                        math: ({value}) => (
                            <span className="math-block">
                                <span className="katex-display">{'$$' + value + '$$'}</span>
                            </span>
                        ),
                        inlineMath: ({value}) => (
                            <span className="math-inline">{'$' + value + '$'}</span>
                        ),
                        strong: ({children}) => (
                            <strong className="markdown-bold">{children}</strong>
                        ),
                        h1: ({children}) => (
                            <h1 className="markdown-h1">{children}</h1>
                        ),
                        h2: ({children}) => (
                            <h2 className="markdown-h2">{children}</h2>
                        ),
                        h3: ({children}) => (
                            <h3 className="markdown-h3">{children}</h3>
                        )
                    }}
                />
                )}

            </div>
        </div>
    );
};

export default PaperBreakdown;