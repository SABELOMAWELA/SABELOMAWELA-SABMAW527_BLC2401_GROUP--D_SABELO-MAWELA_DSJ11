import { BrowserRouter, Route, Link ,Routes} from 'react-router-dom';
import ShowList from './showsList';
import Navbar from './navbar';

function  App (){
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={""} />
        <Route path="/shows" element={<ShowList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;