
import { PanierContext } from '../Context/PanierContext';
import { useState, useEffect,useContext } from "react";
import { GoX } from "react-icons/go";
import SelectCheck from "../components/SelectCheck";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./CarteCommande.css"

function CarteCommande(){
    const [wilaya,setwilaya] = useState("wilaya")
    const [SoustotalPrice,setSoustotalPrice] = useState(0); 
    const [PriceT,setPriceT] = useState({bureau:0,domicile:0});
    const [frais,setfrais] = useState({bureau:0,domicile:0});
    const { Produits,handelDelete } = useContext(PanierContext);

    useEffect(() => { 
        const total = Produits.reduce((acc, product) => acc + product.price * product.quantite, 0);
        setSoustotalPrice(total);
        setPriceT({
            domicile: total + frais.domicile,
            bureau: total + frais.bureau
        });
    }, [Produits]);

    useEffect(()=>{
        if(wilaya != "wilaya"){
            //recuperer les frais de cette wilaya from data base 
            const newfrais  = {bureau:300,domicile:600};
            setfrais(newfrais);
        }
        else{
            setfrais({bureau:0,domicile:0});
        }
    },[wilaya]);

    useEffect(()=>{
        setPriceT({
            domicile:SoustotalPrice + frais.domicile,
            bureau:SoustotalPrice + frais.bureau
        });
    },[frais]);
    return(
        <div className="Carte-Commande flex">
            {
                Produits.length > 0 ? 
                <>
                    <div className="products-commandes flex">
                    {
                        Produits.map((product, index) => (
                                <div key={index} className="product-in-commandes flex">
                                    <img src={product.img} alt={product.name} />
                                    <div className="product-descriptin-in-panier flex">
                                        <div className="product-name pointer">{product.name} {product.taille}</div> 
                                        <div className="product-price">{product.price}</div>
                                        <div className="product-quantite">Quantité: {product.quantite}</div>
                                    </div>
                                    <GoX className="delet-product pointer" onClick={() => handelDelete(product)} />
                                </div>
                            )
                        )
                    }
                    </div>
                    <div className='calculer-total-commande flex'>
                        <div className='commande-details flex'>
                            <div className='sous-total-comamndes flex'>
                                <strong>Sous-Total :</strong> {SoustotalPrice}DZD
                            </div>
                            <div className='expiditions-calculate flex'>
                                <div><strong>Expédition</strong></div> 
                                <div>
                                    <strong>service de livraison</strong> : Nord et Ouest express
                                </div>
                                <div className='calculer-frais'>
                                    Calculer les frais de livraison
                                </div> 
                                <div className='calculer flex'>
                                    <SelectCheck    label={"Wilaya"}
                                                    value={wilaya}
                                                    setvalue={setwilaya}
                                                    list={["wilaya","Alger","Boumerdes","Mila","Batna","Oran"]}
                                    /> 
                                </div> 
                                
                            </div> 
                            {
                                wilaya != "wilaya" &&
                                <div className='sous-total-comamndes flex'>
                                    <strong>Total :<br/></strong> 
                                    Bureau : {PriceT.bureau}DZD<br/>
                                    Domicile :{PriceT.domicile}DZD
                                </div>
                            } 
                        
                        </div>
                        <Link to="/valider-commandes">
                            <Button style={{backgroundColor:"black",marginTop:"20px"}}
                                variant="contained"
                                className="ajouter-au-panier" 
                            >
                                Valider la commande
                            </Button> 
                        </Link>
                    </div>
                </>
                :<div className='panier-vide flex'>
                    <div>
                        Votre Panier est Vide!
                    </div>
                    <Link   to="/boutique">
                        Retour a la boutique 
                    </Link>
                </div>
            }
            
            
            
            
        </div>
    )
}


export default CarteCommande;