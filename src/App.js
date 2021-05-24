import React from 'react';

import Routes from './routes';
import './App.css';

// import AddToHomescreen from 'react-add-to-homescreen';

function App() {
  //! Add this functionlity when PWA is desired
  // function handleAddToHomescreenClick() {
  //   alert(`
  //     1. Open Share menu
  //     2. Tap on "Add to Home Screen" button`);
  // }

  return (
    <div className="App">
      {/* <AddToHomescreen onAddToHomescreenClick={handleAddToHomescreenClick()} /> */}
      <Routes />
    </div>
  );
}

export default App;
