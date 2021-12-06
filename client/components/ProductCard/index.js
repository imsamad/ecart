import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Tooltip,
  Button,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import AddToCartBtn from "../AddToCartBtn";
import ccyFormat from "../../lib/ccyFormat";
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function ProductCard({ product }) {
  const sliceName = (str) => {
    return str.length > 20 ? str.substring(0, 19) + "..." : str;
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Card sx={{ border: 0.1, borderColor: "grey.400" }}>
        <CardActionArea>
          <Link href={`/products/${product.slug}`}>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <>
                <Image
                  priority={true}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(500, 500)
                  )}`}
                  src={product.image}
                  alt={product.slug}
                  width={500}
                  height={500}
                  layout="responsive"
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.category}
                  </Typography>
                  <Tooltip title={product.name} arrow>
                    <Typography variant="h6" gutterBottom>
                      {sliceName(product.name)}
                    </Typography>
                  </Tooltip>
                </CardContent>
              </>
            </a>
          </Link>
        </CardActionArea>
        {/* <CardContent sx={{ p: 0, border: 2, m: 0 }}> */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 1 }}>
          <AddToCartBtn product={product._id.toString()} buy={true} />
          <Typography
            variant="h6"
            color="secondary"
            align="right"
            sx={{ mx: 1 }}
          >
            {ccyFormat(product.price)}
          </Typography>
        </Box>
        {/* </CardContent> */}
      </Card>
      <AddToCartBtn product={product._id.toString()} />
    </Box>
  );
}
