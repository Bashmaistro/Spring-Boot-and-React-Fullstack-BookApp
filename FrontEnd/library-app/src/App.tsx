
import './App.css';
import { Carousel } from './layouts/HomePage/Carousel';
import { ExploreTopbooks } from './layouts/HomePage/ExploreTopBooks';
import { Heros } from './layouts/HomePage/Heros';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';

function App() {
  return (
  <div>
    <Navbar/>
    <ExploreTopbooks/>
    <Carousel/>
    <Heros/>

  </div>
    
  );
}

export default App;
