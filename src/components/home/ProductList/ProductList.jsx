import { useProducts } from "../../../hooks/queries/useProducts"
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css"


const ProductList = ({ categories, title, excludeIds = []}) => {
    const { data, isLoading, isError } = useProducts( categories, title);

    if(isLoading) return <p>Loading products...</p>;

    if(isError) return <p>Opps, algo salió mal</p>

  return (
    
        <ul className="product_list">
            { data
            .filter((product) => !excludeIds.includes(product.id))
            .map((product) => (
            <li key={product.id} className="product_list_item">
                {/* <Link to={"/product/" + product.id}> */}
                <ProductCard product={product}/>
                {/* </Link> */}
            </li>
            ))}
        </ul>
    
  )
}

export default ProductList