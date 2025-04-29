import { useState, useRef,useEffect  } from "react";
import React from 'react';
import "./Boutique.css";
import { IoIosArrowUp } from "react-icons/io";
import Checkbox from '@mui/material/Checkbox';
import SelectCheck from "../components/SelectCheck";
import { IoFilter } from "react-icons/io5";
import { GoX } from "react-icons/go";
import { ReadFromSheet } from '../backend manager/ReadFromSheet';

import Products from "../Products/Products";


import images from '../images/images';

// const products = [
//     {
//         id:1,
//         name:"Robe Farawla",
//         model:"Robe",
//         price:2900,
//         img:productImg8,
//         description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     },
//     {
//         id:2,
//         name:"Robe Talline",
//         model:"Robe",
//         price:2900,
//         img:productImg9,
//         description:"La robe Talline est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     },
//     {
//         id:3,
//         name:"Robe Disney",
//         model:"Robe",
//         price:2900,
//         img:productImg10,
//         description:"La robe Disney est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     },
//     {
//         id:4,
//         name:"Robe Farawla",
//         model:"Robe",
//         price:2900,
//         img:productImg12,
//         description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     },
//     {
//         id:5,
//         name:"Robe Farawla",
//         model:"Robe",
//         price:2900,
//         img:productImg11,
//         description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     },
//     {
//         id:6,
//         name:"Abaya classique",
//         model:"Abaya",
//         price:2900,
//         img:productImg14,
//         description:"Abaya classique est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     },
//     {
//         id:7,
//         name:"Robe Farawla",
//         model:"Robe",
//         price:2900,
//         img:productImg1,
//         description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     }
//     ,
//     {
//         id:8,
//         name:"Robe Farawla",
//         model:"Robe",
//         price:2900,
//         img:productImg13,
//         description:"La robe Farawla est confectionnée en tissu Mazirati de haute qualité, offrant confort et élégance. C'est la pièce idéale pour toutes les occasions, alliant style et durabilité."
//     }
// ]

function Boutique() {
    const [filterSelected,setfilterSelected] = useState("Tri par default");

    
    const Config = ({className=""})=>{
       
        return(
            <div className={className}>
                {/* Categorie */}
                <div className="item-config flex pointer">
                    Categorie
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                        Abaya
                    </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    Robe
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    Ensemble
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    Chemise
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    Burkini
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    tokem salat
                </div>

                {/* Prix */}
                <div className="item-config categorie-config flex pointer">
                    Prix
                </div>
                <div className='categorie-config flex'>
                        <Checkbox />
                        0-2.000 DZD
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    2.000 DZD - 3.000 DZD
                    
                </div>
                <div className='categorie-config flex'>
                    <Checkbox />
                    3.000 DZD - 4.000 DZD
                </div>
            </div>
        )
    }

    const [filterStatus,setfilterStatus] = useState(false);

    useEffect(() => {
        if (filterStatus ) {
            document.body.style.backgroundColor = "rgba(92, 92, 92, 0.5)"; 
        } else {
            document.body.style.backgroundColor = ""; 
        }

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [filterStatus]);

   
    const [produits, setproduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await ReadFromSheet({
                    sheet: "produits",
                    filter: {}
                });
    
                const cleanedData = (data || [])
                    .map(item => {
                        const model = item.Model?.trim();
                        const couleur = item.couleur?.trim();
                        const name = `${model} ${couleur}`.toLowerCase();

                        const stock = Number(item.stock);
                        const price = Number(item.price);
                        const imageName = item.image?.trim();

                        if (
                            !model || !couleur || !item.description ||
                            isNaN(stock) || isNaN(price) ||
                            stock < 0 || price < 0
                        ) return null;

                        return {
                            name,
                            model,
                            price,
                            stock,
                            description: item.description.trim(),
                            img: images[imageName] || null
                        };
                    })
                    .filter(item => item !== null);

    
                setproduits(cleanedData);
                setError(null);
                console.log(cleanedData);
    
            } catch (error) {
                console.error("Erreur:", error.message);
                setError(error.message);
                setproduits([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    if (loading) return <div style={{padding:"20px"}}>Loading data...</div>;
    if (error) return <div style={{padding:"20px"}}>Verifier votre connexion s'il vous plait</div>;
    
    return (
        <div className="Boutique flex">
            <div className="header-acceuil">
                <div className="essentiel-infos flex pointer">
                    <img src={images["livraison.png"]} width={50} className="livraison-img"/>
                    <div className="essentiel-infos-1">
                        <p>LIVRAISON</p>
                        <div style={{color:"rgb(151, 151, 151)"}}>Disponible 58 wilaya</div>
                    </div>
                </div>
                <div className="essentiel-infos flex pointer">
                    <img src={images["payment.png"]} width={50} className="payment-img"/>
                    <div className="essentiel-infos-1">
                        <p>PAIMENT</p>
                        <div style={{color:"rgb(151, 151, 151)"}}>Paiment main a main</div>
                    </div>
                </div>
                <div className="essentiel-infos flex pointer">
                    <img src={images["styles.png"]} width={50} className="styles-img"/>
                    <div className="essentiel-infos-1">
                        <p>DIFFERENTS STYLES</p>
                        <div style={{color:"rgb(151, 151, 151)"}}>On a tout ce dont vous avez besoin</div>
                    </div>
                </div>
            </div>
            <h3 style={{fontFamily: "cursive"}} >
                Y_STORE35
            </h3>
            {/* <Config className="configuration flex"/> */}
            <div className="models flex">
                <div className="header-models flex">
                    <div>
                        <h2>Boutique</h2>
                        <div className="path flex">
                            <div className="pointer">Acceuil</div>&nbsp; &gt; &nbsp;Boutique
                        </div>
                    </div>
                    <SelectCheck    label={"Filter"}
                                    value={filterSelected}
                                    setvalue={setfilterSelected}
                                    list={["Tri par default","Tri par popularite","Tri par tarif croissante","Tri par tarif decroissante"]}
                                    style={{width:"25%",mt:"25px"}}
                                    className="select-filter"
                    />
                    <div className="filter pointer" onClick={()=>setfilterStatus(true)}>
                        <IoFilter/> Filter
                    </div>
                    {
                        <div className={`panier-shop ${filterStatus ? 'open' : 'close'}`}>
                            <div className="header-panier-shop flex">
                                <div></div>
                                <h3>Filter Par</h3>
                                <GoX className="exit-shop pointer" onClick={()=>setfilterStatus(false)}/>
                            </div>
                            <Config className="panier-configuration flex"/>
                        </div>
                    }
                </div>
                <Products products={produits}/>
            </div>
        </div>
    );
}

export default Boutique;
