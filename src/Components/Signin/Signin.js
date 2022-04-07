import React from "react";

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    //function to check state for email
    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value});
    }

    //function to check state for password
    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value});
    }

    //function checking for details submitted
    onSubmitSignIn = (e) => {
        //prevent form cancel
        e.preventDefault();
        
        //fetch signin endpoint to post server
        //second parameter is the object defining request
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.id){
                //loading the user
                this.props.loadUser(user);
                //changing route on successful sign in
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        //destructuring to get the onRouteChange prop
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba b--black-20 mv4 w-100 w-50-m w-25-l mw10 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                            onChange={this.onEmailChange} 
                            className="pa2 input-reset b--black-30 ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            onChange={this.onPasswordChange} 
                            className="b pa2 input-reset b--black-30 ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                        // the arrow function ensures the function is called on click
                        onClick={this.onSubmitSignIn} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')}  className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }  
}

export default Signin;