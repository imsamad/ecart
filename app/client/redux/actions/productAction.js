import {
  PRODUCT_INIT,
  PRODUCT_REQ,
  PRODUCT_ERR,
} from '../constants/productsConst';
import fetchJson from '../../lib/fetchJson';

const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/products';

export const fetchProducts =
  (keyword = '', pageNumber = '1') =>
  async (dispatch) => {
    const data = await fetchJson(
      `${apiUrl}?keyword=${keyword}&page=${pageNumber}`
    );

    dispatch({ type: PRODUCT_REQ, payload: data.data.products });
  };
