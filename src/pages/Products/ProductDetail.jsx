// STYLES
import "./Details.css"
// HOOKS
import { useEffect, useState } from "react";
// ROUTES
import { useNavigate, useParams } from "react-router-dom";
// SERVICES
import { getProductDetails } from "../../services/products.services";
// COMPONENTS
import ListCategories from "../../components/navbars/ListCategories"
import BoxDescRev from "../../components/BoxDescRev"

const ProductDetail = () => {
  const navigate = useNavigate()
  const {productId} = useParams()
  const [product, setProduct] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    try {
      const response = await getProductDetails(productId)
      setProduct(response.data)
      setIsFetching(false)
    } catch (error) {
      navigate("/error")
    }
  }

  if(isFetching){
    return <h2>...Loading</h2>
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <div style={{ flexGrow: 1 }}>
        <ListCategories />
      </div>

      <div style={{ flexGrow: 20, margin: "20px" }}>
        <div className="boxImage">
          <img src={product.image} alt={product.name} width={400}/>
          <div className="details">
            <h2>{product.name}</h2>
            <h2>{product.price}$</h2>
            <h4>rating here</h4>
            <div>
              <button>add cart</button>
              <button>wish list</button>
            </div>
          </div>
        </div>
        <div>
          <BoxDescRev />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
