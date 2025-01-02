import axiosInstance from '../config';
import { toast } from 'react-toastify';

/**
 * Fetch the properties location.
 * @returns {Object} - The response containing location data or an error message.
 */
export const GetLocationList = async () => {
  try {
    const response = await axiosInstance.get('/api/location/get');

    // Return success response
    return {
      success: true,
      data: response?.data || [], // Assuming `data` contains the location array
      message: response?.data?.message || 'Locations fetched successfully!',
    };
  } catch (error) {
    // Extract error message
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      'An error occurred while fetching the locations';

    // Show error toast notification
    toast.error(errorMessage);

    console.error('Error fetching properties location:', errorMessage);

    // Return error response
    return {
      success: false,
      data: [],
      message: errorMessage,
    };
  }
};
