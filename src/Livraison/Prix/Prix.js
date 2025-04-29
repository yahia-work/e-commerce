import { useState, useEffect } from 'react';
import SimpleTable from '../../components/UserTable';
import AutocompleteSelect from '../../components/Autocomplet';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReadFromSheet } from '../../backend manager/ReadFromSheet';

function Prix() {
    const [Wilayas, setWilayas] = useState([]);
    const [wilayaselected, setwilayaselected] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columnsConfig = [
        { key: 'code wilaya', label: 'Code Wilaya' },
        { key: 'nom wilaya', label: 'Nom de la wilaya' },
        { key: 'stop desk', label: 'Stop Desk' },
        { key: 'a domicile', label: 'A domicile' },
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await ReadFromSheet({
                    sheet: "code wilayas",
                    filter: {}
                });
                setWilayas(data || []); // Ensure we always have an array
                setError(null);
            } catch (error) {
                console.error("Erreur:", error.message);
                setError(error.message);
                setWilayas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Verifier votre connexion s'il vous plait</div>;

    return (
        <div className="prix flex"> 
            <div className='flex' style={{justifyContent:"space-between",alignItems:"center"}}>
                <h2>Prix de livraison</h2>
                <Link to={"https://noest-dz.com/"}
                    style={{
                        color: "inherit"  
                    }}
                    className='pointer'
                >
                    Bureaux de noest express 
                </Link>
            </div>
            <AutocompleteSelect     
                label={"Wilaya"} 
                value={wilayaselected} 
                setValue={setwilayaselected}
                options={Wilayas.map(w => w["nom wilaya"])}  // Changed from "nom" to "nom wilaya"
            /> 
            <SimpleTable 
                data={Wilayas} 
                columns={columnsConfig} 
                filterColumn={"nom wilaya"} 
                filterValue={wilayaselected}
            />
        </div>
    );
}

export default Prix;