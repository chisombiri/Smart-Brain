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

//API key from Clarifai.
// const app = new Clarifai.App({
//   apiKey: 'YOUR API KEY HERE'
//  });

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
      isSignedIn: false,
      user: {
        id: '',
        username: '',
        email: '',
        entries: 0, //will be used to track score of photo submissions
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState(
      {user: {
      id: data.id,
      username: data.name,
      email: data.email,
      entries: data.entries, //will be used to track score of photo submissions
      joined: data.joined
      }
    }
    )
  }

  //FUNCTION TO CALCULATE FACE LOCATION
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  //FUNCTION TO DISPLAY FACE BOX
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  //Testing if I can get data from backend
  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(res => res.json())
  //   .then(console.log)
  // }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  //DETECTING FACE ON SUBMIT OF IMAGE(DETECT BUTTON)
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL,
    //     this.state.input)
    //   .then(response => {
    //     console.log('hi', response)
    //     if (response) {
    //       fetch('http://localhost:3001/image', {
    //         method: 'put',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //           id: this.state.user.id
    //         })
    //       })
    //         .then(response => response.json())
    //         .then(count => {
    //           //updating user object
    //           this.setState(Object.assign(this.state.user, { entries: count }))
    //         })

    //     }
    //     this.displayFaceBox(this.calculateFaceLocation(response))
    //   })
    //   .catch(err => console.log(err));
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
              <Rank username={this.state.user.username} entries={this.state.user.entries}/>
              <InputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              {/* <FaceRecognition box={box} imageUrl={imageUrl}/> */}
            </div>
          : (
            this.state.route === 'signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
