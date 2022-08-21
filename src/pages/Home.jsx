// STYLES
import Grid from "@mui/material/Unstable_Grid2";
import { Divider } from "@mui/material";
// HOOKS
import { useEffect, useState } from "react";
// ROUTES
import { useNavigate } from "react-router-dom";
// SERVICES
import { getAllProducts } from "../services/products.services";
// COMPONENTS
import ListCategories from "../components/navbars/ListCategories";
import ProductCard from "../components/ProductCard";
import SimpleBackdrop from "../components/SimpleBackdrop";

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
    return <SimpleBackdrop />;
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
        <h2 style={{ color: "#52489C" }}>DISCOVER NEW PRODUCTS</h2>
        <Divider />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          style={{ margin: "20px" }}
        >
          {products.map((product, index) => (
            <Grid
              xs={2}
              sm={4}
              md={4}
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
