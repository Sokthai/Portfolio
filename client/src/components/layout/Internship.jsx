import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Spinner from './Spinner';
import Moment from 'react-moment';

function Internship({user}) {

    useEffect(() => {
        loadUser();
    },[])

    return (
        <Fragment>
            {/* {console.log(user)} */}
        {(!user || !user.user )? <Spinner/> :
            <div className="bottomPanel">
                <div className="flex-container">
                    <div className="leftPanel"></div>
                    <div className="rightPanel">
                        <div className="navDiv">

                            <div className="resume">
                                <h1 className="header">Intern</h1>
                                <div className="resumeContent">

                                    <div className="course">
                                        <h3 className="sectionTitle">Company</h3>
                                        <ul className="blockList">
                                            {user.user.map((item) => (
                                            item.internship.map((intern) => (

                                            <li key={intern._id} className="internList">
                                                <div className="sectionInfo">
                                                    <div className="blockSection">
                                                        <div className="projlogo">
                                                            <img src={require(`../media/${intern.logo}`)}
                                                                alt="" className="logo" />
                                                            <div className="projectDesc">
                                                                <h4 className="blockTitle">
                                                                    {intern.company}
                                                                    <span className="jobDuration">
                                                                        <Moment format="MM/YYYY  - ">
                                                                            {intern.from}</Moment>
                                                                        {intern.current? "Present" : <Moment
                                                                            format="MM/YYYY">{intern.to}
                                                                        </Moment>}
                                                                    </span>
                                                                </h4>
                                                                <h6 className="jobTitle">
                                                                    {intern.title}
                                                                </h6>
                                                            </div>
                                                        </div>

                                                        <p className="blockDescription">{intern.description}
                                                        </p>
                                                        <span className="code-lan">{intern.location}</span>
                                                    </div>

                                                </div>
                                            </li>

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

Internship.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth,
})

export default connect(mapStateToProps)(Internship);

