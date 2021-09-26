import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Fab,
  CardActionArea,
} from '@mui/material';
import Link from 'next/link';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function BasicCard({ product }) {
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
      <Fab
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
        }}
        size="small"
        color="secondary"
        aria-label="addtocart"
      >
        <AddShoppingCartIcon fontSize="small" />
      </Fab>
    </Box>
  );
}
