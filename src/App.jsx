import { BrowserRouter, Route, Link ,Routes} from 'react-router-dom';
import ShowList from './showsList';
import Navbar from './navbar';
import Home from './Home';
import ShowDetail from './ShowDetail';
import SeasonDetail from './SeasonDetail'

function  App (){
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/ShowDetail" element={<ShowDetail />} />
        <Route path="/SeasonDetail/:id" element={<SeasonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;