import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProductDetails } from "../services/products.services"
import SimpleBackdrop from "./SimpleBackdrop"

const ProductDescription = () => {
    const {productId} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        getEachProductDetails()
    }, [productId])

    const getEachProductDetails = async () => {
        try {
            const response = await getProductDetails(productId)
            setProduct(response.data)
            setIsFetching(false)       
        } catch (error) {
            navigate("/error")
        }
    }

    if(isFetching){
        return <SimpleBackdrop />
    }

  return (
    <div>
        <ul>
            <h3>Product Details</h3>
            {product.description.map((eachList) => {
                return <li style={{textAlign: "left"}}><p>{eachList}</p></li>
            })}
        </ul>

    
    </div>
  )
}

export default ProductDescription