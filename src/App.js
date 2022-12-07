import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
// import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import ParticlesBg from 'particles-bg';
import MouseParticles from 'react-mouse-particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'ddedab0c5dd94e1589aebfe97f4fadff',
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    };
  }

  // componentDidMount() {
  //   fetch('http://localhost:8000')
  //     .then(response => response.json())
  //     .then(console.log)
  //     .catch(err => console.log(err));
  // }

  calculateFaceLocation = data => {
    const coordinates =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: coordinates.left_col * width,
      topRow: coordinates.top_row * height,
      rightCol: width - coordinates.right_col * width,
      bottomRow: height - coordinates.bottom_row * height,
    };
  };

  displayBox = box => {
    this.setState({ box });
  };

  clearImage = () => {
    this.setState({ imageURL: '' });
  };

  // triggered when input text change
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onImageSubmit = () => {
    this.setState({ imageURL: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response)
          fetch('http://localhost:8000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then(res => res.json())
            .then(count =>
              this.setState(Object.assign(this.state.user, { entries: count }))
            );
        this.displayBox(this.calculateFaceLocation(response));
      })
      .catch(err => alert('Unable to fetch url'));

    this.setState({ input: '' }, () => {
      console.log(this.state);
    });
  };

  onRouteChange = route => {
    if (route === 'home') this.setState({ isSignedIn: true });
    else if (route === 'signin' || route === 'register')
      this.setState({ isSignedIn: false });

    this.setState({ route });
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    const { isSignedIn, route, box, imageURL } = this.state;

    return (
      <div className='App'>
        {/* "color" "ball" "lines" "thick" "circle" "cobweb" "polygon" "square"
        "tadpole" "fountain" "random" "custom" */}
        <ParticlesBg type='cobweb' num={210} color='#ffffff' bg={true} />
        <MouseParticles g={1} color='random' cull='col,image-wrapper' />
        <Navigation
          clearImage={this.clearImage}
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              inputUrl={this.state.input}
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageURL} />
          </div>
        ) : route === 'signin' ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
