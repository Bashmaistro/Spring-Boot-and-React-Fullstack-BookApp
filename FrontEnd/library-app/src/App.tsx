
import './App.css';
import { Carousel } from './layouts/HomePage/Carousel';
import { ExploreTopbooks } from './layouts/HomePage/ExploreTopBooks';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';

function App() {
  return (
  <div>
    <Navbar/>
    <ExploreTopbooks/>
    <Carousel/>

  </div>
    
  );
}

export default App;
