import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../layout/Navbar';


function Template(props) {
    return (
        <div className="flex-container">
            <div className="leftPanel">
                <div className="frame">

                </div>
            </div>
            <div className="rightPanel">
                <div className="navDiv">
                    <Navbar />

                </div>

            </div>

        </div>
    )
}

Template.propTypes = {

}

export default Template

