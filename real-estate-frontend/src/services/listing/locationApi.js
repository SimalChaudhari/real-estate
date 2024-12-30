
// import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../config';

/**
 * Fetch the properties Location.
 * @returns {Object} - The response containing properties Location or an error message.
 */
export const GetLocationList = async () => {
    try {
        const response = await axiosInstance.get('/api/location/get');

        // Clear existing toasts
        // toast.dismiss();

        // Show success toast notification
        // toast.success("Properties Location fetched successfully!");

        // Return success response
        return {
            success: true,
            data: response?.data || [], // Assuming `data` contains the Location array
            message: response?.data?.message || 'Location fetched successfully!',
        };
    } catch (error) {
        // Extract error message
        const errorMessage = error?.response?.data?.message || error.message || 'An error occurred while fetching the Location';

        // Clear existing toasts
        toast.dismiss();

        // Show error toast notification
        toast.error(errorMessage);

        console.error('Error fetching properties Location:', errorMessage);

        // Return error response
        return {
            success: false,
            data: [],
            message: errorMessage,
        };
    }
};
