import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Spinner from './Spinner';
import Structure from './Structure';



function component({user}){
    return (
        <div className="quote">
            <h1 className="header">About Me</h1>
            <p className="leader">
            I am ambitious, driven, and passionate about learning and building my skillset to become a
            better developer. I constantly set goals so that I am always challenging myself to become a
            better version of myself. Because of my passion for building software, I have a steady source
            of self-motivation. Also, I love to learn and teach myself new skills and techniques to add to
            my tool-set. For example, during Summer of 2019, I taught myself ReactJs and added it to
            some existing projects.
            </p>
            {user.user.map((item, index) => (
            <ul key={`ul${index}`} className="contact">
                <li key={`name${index}`}><span className="contactField">Name : </span><span
                        className="contactInfo">{`${item.user.firstname} ${item.user.lastname}`}</span></li>
                <li key={`phone${index}`}><span className="contactField">Phone : </span><span
                        className="contactInfo">{`(${item.user.phone.substring(0, 3)})-${item.user.phone.substring(3,
                        6)}-${item.user.phone.substring(6, 10)}`}</span></li>
                <li key={`nationality${index}`}><span className="contactField">Nationality : </span><span
                        className="contactInfo">{`${item.user.nationality}`}</span></li>
                <li key={`email${index}`}><span className="contactField">Email : </span><span
                        className="contactInfo email">{`${item.user.email}`}</span></li>
            </ul>
            ))}
        </div>
    )
}


function About({user}) {

    useEffect(() => {
        loadUser();
    },[])

    return (
        <Fragment>
            {(!user || !user.user)? <Spinner/> :
                <Structure value={component({user})} />
            }
        </Fragment>
    )
}






About.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth
})
export default connect(mapStateToProps)(About);

