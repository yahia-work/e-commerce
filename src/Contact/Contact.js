import "./Contact.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 

import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";

function Contact(){
    return(
        <div className="contact flex">
            <div className="contactez-nous-infos flex">
                <strong>Contactez-nous:</strong>
                <div>Service client :</div>
                <div>hiyacollection@gmail.com</div>
                <div className="contact-icons flex"> 
                    <img src={instagram} className="insta-icon pointer"/>
                    <img src={facebook} className="fb-icon pointer"/>
                </div>
            </div>
            <div className="contactez-nous flex">
                <TextField label="Nom" variant="outlined" />
                <TextField label="Address E-mail" variant="outlined" />
                <TextField label="Telephone" variant="outlined" />
                <TextField label="Sujet" variant="outlined" />
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={4}
                />
                <Button style={{backgroundColor:"black"}} variant="contained" className="envoyer-button">
                    Envoyer Message
                </Button>
            </div>
        </div>
    )
}

export default Contact;