
import './App.css';
import { Carousel } from './layouts/HomePage/Carousel';
import { ExploreTopbooks } from './layouts/HomePage/ExploreTopBooks';
import { Heros } from './layouts/HomePage/Heros';
import { LibraryServices } from './layouts/HomePage/LibraryServicex';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';

function App() {
  return (
  <div>
    <Navbar/>
    <ExploreTopbooks/>
    <Carousel/>
    <Heros/>
    <LibraryServices/>

  </div>
    
  );
}

export default App;
