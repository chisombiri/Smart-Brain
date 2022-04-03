import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn) {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className="f4 br4 bg-light-purple white mt2 mr2 link dim black pa2 ba b--white pointer">Sign Out</p>
                </nav>
            )
        } else{
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className="f4 br4 bg-light-purple white mt2 mr2 link dim black pa2 ba b--white pointer">Sign In</p>
                    <p onClick={() => onRouteChange('register')} className="f4 br4 bg-light-purple white mt2 mr2 link dim black pa2 ba b--white pointer">Register</p>
                </nav>
            );
        }
}

export default Navigation;