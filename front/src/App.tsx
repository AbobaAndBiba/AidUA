import React from 'react';
import Preview from "./components/sections/preview/preview";
import "./style/app.sass";
import Header from "./components/sections/header/header";
import HowToTake from "./components/sections/howToTake/howToTake";
import Mission from "./components/sections/mission/mission";
import Footer from "./components/sections/footer/footer";
import Copyright from "./components/sections/copyright/copyright";
import PickUpPoints from "./components/sections/map/pickUpPoints";
import News from "./components/sections/news/news";

const App = () => {
  return (
    <div className='app'>
      <Preview/>
      <Header/>
      <HowToTake/>
      <News/>
      <PickUpPoints/>
      <Mission/>
      <Footer/>
      <Copyright/>
    </div>
    );
};

export default App;