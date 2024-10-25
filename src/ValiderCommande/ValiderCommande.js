import "./ValiderCommande.css"
import TextField from '@mui/material/TextField';
import SelectCheck from "../components/SelectCheck";
import Checkbox from '@mui/material/Checkbox';
import { PanierContext } from '../Context/PanierContext';
import { Link } from 'react-router-dom';
import { useState, useEffect,useContext } from "react"; 
import Button from '@mui/material/Button';
import { FaArrowLeftLong } from "react-icons/fa6";

function ValiderCommande(){
    const [wilaya,setwilaya] = useState("wilaya")
    const [Commune,setCommune] = useState("Commune")

    const [selectedOption, setSelectedOption] = useState('Bureau');
    const handleChange = (option) => {
        setSelectedOption(option === selectedOption ? null : option);
    };
    
    const [SoustotalPrice,setSoustotalPrice] = useState(0); 
    const [PriceT,setPriceT] = useState({bureau:0,domicile:0});
    const [frais,setfrais] = useState({bureau:0,domicile:0});
    const { Produits } = useContext(PanierContext);
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
        <div className="valider-commandes flex">
            {
                Produits.length > 0 ? 
            
            <>
                <div className="form-client flex">
                    <div style={{fontSize:"20px"}}>
                        <strong>Facturation & Expédition</strong> 
                    </div>
                    <TextField label="Nom" variant="outlined" />
                    <TextField label="Numero telephone" variant="outlined" />
                    <SelectCheck    label={"Wilaya"}
                                    value={wilaya}
                                    setvalue={setwilaya}
                                    list={["wilaya","Alger","Boumerdes","Mila","Batna","Oran"]}
                    /> 
                    <SelectCheck    label={"Commune"}
                                    value={Commune}
                                    setvalue={setCommune}
                                    list={["Commune","Alger","bab zouar","cheraga","reghaia","alger center"]}
                    /> 
                    <div>
                        <div  className="categorie-config flex">
                            <Checkbox
                            checked={selectedOption === 'Bureau'}
                            onChange={() => handleChange('Bureau')}
                            />
                            Bureau
                        </div>
                        <div  className="categorie-config flex">
                            <Checkbox
                            checked={selectedOption === 'Domicile'}
                            onChange={() => handleChange('Domicile')}
                            />
                            A domicile
                        </div>
                        <div style={{marginLeft:"10px"}}>
                            {wilaya == "wilaya" && "(selecionner la wilaya)" }
                        </div>
                    </div>
                </div>
                <div className="commandes-infos flex">
                    <div style={{fontSize:"20px"}}>
                        <strong>Votre commandes</strong> 
                    </div>
                    <div className="commandes-infos-validation">
                        <div className="head-final-commande flex">
                            <div><strong>Produits</strong></div>
                            <div><strong>Total price</strong> </div>
                        </div>
                        {
                            Produits.map((product,index)=>{
                                return(
                                <div className="element-final-commande flex">
                                    <div>{product.name} {product.taille} ({product.quantite}) </div>
                                    <div>{product.price * product.quantite} DZD</div>
                                </div>

                                )
                            })
                        }
                        <div className="head-final-commande flex">
                            <div><strong>Sous total</strong></div>
                            <div><strong>{SoustotalPrice} DZD</strong> </div>
                        </div>
                        <div className="element-final-commande flex">
                            <div>Expédition</div> 
                        </div>
                        <div className="element-final-commande flex">
                            <div>
                                Service : Nord et Ouest Express
                            </div> 
                        </div>
                        <div className="head-final-commande flex">
                            <div>
                                Livraison :  {wilaya == "wilaya" ? "(selecionner la wilaya)" :selectedOption}
                            </div>
                        </div>
                        <div className="element-final-commande flex">
                            <div><strong>Total</strong></div>
                            <div>
                                <strong>
                                    
                                    {selectedOption == 'Domicile'?PriceT.domicile : PriceT.bureau} DZD
                                </strong>
                            </div>
                        </div>
                        <Button style={{backgroundColor:"black",marginTop:"20px"}}
                            variant="contained"
                            className="ajouter-au-panier" 
                        >
                            Valider la commande
                        </Button> 
                        
                    </div>
                </div>
            </>
            :<div className='panier-vide flex'>
            <div>
                Votre Panier est Vide!
            </div>
            <Link   to="/boutique" className="flex" style={{textDecoration:"none",color:"green",gap:"10px",alignItems:"center"}}>
                <FaArrowLeftLong />Retour a la boutique 
            </Link>
        </div>
            }
        </div>
    )
}

export default ValiderCommande;