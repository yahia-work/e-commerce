
import "./Livraison.css"
import { Outlet } from 'react-router-dom'; 

function Livraison(){
    return(
        <div className="livraison flex">
            <Outlet />
        </div>
    )
}




export default Livraison;