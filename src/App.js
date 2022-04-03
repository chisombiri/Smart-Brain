import React from 'react';
import Particles from 'react-tsparticles';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import InputForm from './Components/InputForm/InputForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register.js';
import Rank from './Components/Rank/Rank';
import './App.css';
 

const particlesOptions = {
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.5,
      },
    },
  },

  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 160,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 100,
    },
    opacity: {
      value: 0.3,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (e) => {
    console.log(e.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false});
    } else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render() {
    // destructuring to avoid using this.state all through
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* Routing */}
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <InputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition />
            </div>
          : (
            this.state.route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange}/> 
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
