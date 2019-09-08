import React, { Fragment } from 'react'

export default function Strcuture(props) {
    return (
           
        <Fragment>
            <div className="bottomPanel">
                <div className="flex-container">
                    <div className="leftPanel">
                        {/* <div className="frame">
                            <img src={require("../media/pic.jpg")} alt="" className="pic"/>
                        </div>     */}
                    </div>
                    
                    <div className="rightPanel">
                        <div className="allContent">
                            <div className="myFrame">
                                    <img src={require("../media/pic.jpg")} alt="" className="pic"/>
                            </div>  
                            <div className="myNavDiv">
                                    {props.value}
                            </div>
                        </div>
                    </div>
                    
                </div>
                        
                {/* <div className="allContent">
                    <div className="myFrame">
                            <img src={require("../media/pic.jpg")} alt="" className="pic"/>
                    </div>  
                    <div className="myNavDiv">
    
                            {props.value}
                            
                    </div>
                </div> */}
           </div>
        </Fragment>
    
    )
}




