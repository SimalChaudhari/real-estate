import { deleteProperty, propertyList,propertyByList } from "@/redux/actions/propertyActions";
import { useDispatch } from 'react-redux';
export const useFetchData = () => {
    const dispatch = useDispatch();
  
    const fetchData = async () => {
      await dispatch(propertyList());
    };

    const fetchByData = async (id) => {
      await dispatch(propertyByList(id));
    };
  
    const fetchDeleteData = async (id) => {
  
      try {
        const response = await dispatch(deleteProperty(id));;
        if (response) {
          fetchData(); // Refetch category data only on successful deletion
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    };
  
  
    return { fetchData,fetchByData, fetchDeleteData };
  };
  