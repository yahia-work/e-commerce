
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import "./Footer.css"

function Footer(){
    return(
        <div className="footer flex ">
            <div className="footer-infos flex ">
                <h3 className="pointer">
                    Y_STORE35
                </h3>
                <div className="contact-email-footer flex ">
                    <strong>CONTACT</strong>
                    <p>hiyacollection@gmail.com</p>
                </div>
            </div>
            <div className="copy-right flex">
                <p>© 2024 - All rights reserved.</p>
                <div className="contact-icons flex"> 
                    
                    <a href="https://www.instagram.com/y_store35/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} className="insta-icon pointer"/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} className="fb-icon pointer" alt="Instagram Icon" />
                    </a>
                </div>
            </div>
        </div>
    )
}



export default Footer;