import React from 'react';
import Image from 'next/image';
import { Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import fetchJson from '../../lib/fetchJson';

const index = ({ emptyProduct, product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return 'Loading...';
  }
  if (product) {
    return (
      <Grid container>
        <Grid item xs={12} md={4}>
          <Image
            src={product.image}
            width={250}
            height={300}
            alt={product._id}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {product.brand}
          </Typography>
          <Typography variant="h4" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300 }} gutterBottom>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return 'No product exist. with this identifier...';
  }
};
export const getStaticPaths = async () => {
  const api = process.env.API_URL;
  const {
    data: { products },
  } = await fetchJson(`${api}/products`);

  const paths = products.map((product) => ({ params: { slug: product.slug } }));

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps(ctx) {
  try {
    const api = process.env.API_URL;
    const { params } = ctx;
    const {
      data: { products },
    } = await fetchJson(`${api}/products?slug=${params.slug}`);

    if (products.length === 0) {
      return {
        props: {
          emptyProduct: true,
          product: null,
        },
        revalidate: 1,
      };
    } else
      return {
        props: {
          product: products[0],
        },
        revalidate: 1,
      };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }, //Redirecting at build-time is currently not allowed and if the redirects are known at build-time they should be added in next.config.js.
    };
  }
}
export default index;
