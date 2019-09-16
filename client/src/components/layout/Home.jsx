import React from 'react'
import Structure from './Structure';



function component(){
    return (
        <div className="quote">
            <h2 className="bold">
                Hello,<br /><span>My name is Sokthai Tang</span>
            </h2>

            <p className="leader">       
                I’m currently a student at the University of Massachusetts Lowell studying Computer Science.
                I received my Associates of Science degree for Computer Science at Middlesex Community
                College. I’m currently a senior and expect to graduate May 2020. I am currently a web developer 
                intern for a film production at Interlock Media and a freelance web developer.
            </p>
            {/* <button className="download" onClick={() => savePDF()}>Download</button> */}
            <a href={require('../media/Resume.pdf')} className="download" download="Sokthai_Tang"><span>Download Resume</span></a>
        </div>
    )
}




export default function Home() {
    return (
        <Structure value={component()}/>
    )
}



