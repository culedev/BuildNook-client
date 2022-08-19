import CircularFetching from "../../components/CircularFetching";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Divider } from "@mui/material";

import ListCategories from "../../components/navbars/ListCategories";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { filteredCategorie } from "../../services/products.services";

const Categories = () => {
  const navigate = useNavigate()
  const {categorie} = useParams()
  const [products, setProducts] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    getProductsByCategorie()
  }, [categorie])

  const getProductsByCategorie = async () => {
    try {
      const response = await filteredCategorie(categorie)
      setProducts(response.data)
      setIsFetching(false)
    } catch (error) {
      navigate("/error")
    }
  }

  if(isFetching){
    return <h1>...Loading</h1>
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <div style={{ flexGrow: 1 }}>
        <ListCategories />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flexGrow: 2, margin: "20px" }}>
        <h3 style={{ color: "#52489C" }}>DISCOVER NEW PRODUCTS!</h3>
        <Divider />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          style={{ margin: "20px" }}
        >
          {products.map((product, index) => (
            <Grid xs={2} sm={4} md={4} key={index}  style={{display: "flex", justifyContent: "center"}}>
              <Link to={`/products/${product._id}/details`} style={{textDecoration: "none"}}><ProductCard product={product} /></Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Categories;
