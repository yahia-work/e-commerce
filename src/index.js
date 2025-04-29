import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Acceuil from './Acceuil/Acceuil';
import Boutique from './Boutique/Boutique';
import Apropre from './Aproprs/Apropre';
import Faq from './Faq/Faq';
import Contact from './Contact/Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './Product/Product'; 
import ValiderCommande from './ValiderCommande/ValiderCommande';
import Livraison from './Livraison/Livraison';
import Prix from './Livraison/Prix/Prix';
import Bureaux from './Livraison/Bureaux/Bureaux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Acceuil />} />
        <Route path="boutique" element={<Boutique />} />
        <Route path="boutique/produit/:productName" element={<Product />} />
        <Route path="apropre" element={<Apropre />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="valider-commandes" element={<ValiderCommande/>} />
        <Route path='livraison' element={<Livraison/>}>
          <Route index element={<Prix/>} />
          <Route path='bureaux' element={<Bureaux/>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
