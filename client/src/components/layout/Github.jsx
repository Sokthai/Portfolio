import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getGithub} from '../../actions/github';
import Spinner from './Spinner';


function Github({getGithub, repos}) {

  

    function repositories({repos}){

        let githubs = [
            'FP1',
            'ps3a',
            'google-drive-racket',
            'in-class-hw6',
            'Laravel',
            'Dodger'
        ]

        let filterRepos = repos.payload.filter((repo) => {
            return repo.name !== githubs[githubs.indexOf(repo.name)];
        })

        return (

            filterRepos.map(repo => (
            <li key={repo.id} className="courseList">
                <div className="sectionInfo">
                    <div className="blockSection">
                        <div className="projlogo">
                            <img src={require(`../media/github.svg`)} alt=""
                                className="logo" />
                            <div className="projectDesc">
                                <h4 className="blockTitle">
                                    
                                    <a rel="noopener noreferrer"
                                        href={repo.html_url} className="projLink"
                                        target="_blank">{repo.name}
                                    </a>
                                </h4>
                                
                                <h6 className="blockName">{repo.course? repo.course : "Project"}</h6>
                            </div>
                        </div>
                        <p className="blockDescription">{repo.description}</p>
                    </div>
                </div>
            </li>
            ))
        )
    }





    useEffect(() => {
        getGithub()
    }, [getGithub])

    return (
        <Fragment>
            {/* {console.log(repos)} */}
        {(!repos || !repos.payload )? <Spinner/> :
            <div className="bottomPanel">
                <div className="flex-container">
                    <div className="leftPanel">

                    </div>
                    <div className="rightPanel">
                        <div className="navDiv">

                            <div className="resume">
                                <h1 className="header">Repositories</h1>
                                <div className="resumeContent">

                                    <div className="course">
                                        <h3 className="sectionTitle"><a href="https://github.com/Sokthai" className="github" target="blank">Sokthai</a></h3>
                                        <ul className="blockList">
                                            {repositories({repos})}
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

Github.propTypes = {
    repos: PropTypes.object.isRequired,
    getGithub: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    github: state.github,
    repos: state.github
})
export default connect(mapStateToProps, {getGithub})(Github);

