import React from "react";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    //function to check state for username
    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    //function to check state for email
    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    //function to check state for password
    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    //function checking for details submitted
    onSubmitRegister = (e) => {
        //prevent form cancel
        e.preventDefault();
        
        //fetch signin endpoint to post server
        //second parameter is the object defining request
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user){
                //loading the user
                this.props.loadUser(user);
                //changing route on successful sign in
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        return(
            <article className="br3 ba b--black-20 mv4 w-100 w-50-m w-25-l mw10 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                            <input
                            onChange={this.onUsernameChange}  
                            className="pa2 input-reset b--black-30 ba bg-transparent hover-bg-black hover-white w-100" 
                            type="name" name="name"  id="name"/>
                        </div>
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
                        onClick={this.onSubmitRegister} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"
                        />
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;