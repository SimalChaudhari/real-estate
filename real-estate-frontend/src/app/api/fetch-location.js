
import { citiesList } from '@/redux/actions/cityActions';
import { useDispatch } from 'react-redux';
export const useFetchLocationData = () => {
    const dispatch = useDispatch();
  
    const fetchLocationData = async () => {
      await dispatch(citiesList());
    };

  
  
    return { fetchLocationData };
  };
  