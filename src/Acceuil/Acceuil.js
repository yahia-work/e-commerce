import "./Acceuil.css"
import { useState, useEffect } from 'react';
import { ReadFromSheet } from '../backend manager/ReadFromSheet';
import SelectCheck from "../components/SelectCheck";
import Products from "../Products/Products";
import AutocompleteSelect from '../components/Autocomplet';

import images from '../images/images';

function Acceuil(){
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
    


    const [filterSelected,setfilterSelected] = useState("Tous");
    
    if (loading) return <div style={{padding:"20px"}}>Loading data...</div>;
    if (error) return <div style={{padding:"20px"}}>Verifier votre connexion s'il vous plait</div>;

    return(
        <div className="acceuil flex">
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
            </div>
            <div className="container-products flex">
                <div className="header-acceuil-filter flex" >
                    <h3 style={{fontFamily: "cursive"}} >
                        Y_STORE35 Collection
                    </h3>
                    <AutocompleteSelect     
                        label={"Filter"} 
                        value={filterSelected} 
                        setValue={setfilterSelected}
                        options={["Tous","Abaya","Robe","Ensemble"]}   
                        className="filter-autocomplet"
                    /> 
                </div>
                
                <Products products={produits}/>
            </div>
        </div>
    )
}

export default Acceuil;