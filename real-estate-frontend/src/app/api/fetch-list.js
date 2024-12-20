
import { createProperty, propertyList } from '@/redux/actions/propertyActions';
import { useDispatch } from 'react-redux';
export const useFetchData = () => {
    const dispatch = useDispatch();
  
    const fetchData = async () => {
      await dispatch(propertyList());
    };

    const createData = async (data) => {
  
      try {
        const response = await dispatch(createProperty(data));;
        if (response) {
          fetchData(); // Refetch category data only on successful deletion
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    };
  
  
    return { fetchData, createData };
  };
  