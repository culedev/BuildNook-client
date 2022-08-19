import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Divider } from "@mui/material";

import ListCategories from "../components/navbars/ListCategories";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/products.services";
import { useNavigate, Link } from "react-router-dom";

import CircularFetching from "../components/CircularFetching";
import ProductCard from "../components/ProductCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const categoriesArr = [
  "power-supply",
  "motherboard",
  "HDD",
  "SSD",
  "graphic-cards",
  "ram",
  "pc-tower",
  "fan",
  "liquid-refrigeration",
];

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    allProducts();
  }, []);

  const allProducts = async () => {
    try {
      const response = await getAllProducts();
      const randoms = response.data.sort(() => 0.5 - Math.random());
      let selected = randoms.slice(0, 9);
      setProducts(selected);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <CircularFetching />;
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <div style={{ flexGrow: 1 }}>
        <ListCategories />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flexGrow: 2, margin: "20px"}}>
        <h3 style={{ color: "#52489C" }}>DISCOVER NEW PRODUCTS!</h3>
        <Divider />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          style={{ margin: "20px"}}
        >
          {products.map((product, index) => (
            <Grid xs={2} sm={4} md={4} key={index} style={{display: "flex", justifyContent: "center"}}>
              <Link
                to={`/products/${product._id}/details`}
                style={{ textDecoration: "none" }}
              >
                <ProductCard product={product} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
