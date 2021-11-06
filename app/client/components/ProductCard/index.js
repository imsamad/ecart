import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartBtn from '../AddToCartBtn';

export default function ProductCard({ product }) {
  const sliceName = (str) => {
    return str.length > 20 ? str.substring(0, 19) + '...' : str;
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <CardActionArea>
        <Link href={`/products/${product.slug}`}>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card sx={{ border: 0.1, borderColor: 'grey.400' }}>
              {/* <CardMedia
                component="img"
                image={product.image}
                alt="Paella dish"
              /> */}
              <Image
                src={product.image}
                alt={product.slug}
                width={500}
                height={500}
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
                  <Typography variant="h6">
                    {sliceName(product.name)}
                  </Typography>
                </Tooltip>
                {/* <Typography variant="body2" align="justify" gutterBottom={false}>
              Bluetooth technology lets you connect it with compatible
              devices...
            </Typography> */}
              </CardContent>
            </Card>
          </a>
        </Link>
      </CardActionArea>
      <AddToCartBtn product={product._id.toString()} />
    </Box>
  );
}
