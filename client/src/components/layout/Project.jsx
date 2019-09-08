import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Spinner from './Spinner';
import {getGithub} from '../../actions/github';


function Project({user, getGithub, repos}) {

    useEffect(() => {
        loadUser();
        getGithub();
    },[getGithub])

    // let projects = [
    //     "scrabble game", 
    //     "Alarm-Utility",
    //     "kanso",
    //     "class registration",
    //     "Expense",
    //     "resume",
    //     "laravel", 
    //     "English-Dictionary",
    //     "web", 
    //     "mytodolist"
    // ]

    let i = -1;

    let name = [
        "Class Registration",
        "Scrabble Board Game"
    ]

    let link =  [
        "https://github.com/Sokthai/Database/tree/master/project",
        "https://github.com/Sokthai/GUI/tree/master/hw9"
    ]
    return (
        <Fragment>
            {console.log(user)}
        {(!user || !user.user || !repos || !repos.payload )? <Spinner/> :
            
            <div className="bottomPanel">
                <div className="flex-container">
                    <div className="leftPanel"></div>
                    <div className="rightPanel">
                        <div className="navDiv">

                            <div className="resume">
                                <h1 className="header">Academic Courses</h1>
                                <div className="resumeContent">

                                    <div className="course">
                                        <h3 className="sectionTitle">Project</h3>
                                        <ul className="blockList">
                                            {user.user.map((item) => (
                                            item.project.map((projs) => (
                                            projs.project.map(proj => (
                                            <li key={proj._id} className="courseList">
                                                <div className="sectionInfo">
                                                    <div className="blockSection">
                                                        <div className="projlogo">
                                                            <img src={require(`../media/${proj.icon}`)} className="logo" />
                                                            <div className="projectDesc">
                                                            <i className="noway">{ i =  (repos.payload.findIndex(repo => (repo.name == proj.name)) )}</i>
                                                                <h4 className="blockTitle">
                                                                        {
                                                                            i >= 0? 
                                                                                <a
                                                                                    href={repos.payload[i].html_url}
                                                                                    className="projLink" target="_blank"
                                                                                    rel="noopener noreferrer">{proj.name}
                                                                                </a>
                                                                                :
                                                                                
                                                                                (name.indexOf(proj.name) >= 0)? 
                                                                                    <a
                                                                                        href={link[name.indexOf(proj.name)]}
                                                                                        className="projLink" target="_blank"
                                                                                        rel="noopener noreferrer">{proj.name}
                                                                                    </a>
                                                                                    :
                                                                                    <i  className="projLink">
                                                                                        {proj.name}
                                                                                    </i>

                                                                        }
                                                                      
                                                                </h4>
                                                                <h6 className="blockName">{proj.course? proj.course :
                                                                    "Personal"}</h6>
                                                            </div>
                                                        </div>

                                                        <p className="blockDescription">{proj.description}</p>
                                                        <span className="code-lan">{proj.code}</span>
                                                    </div>

                                                </div>
                                            </li>
                                            ))
                                            ))
                                            ))}
                                        </ul>
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

Project.propTypes = {
    user: PropTypes.object.isRequired,
    repos: PropTypes.object.isRequired,
    getGithub: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth,
    repos: state.github
})

export default connect(mapStateToProps, {getGithub})(Project);

