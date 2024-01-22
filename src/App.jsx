import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Artista from './pages/Artista/Artista';
import Album from './pages/Album/Album';
import Contato from './pages/Contato/Contato';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/artista/:id' element={<Artista /> } />
          <Route path='/albums/:id' element={<Album />} />
          <Route path='/contato' element={<Contato />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
