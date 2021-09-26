const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc      Create cart
// @route     POST /api/v1/carts
// @access    Protect
exports.createCart = asyncHandler(async (req, res, next) => {
  const {
    productItem: { productId, qty, increment, decrement },
  } = req.body;
  const productExist = await Product.findById(productId);
  const outOfStock = qty > productExist?.countInStock ? true : false;

  if (!productExist || outOfStock) {
    return next(new ErrorResponse("Request can't be processed", 415));
  }

  const newProductItem = {
    qty,
    product: productExist._id,
    price: productExist.price,
  };

  const cartExist = await Cart.findOne({ user: req.user._id, isOrder: false });

  if (cartExist) {
    // If product already part of cart, then increment its qty by one...
    const indexOfProduct = cartExist.productItems
      .map((item) => item.product.toString())
      .indexOf(productExist._id.toString());

    if (indexOfProduct !== -1) {
      const willGoOutOfStock =
        cartExist.productItems[indexOfProduct].qty + 1 >
        productExist.countInStock;

      if (willGoOutOfStock)
        return next(new ErrorResponse('Out of stock.', 400));

      cartExist.productItems[indexOfProduct].qty++;
    } else cartExist.productItems = [...cartExist.productItems, newProductItem];

    await cartExist.save();

    return res.json(cartExist);
  } else {
    // Create new Cart...

    let newCart = new Cart({
      user: req.user._id,
      productItems: [newProductItem],
    });

    newCart = await newCart.save();
    return res.json(newCart);
  }
});

// @desc      Get Cart of LoggedIn User
// @route     GET /api/v1/carts
// @access    Protect
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.user._id,
    isOrder: false,
  }).populate('productItems.product');

  res.json({ success: true, cart });
});

// @desc      Delete a product from cart
// @route     PUT /api/v1/carts
// @access    Protect
exports.removeProduct = asyncHandler(async (req, res, next) => {
  const { product: productId } = req.body;
  if (!productId) return next(new ErrorResponse('Provide a product.', 415));
  let carts = await Cart.findOne({
    user: req.user._id,
    isOrder: false,
  });

  if (carts.productItems.length === 1) {
    await carts.deleteOne();
    return res.json({ success: true, carts: null });
  }
  carts.productItems = carts.productItems.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  await carts.save();
  return res.json({ success: true, carts });
});

// @desc      Increment or Decrement Qty of product in cart
// @route     PATCH /api/v1/carts
// @access    Protect
exports.incDecQty = asyncHandler(async (req, res, next) => {
  const { increment, decrement } = req.body;
  let productId,
    inc = false,
    dec;
  if (increment) {
    productId = increment.product;
    inc = true;
  } else {
    productId = decrement.product;
    dec = true;
  }
  if (!productId && (increment || decrement))
    return next(new ErrorResponse('Mention product', 415));

  const productExist = await Product.findById(productId);

  if (!productExist) {
    return next(new ErrorResponse('Product in invalid', 415));
  }

  const cartExist = await Cart.findOne({ user: req.user._id, isOrder: false });

  if (!cartExist) return next(new ErrorResponse('No cart exist...', 415));

  const indexOfProduct = cartExist.productItems
    .map((item) => item.product.toString())
    .indexOf(productExist._id.toString());

  if (indexOfProduct === -1)
    return next(new ErrorResponse("Request can't be processed", 415));

  const willBeZero = cartExist.productItems[indexOfProduct].qty - 1 === 0;
  const willGoOutOfStock =
    cartExist.productItems[indexOfProduct].qty + 1 > productExist.countInStock;
  const singleItem = cartExist.productItems.length === 1;

  if (dec) {
    if (singleItem && willBeZero) {
      await cartExist.remove();
      return res.json({ success: true, cart: null });
    }
    if (willBeZero) {
      cartExist.productItems = cartExist.productItems.filter(
        (item) => item.product.toString() !== productId.toString()
      );
      await cartExist.save();
      return res.json({ success: true, cartExist });
    }
    cartExist.productItems[indexOfProduct].qty--;
    await cartExist.save();
    return res.json({ success: true, cartExist });
  }

  if (willGoOutOfStock) return next(new ErrorResponse('Out of stock.', 400));

  cartExist.productItems[indexOfProduct].qty++;
  await cartExist.save();
  return res.json({ success: true, cartExist });
});
