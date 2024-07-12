import { Carousel } from "./components/Carousel"
import { ExploreTopbooks } from "./components/ExploreTopBooks"
import { Heros } from "./components/Heros"
import { LibraryServices } from "./components/LibraryServicex"

export const HomePage = () => {
    return(
    
    <>
        <ExploreTopbooks/>
        <Carousel/>
        <Heros/>
        <LibraryServices/>
    </>
        
  )
}