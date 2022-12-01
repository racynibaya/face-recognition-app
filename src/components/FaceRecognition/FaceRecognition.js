import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  let state = 'visible';
  if (imageUrl.length <= 0) {
    state = 'hidden';
  }
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputimage'
          style={{
            visibility: state,
            position: 'relative',
            width: '20rem',
            height: 'auto',
          }}
          width='500px'
          height='auto'
          src={imageUrl}
          alt='test'
        />

        <div
          className='bounding-box'
          style={{
            position: 'absolute',
            top: box.topRow,
            left: box.leftCol,
            right: box.rightCol,
            bottom: box.bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
