import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img width='300px' height='auto' src={imageUrl} alt='test' />
      </div>
    </div>
  );
};

export default FaceRecognition;
