import { useState } from "react"
import "./CartProduct.css"
import { useUpdateCart } from "../../../hooks/queries/useUpdateCart";
import { useSelector } from "react-redux";
import { useDeleteProductFromCart } from "../../../hooks/queries/useDeleteProductFromCart";

const CartProduct = ({ cartProduct }) => {
    const initialQuantity = Number(cartProduct.quantity);
    const price = Number(cartProduct.product.price);
    const { mutate, isLoading} = useUpdateCart();
    const deleteMutation = useDeleteProductFromCart();
    const [quantity, setQuantity] = useState(initialQuantity);
    const isLogged = useSelector(store => store.auth.isLogged)

    const increment = () => {
        const newQuantity = quantity + 1;
        const stock = 10;
        if(newQuantity <= stock) setQuantity(newQuantity)
      };
    
      const decrement = () => {
        const newQuantity = quantity - 1;
        if(newQuantity >= 1) setQuantity(newQuantity)
      };

      const handleUpdate = () => {
        if(isLogged) 
        mutate({cartProductId: cartProduct.id, newQuantity: quantity})
      }

      const handleDelete = () => {
        if(isLogged) deleteMutation.mutate(cartProduct.id)
      }

  return (
    <article className="cart_product">
                      <div className="cart_product_img"> 
                      {cartProduct.product && cartProduct.product.images && cartProduct.product.images[0] && (
                    <img src={cartProduct.product.images[0].url} alt={cartProduct.product.title} />
)}
                      </div>
                      
                      <div className="cart_product_detail">
                          <header className="cart_product_header">
                          <h4 className="cart_product_title">{cartProduct.product.title}</h4>
                          <button onClick={handleDelete} className="cart_product_btn" disabled={deleteMutation.isLoading}>
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                          </header>
                      
                        <div>
                          <div className="cart_product_controls">
                            <button onClick={decrement} className="cart_product_btn">-</button>
                            <span>{quantity}</span>
                            <button onClick={increment} className="cart_product_btn">+</button>
                          </div>

                          {initialQuantity !== quantity && <button onClick={handleUpdate} disabled={isLoading}>Update Cart</button>}
                        </div>

                        <div>
                            <h5>Total:</h5>
                            <p><em>{initialQuantity * price}</em></p>
                        </div>
                      </div>

                  </article>
  )
}

export default CartProduct