import axios from 'axios';
export default async function fetcher(...args) {
  try {
    const { data } = await axios(...args);

    return data;
  } catch (error) {
    let err = {};

    err = error?.response?.data || {
      message: 'Invalid credentials...',
      success: true,
      status: 500,
    };
    throw err;
  }
}
