import { deleteUser, userList,userByList } from "@/redux/actions/userActions";
import { useDispatch } from 'react-redux';
export const useFetchData = () => {
    const dispatch = useDispatch();
  
    const fetchData = async () => {
      await dispatch(userList());
    };

    const fetchByData = async (id) => {
      await dispatch(userByList(id));
    };
  
    const fetchDeleteData = async (id) => {
  
      try {
        const response = await dispatch(deleteUser(id));;
        if (response) {
          fetchData(); // Refetch category data only on successful deletion
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    };
  
  
    return { fetchData,fetchByData, fetchDeleteData };
  };
  