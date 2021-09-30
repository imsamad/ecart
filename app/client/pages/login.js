import SignInUp from '../components/SignInUp';
import { useSelector } from 'react-redux';

const index = () => {
  const state = useSelector((state) => state);

  // console.log('State', state);

  return <SignInUp />;
};

export default index;
