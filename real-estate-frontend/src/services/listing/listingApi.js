
// import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://real-estate-nine-livid.vercel.app';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});


/**
 * Fetch the properties listing.
 * @returns {Object} - The response containing properties listing or an error message.
 */
export const GetList = async () => {
    try {
        const response = await axiosInstance.get('/api/properties-listing/get');

        // Clear existing toasts
        // toast.dismiss();

        // Show success toast notification
        // toast.success("Properties listing fetched successfully!");

        // Return success response
        return {
            success: true,
            data: response?.data || [], // Assuming `data` contains the listing array
            message: response?.data?.message || 'Listing fetched successfully!',
        };
    } catch (error) {
        // Extract error message
        const errorMessage = error?.response?.data?.message || error.message || 'An error occurred while fetching the listing';

        // Clear existing toasts
        toast.dismiss();

        // Show error toast notification
        toast.error(errorMessage);

        console.error('Error fetching properties listing:', errorMessage);

        // Return error response
        return {
            success: false,
            data: [],
            message: errorMessage,
        };
    }
};

/**
 * Fetch a property by its ID.
 * @param {string} id - The ID of the property to fetch.
 * @returns {Object} - The response containing the property details or an error message.
 */
export const GetById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/properties-listing/${id}`);

        // Clear existing toasts
        // toast.dismiss();

        // Show success toast notification
        // toast.success("Property details fetched successfully!");

        // Return success response
        return {
            success: true,
            data: response?.data || {}, // Assuming `data` contains the property details
            message: response?.data?.message || 'Property details fetched successfully!',
        };
    } catch (error) {
        // Extract error message
        const errorMessage = error?.response?.data?.message || error.message || 'An error occurred while fetching the property details';

        // Clear existing toasts
        toast.dismiss();

        // Show error toast notification
        toast.error(errorMessage);

        console.error('Error fetching property details:', errorMessage);

        // Return error response
        return {
            success: false,
            data: {},
            message: errorMessage,
        };
    }
};
