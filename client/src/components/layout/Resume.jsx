import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Spinner from './Spinner';
import {scrollfunc} from '../../utility/script';





function education({education}){
    return (
        <div className="education">
            <h3 className="sectionTitle">Education</h3>
            <ul className="blockList">
                    {education.map((edu, eIndex) => (
                        <li key={`block${eIndex}`}>
                            <div className="sectionInfo">
                                <span></span>
                                <div className="blockSection">
                                    <h4 className="blockTitle">{edu.degree}</h4>
                                    <h6 className="blockName">{edu.school}</h6>
                                    <p className="blockDescription">{edu.description}</p>
                                </div>
                                <span className="number">
                                    <p className="before">{edu.from.substring(0,7)}</p>

                                    <p className="after">{edu.current? "Present" : edu.to.substring(0, 7)}</p>
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

function experience({experience}){
    return (
        <div className="experience">
            <h3 className="sectionTitle">Experience</h3>
            <ul className="blockList">
                {experience.map((exp, eIndex) => (
                    <li key={`block${eIndex}`}>
                        <div className="sectionInfo">
                            <span></span>
                            <div className="blockSection">
                                <h4 className="blockTitle">{exp.title}</h4>
                                <h6 className="blockName">{exp.company}</h6>
                                <p className="blockDescription">{exp.description}</p>
                            </div>
                            <span className="number">
                                <p className="before">{exp.from.substring(0,7)}</p>

                                <p className="after">{exp.current? "Present" : exp.to.substring(0, 7)}</p>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}


function skill({languages, skill, level = ""}){
    // let lan ;
    return (
            <Fragment>
            <h3 className="sectionTitle">{skill}</h3>
            
                {languages.map((speak, sIndex) => (
                    <div key={`skill${sIndex}`} className="progress-bar-block">
                        <div className="progress-bar-text-block">
                            {/* <span className="progress-bar-text" onClick={()=> move()}>{speak}</span> */}
                            <span className="progress-bar-text">{speak}</span>
                            {/* <span className="percentage"><span className="percent">100</span>/100</span> */}
                        </div>

                        <div className="progress-bar-background">
                         
                            <div className={`progress-bar myBar${sIndex} ${speak.replace(" ", "")}`}></div>
                        </div>
                    </div>
                ))}
            
            </Fragment>

    )
}


function Resume({user}) {

    useEffect(() => {
        loadUser();
    },[])

    return (
        <Fragment>
            {(!user || !user.user )? <Spinner/> :
            <div className="bottomPanel">
                <div className="flex-container">
                    <div className="leftPanel">
                    
                    </div>
                    <div className="rightPanel">
                        <div className="navDiv">

                            <div className="resume" id="res" onScroll={()=> scrollfunc()}>
                                <h1 className="header">Resume</h1>
                                <div className="resumeContent">
                                    {education({ education: user.user[0].education })}
                                    {experience({ experience: user.user[0].experience })}
                                </div>
                                
                                <div className="skillBlock">
                                    <div className="lan" id="lantest">
                                        {skill({languages: user.user[0].skills.speakingLanguage, "skill" : "Language"})}
                                    </div>
                                    <div className="skill">
                                        {skill({languages: user.user[0].skills.programmingLanguage, "skill" : "Programming"})}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </Fragment>
    )
}


Resume.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth
})

export default connect(mapStateToProps)(Resume);

