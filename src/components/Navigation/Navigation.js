import React from 'react';

const Navigation = ({ clearImage, onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        onClick={() => {
          onRouteChange('signin');
          clearImage();
        }}
        className='f3 link dim black underline pa3 pointer'
      >
        Sign out
      </p>
    </nav>
  ) : (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        onClick={() => onRouteChange('signin')}
        className='f3 link dim black underline pa3 pointer'
      >
        Sign in
      </p>

      <p
        onClick={() => onRouteChange('register')}
        className='f3 link dim black underline pa3 pointer'
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
