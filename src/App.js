import React, { useState } from 'react';
import './App.css';

//Components 
import Layout from './Components/Layout';
import Landing from './Components/Landing';

const App = () => {

  const [civicData, setCivicData] = useState()

  return (
    <div className="App">
      <Landing setCivicData={setCivicData} />
      <Layout civicData={civicData} />
    </div>
  );
}

export default App;
