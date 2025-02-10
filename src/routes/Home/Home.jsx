   // src/routes/Home.jsx
   import React from 'react';
   import './Home.css';
   

   export default function Home() {

       return(
        <div className='about-container'>
            <div className='bio'>
                <div className='bio-img'>
                    <img src='\src\assets\bio-image.jpg'style={{ width: '200px', height: 'auto' }} />
                </div>
                <div className='bio-text'>
                <p>
                    I’m an AI enthusiast, aspiring researcher, and lifelong learner, constantly exploring the latest advancements in artificial intelligence and experimenting with cutting-edge technologies. With over <strong>8.5 years of experience</strong> working with MNCs, a Big Four consulting firm, and a Google subsidiary, I specialize in developing enterprise-wide AI solutions, ensuring they are scalable, efficient, and impactful.
                </p>
                <p> 
                    My academic journey began with a <strong>B.Tech in Electrical Engineering</strong>, and I’m currently pursuing a <strong>Master’s in Artificial Intelligence</strong> from IU, Germany. Mathematics has always been my greatest fascination—my favorite subject and a lens through which I wish to understand the world. I dream of breaking down every phenomenon into equations, uncovering the elegant logic behind nature, technology, and human behavior.
                </p>
    <p>
        Beyond AI and math, literature is my creative escape. I love writing poetry and short stories, and my passion for books 
        drives my dream of building a vast personal library—an ever-growing repository of knowledge and inspiration.
    </p>
    <p>
        Through my work, writing, and research, I aim to bridge the gap between AI innovation and real-world applications, 
        all while seeking beauty in numbers and storytelling.
    </p>
    <p><strong>Join me in discussing AI, math, and literature—I’d love to hear your thoughts!</strong></p>
    <div className="social-links">
        <a href="mailto:shristigautam13@gmail.com" className="email" target="_blank">
            <img src="\src\assets\email_icon.svg" alt="Email" width="30" height="30"/>
        </a>
        <a href="https://www.linkedin.com/in/shristigautam/" target="_blank">
           <img src="\src\assets\linkedin_icon.svg" alt="LinkedIn" width="30" height="30"/>
        </a>
        <a href="https://github.com/shris-ai" className="github" target="_blank">
            <img src="\src\assets\github_icon.svg" alt="Github" width="30" height="30"/>
        </a>
    </div>
                </div>
            </div>
        </div>
       )
   }