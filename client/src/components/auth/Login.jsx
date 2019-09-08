import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {login} from '../../actions/auth';



function Login({login}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = formData;
        login({email, password});
    }
    

    return (
        <Fragment>


            <form className="form" onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={e=> onChange(e)} required />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={e=> onChange(e)} required/>

                </div>
            
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

 
            
         
        
    </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}




export default connect(null, {login})(Login);

