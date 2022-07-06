import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import './App.css';

// const app = new Clarifai.App({
//   apiKey: 'ddedab0c5dd94e1589aebfe97f4fadff',
// });

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

  onButtonSubmit() {
    console.log('Click');

    // app.models
    //   .predict(
    //     'ddedab0c5dd94e1589aebfe97f4fadff',
    //     'https://unsplash.com/photos/J-JOGvnfgM8'
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .then(function (err) {
    //     console.log(err);
    //   });
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBackground />
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
