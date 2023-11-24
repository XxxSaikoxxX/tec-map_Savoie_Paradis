import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Me from './pages/Me';
import AddFriends from './pages/AddFriends';
import Friends from './pages/Friends';
import UpdateMe from './pages/UpdateMe';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Me' element={<Me />} />
        <Route path='/AddFriends' element={<AddFriends />} />
        <Route path='/Friends' element={<Friends />} />
        <Route path='/UpdateMe' element={<UpdateMe />} />
        <Route path='/Register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
