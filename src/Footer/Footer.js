
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
                    <img src={instagram} className="insta-icon pointer"/>
                    <img src={facebook} className="fb-icon pointer"/>
                </div>
            </div>
        </div>
    )
}



export default Footer;