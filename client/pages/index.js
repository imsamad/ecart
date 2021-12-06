import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import fetchJson from "../lib/fetchJson";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import NotFound from "../components/NotFound";

import { fetchProducts } from "../redux/actions/productAction";

export default function index() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const router = useRouter();

  const query = router.query;
  const keyword = router.query.q;

  React.useEffect(() => {
    keyword && dispatch(fetchProducts(keyword));
  }, [query]);

  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid xs={12} item>
        <SearchBar />
      </Grid>
      {/* <HomeSkeleton /> */}

      {products.length === 0 ? (
        <Grid item xs={12}>
          <NotFound keyword={keyword} />
        </Grid>
      ) : (
        products?.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export const getStaticProps = async () => {
  const apiUrl = process.env.API_URL;
  const {
    data: { products },
  } = await fetchJson(`${apiUrl}/products`);
  return {
    props: {
      data: products,
      reduxData: {
        reducerName: "products",
        fieldName: "products",
      },
    },
  };
};
