import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css"
import { useAddProductToCart } from "../../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";

const ProductCard = ({ product }) => {
    const { mutate } = useAddProductToCart();
    const { data, isLoading } = useCart();
    const isLogged = useSelector((store) => store.auth.isLogged);
    const navigate = useNavigate();

    const isProductInCart = data?.some(cartProduct => cartProduct.productId === product.id);

    const isAddVisible = !isLogged || !isProductInCart;

    const handleAdd = (e) => {
        e.preventDefault();
        
        if(!isLogged) navigate("/login");
        else mutate({ quantity: 1, productId: product.id})
        
    }
  return (
    <Link to={"/product/" + product.id} style={{textDecoration: 'none'}}>
    <article className="product_cart">
        <header className="product_cart_header">
            <div className="product_cart_container_img">
                <img 
                src={product.images && product.images.length > 0 ? product.images[0].url : ""} 
                alt={product.title + "image 1"} className="product_cart_img product_cart_container_img--visible"/>
                <img 
                src={product.images && product.images.length > 1 ? product.images[1].url : ""} 
                alt={product.title + "image 2"} className="product_cart_img product_cart_container_img--hidden"/>
            </div>

            <p className="product_cart_paragraph">{product.brand}</p>
            <h2 className="product_cart_title">{product.title}</h2>
        </header>
        <section className="product_cart_body">
            <h3 className="price">Price</h3>
            <p className="product_cart_paragraph">
                <em>S/. {product.price}</em>
            </p>
        </section>

        {isAddVisible && (
        <button 
        className="product_cart_btn" 
        onClick={handleAdd} 
        disabled={isLoading}>
            <i className="fa-solid fa-cart-plus"></i>
        </button>
        )}

        {!isAddVisible && <p className="alter_message">Ya tienes este producto en tu carrito</p>}
    </article>
    </Link>
  )
}

export default ProductCard