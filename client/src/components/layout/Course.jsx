import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Spinner from './Spinner';


function component({user}){
    return (
        <div className="resume">
            <h1 className="header">Academic Courses</h1>
            <div className="resumeContent">
                <div className="course">
                    <h3 className="sectionTitle">Course</h3>
                    <ul className="blockList">
                        {user.user.map((item) => (
                            item.course.map((crs) => (
                            <li key={crs._id} className="courseList">
                                <div className="sectionInfo">
                                    <div className="blockSection">
                                        <h4 className="blockTitle">{crs.name}</h4>
                                        <h6 className="blockName">{crs.school}</h6>
                                        <p className="blockDescription">{crs.description}</p>
                                    </div>
                                </div>
                            </li>
                            ))
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}




function Course({user}) {

    useEffect(() => {
        loadUser();
    },[])

    return (
        <Fragment>
            {(!user || !user.user )? <Spinner/> : 
                <div className="bottomPanel">
                    <div className="flex-container">
                        <div className="leftPanel"/>
                        <div className="rightPanel">
                            <div className="navDiv">
                                {component({user})}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

Course.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth
})

export default connect(mapStateToProps)(Course);

