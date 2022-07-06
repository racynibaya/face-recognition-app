import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import particleOptions from './components/Config/particlesConfig';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  onInputChange(event) {
    console.log(event.target.value);
  }

  onButtonSubmit(url) {
    console.log('Click');

    // app.models.predict('ddedab0c5dd94e1589aebfe97f4fadff', url);
  }

  render() {
    return (
      <div className='App'>
        <Particles params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />

        {/*
        <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
