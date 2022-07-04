import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div
      className=' ma4 mt0 pa3 pointer'
      style={{ display: 'flex', justifyContent: 'flex-start' }}
    >
      <Tilt className='Tilt  br2 shadow-2'>
        <div
          className='pa3'
          style={{
            height: '150px',
            width: '150px',
          }}
        >
          <img className='pt2' alt='brain logo' src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
