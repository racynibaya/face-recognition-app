import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
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
    };
  }

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

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayBox(this.calculateFaceLocation(response)))
      .catch(err => console.error('Enter a valid URL', err.message));
  };

  onRouteChange = route => {
    this.setState({ route });
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBackground />
        <Navigation onRouteChange={this.onRouteChange} />

        {this.state.route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageURL}
            />
          </div>
        ) : this.state.route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
