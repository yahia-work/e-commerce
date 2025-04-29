import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { PanierContext } from './Context/PanierContext';

function App() {
  const [Produits,setproducts]= useState([]);

  const handelDelete = (p) =>{
    setproducts(Produits.filter(product => product.id !== p.id || product.taille !== p.taille));
  }
  const handelAdd = (p) => {
    
    const productExists = Produits.find(
      product => product.id === p.id && product.taille === p.taille
    );

    if (productExists) {
     
      setproducts(
        Produits.map(product =>
          product.id === p.id && product.taille === p.taille
            ? { ...product, quantite: product.quantite + p.quantite }
            : product
        )
      );
    } else { 
      setproducts([...Produits, p]);
    }
  };
  
  return (
    <PanierContext.Provider value={{Produits,handelAdd,handelDelete}}>
      <div className="App">
        <Header />
        <div className="urgent flex">
                Livraison disponible 58 wilaya
        </div>
        <Outlet /> 
        <Footer />
      </div>
    </PanierContext.Provider>
  );
}

export default App;
