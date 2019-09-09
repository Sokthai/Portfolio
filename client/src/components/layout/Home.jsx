import React from 'react'
import Structure from './Structure';



function component(){
    return (
        <div className="quote">
            <h2 className="bold">
                Hello,<br /><span>I Am Sokthai Tang</span>
            </h2>

            <p className="leader">
                Sokthai Tang is currently a Computer Science undergraduate student at UMass Lowell. 
                He has an Associate degree in CS from Middlesex community college.
                Currently, he is a senior student at UML and expect to graduate by the end of 2019.
                He is a currently a film production intern at Interlock Media. He is also a freelance web 
                developer.
                
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




