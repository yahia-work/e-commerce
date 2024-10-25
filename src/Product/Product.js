import "./Product.css";
import React, { useEffect, useState,useContext } from 'react';
import {  useLocation } from 'react-router-dom';
import QuantityInput from "../components/NumberInput";
import Button from '@mui/material/Button';
import { PanierContext } from '../Context/PanierContext'; 
import { Link } from 'react-router-dom';

import productImg1 from "../images/productImg1.jpg"
import productImg8 from "../images/productImg8.jpg"
import productImg9 from "../images/productImg9.jpg"
import productImg10 from "../images/productImg10.jpg"
import productImg11 from "../images/productImg11.jpg"
import productImg12 from "../images/productImg12.jpg"
import productImg13 from "../images/productImg13.jpg"
import productImg14 from "../images/productImg14.jpg"
import productImg15 from "../images/productImg15.jpg"

import Products from "../Products/Products"; 

const products = [
    {
        id:1,
        name:"Robe Farawla",
        model:"Robe",
        price:2900,
        img:productImg8,
        description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    },
    {
        id:2,
        name:"Robe Talline",
        model:"Robe",
        price:2900,
        img:productImg9,
        description:"La robe Talline est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    },
    {
        id:3,
        name:"Robe Disney",
        model:"Robe",
        price:2900,
        img:productImg10,
        description:"La robe Disney est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    },
    {
        id:4,
        name:"Robe Farawla",
        model:"Robe",
        price:2900,
        img:productImg12,
        description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    },
    {
        id:5,
        name:"Robe Farawla",
        model:"Robe",
        price:2900,
        img:productImg11,
        description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    },
    {
        id:6,
        name:"Abaya classique",
        model:"Abaya",
        price:2900,
        img:productImg14,
        description:"Abaya classique est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    },
    {
        id:7,
        name:"Robe Farawla",
        model:"Robe",
        price:2900,
        img:productImg1,
        description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    }
    ,
    {
        id:8,
        name:"Robe Farawla",
        model:"Robe",
        price:2900,
        img:productImg13,
        description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
    }
]

function Product() {  
    const location = useLocation();      
    const { product } = location.state;
    const [tailleSelected, settailleSelected] = useState("");
    const [quantity, setQuantity] = useState(1); 

    const TailleItem = ({ taille, index, tailleSelected, settailleSelected }) => {
        const [isHovered, setisHovered] = useState(false);
        const isClicked = taille === tailleSelected;

        const handelClick = async () => {
            settailleSelected(taille); 
        }

        return (
            <div key={index}
                className={`squar pointer ${isHovered ? "squarHovered" : ""} ${isClicked ? "squarClicked" : ""}`}
                onMouseEnter={() => setisHovered(true)} 
                onMouseLeave={() => setisHovered(false)}
                onClick={handelClick}
            >
                {taille}
            </div>
        )
    }
    const [listProd,setlistProd] = useState([])
    useEffect(()=>{
        let list = []
        products.map((item,index)=>{
            if(item.model == product.model){
                list.push(item);
            }
        })
        setlistProd(list);
    },[products]);

    useEffect(() => {
        window.scrollTo(0, 0);
        settailleSelected("");
        setQuantity(1)
    }, [product]);

    const {Produits,handelAdd} = useContext(PanierContext);
    const addProduct = (p, q,t) => {
        if(t.length>0){
            handelAdd({ ...p, quantite: q,taille:t });    
        }
        else alert("selectionner la taille")
    };
    return (
        <div className="product flex">
            <div className="cmnd-product flex">
                <img src={product.img} className="product-details-img" alt={product.name} /> 
                <div className="product-details flex">
                    <div className="caracteristiques flex">
                        <div className="product-model">{product.model} </div>
                        <div>{product.name} </div> 
                        <div className="">{product.price}DZD </div>
                    </div>
                    <div className="description-detaille">
                        {product.description}
                    </div>
                    <div>
                        Taille
                    </div>
                    <div className="list-detaille flex">
                        {
                            ["36", "38", "40", "42","44","46","48"].map((item, index) => {
                                return (
                                    <TailleItem 
                                        key={index}
                                        taille={item} 
                                        index={index}
                                        tailleSelected={tailleSelected}
                                        settailleSelected={settailleSelected}
                                    />
                                )
                            })
                        }
                    </div>
                    <QuantityInput value={quantity} onChange={setQuantity} />
                    <Button style={{backgroundColor:"black"}}
                            variant="contained"
                            className="ajouter-au-panier"
                            onClick={()=>addProduct(product,quantity,tailleSelected)}
                    >
                        Ajouter au panier
                    </Button>
                    
                </div>
            </div>
            <div className="other-product flex">
                <div className="other-product-title flex">
                    <strong>Autre couleurs</strong>
                </div>
                {
                    listProd && <Products products={listProd}/>
                }
            </div>
        </div>
    )
}

export default Product;
