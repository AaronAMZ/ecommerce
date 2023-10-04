import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useProductById } from "../../hooks/queries/useProductById";
import ProductList from "../../components/home/ProductList/ProductList";
import { useAddProductToCart } from "../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../hooks/queries/useCart";
import ('./ProductDetail.css')

const ProductDetail = () => {
  const cartQuery = useCart();
  const navigate = useNavigate();
  const { productId } = useParams();
  const {mutate} = useAddProductToCart();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { data, isLoading, isError, error} = useProductById(productId);
  
  const isProductInCart = cartQuery.data?.some(
    (cartProduct) => cartProduct.productId === data?.id) ?? false;
    
  const quantityInCart = 
    cartQuery.data?.find(
    (cartProduct) => Number(cartProduct.productId) === Number(productId))?.quantity ?? 1;
  const [quantity, setQuantity] = useState(Number(quantityInCart));

  const increment = () => {
    const newQuantity = quantity + 1;
    const stock = 10;
    if(newQuantity <= stock) setQuantity(newQuantity)
  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    if(newQuantity >= 1) setQuantity(newQuantity)
  };

  const handleAddCart = () => {
    if(isLogged) mutate({quantity, productId});
    else navigate("/login");
  };

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart])

  if(isLoading) return <p>Loading product...</p>

  if(isError) return <p>{error.message ?? "No se puedo cargar el producto"}</p>

  return (
    <section>
        <section className="section_detail">
            <div>
                {data && data.images && data.images[0] && (
    <img src={data.images[0].url} alt={data.title} />
  )}
            </div>

            <div>
              <h3>{data.brand}</h3>
             <h2>{data.title}</h2>

               <p>
                  {data.description}
               </p>

               <div>
                   <div>  
                       <h3>Price</h3>
                       <p>
                          <em>$ {data.price}</em>
                      </p>
                   </div>

                 <div>
                    <h3>Quantity</h3>
                      <div>
                          <button onClick={decrement}>-</button>
                          <span>{quantity}</span>
                         <button onClick={increment}>+</button>
                     </div>

                     {!isProductInCart && (
                       <button onClick={handleAddCart}>Add to cart</button> 
                     )}

                     {isProductInCart && <button>Update in cart</button>}
                </div>
            </div>

            </div>
        </section>

      <ProductList categories={data.categoryId} excludeIds={[data.id]}/>
    </section>
  )
}

export default ProductDetail