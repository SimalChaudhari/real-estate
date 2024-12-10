import { useDispatch } from 'react-redux';
import { deleteProperty, getByProperty, propertyList } from 'src/store/action/propertyActions';

export const useFetchData = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(propertyList());
  };

  const getByList = async (id) => {

    try {
      const response = await dispatch(getByProperty(id));;
      if (response) {
        fetchData(); 
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const fetchDeleteData = async (id) => {

    try {
      const response = await dispatch(deleteProperty(id));;
      if (response) {
        fetchData(); 
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const fetchDeleteAllData = async (id) => {

    try {
      const response = await dispatch(deleteProperty(id));;
      if (response) {
        fetchData(); 
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };


  return { fetchData, fetchDeleteData,fetchDeleteAllData,getByList };
};

