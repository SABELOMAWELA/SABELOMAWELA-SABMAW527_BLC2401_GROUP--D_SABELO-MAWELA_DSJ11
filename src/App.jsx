import { BrowserRouter, Route, Link ,Routes} from 'react-router-dom';
import ShowList from './showsList';
import Navbar from './navbar';
import Home from './Home';

function  App (){
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/shows" element={<ShowList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;