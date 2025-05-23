

import { Link } from 'react-router-dom';


function Products({products=[]}){
    return(
        <div className="products-card flex">
            {
                products.map((product,index)=>{
                    return (
                        <div key={index} className="product-card flex">
                            <Link   to={`/produit/${product.name.replace(/ /g, '_')}`}
                                    state={{ product }}
                            >
                                <img src={product.img} className="product-img pointer"/>
                            </Link>
                            <div className="product-model pointer">{product.model}</div> 
                            <div className="product-name pointer">{product.name}</div> 
                            <div className="product-price">{product.price}DZD</div>  
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Products