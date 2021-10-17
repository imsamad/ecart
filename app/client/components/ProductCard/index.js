import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import Link from 'next/link';
import AddCartBtn from '../AddCartBtn';
export default function ProductCard({ product }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardActionArea>
        <Link href={`/products/${product.slug}`}>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card sx={{ border: 0.1, borderColor: 'grey.400' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt="Paella dish"
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {product.category}
                </Typography>
                <Typography variant="h6">{product.name}</Typography>
                {/* <Typography variant="body2" align="justify" gutterBottom={false}>
              Bluetooth technology lets you connect it with compatible
              devices...
            </Typography> */}
              </CardContent>
            </Card>
          </a>
        </Link>
      </CardActionArea>
      <AddCartBtn
        product={product._id.toString()}
        countInStock={product.countInStock}
      />
    </Box>
  );
}
