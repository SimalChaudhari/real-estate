import {  useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid'; // Import Grid for layout
import { Form, Field, schemaHelper } from 'src/components/hook-form';

const PROPERTY_STATUS = ['Available', 'Sold', 'Pending']; // Example status options
const LISTING_TYPE = ['Rent', 'Sale']; // Example listing types

 const PROPERTY_TYPE = [
    { label: 'Apartment', value: 'Apartment' },
    { label: 'House', value: 'House' },
    { label: 'Villa', value: 'Villa' },
  ];

  export const PRODUCT_SIZE_OPTIONS = [
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '8.5', label: '8.5' },
    { value: '9', label: '9' },
    { value: '9.5', label: '9.5' },
    { value: '10', label: '10' },
    { value: '10.5', label: '10.5' },
    { value: '11', label: '11' },
    { value: '11.5', label: '11.5' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
  ];


// Define validation schema for the form
export const NewPropertySchema = zod.object({
    title: zod.string().min(1, { message: 'Title is required!' }),
    description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
    price: zod.number().min(1, { message: 'Price should be greater than $0.00' }),
    address: zod.object({
        address: zod.string().min(1),
        city: zod.string().min(1),
        state: zod.string().min(1),
        zip_code: zod.string().min(1),
        latitude: zod.string().optional(),
        longitude: zod.string().optional(),
    }),
    overview: zod.object({
        project_area: zod.string().min(1),
        size_range: zod.string().min(1),
        launch_date: zod.string().min(1),
        property_size: zod.string().min(1),
        property_type: zod.string().min(1, { message: 'Property type is required!' }),
        listing_type: zod.string().min(1, { message: 'Listing type is required!' }),
    }),
    status: zod.string().min(1, { message: 'Status is required!' }),
    listed_by: zod.string().min(1, { message: 'Listed by is required!' }),
    images: schemaHelper.files({ message: { required_error: 'Images are required!' } }),
    features: zod.array(zod.object({
        name: zod.string().min(1),
        value: zod.string().min(1),
    })),
});

// Create property form component
export function PropertyCreateForm() {
    const methods = useForm({
        resolver: zodResolver(NewPropertySchema),
        defaultValues: useMemo(() => ({
            title: '',
            description: '',
            price: 0,
            status: '',
            listed_by: '',
            images: [],
            address: {
                address: '',
                city: '',
                state: '',
                zip_code: '',
                latitude: '',
                longitude: '',
            },
            overview: {
                project_area: '',
                property_type: [],
                size_range: "",
                launch_date: '',
                property_size: '',
                listing_type: '',
            },
            features: [],
        }), []),
    });

    const { handleSubmit, setValue, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        try {
            // Simulate an API request or other logic to create the property
            console.info('New Property Data:', data);
            // Show success message, clear form, or redirect
        } catch (error) {
            console.error('Error creating property:', error);
        }
    };

    return (
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} sx={{ width: '100%' }}>
                <Grid container spacing={3}>
                    {/* Property Details Section */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Property Details" sx={{ mb: 2 }} />
                            <Divider />
                            <Stack spacing={3} sx={{ p: 3 }}>
                                <Field.Text name="title" label="Property Title" />
                                <Field.Text name="description" label="Description" multiline rows={4} />
                                <Field.Select name="status" label="Status" options={PROPERTY_STATUS} />
                            </Stack>
                        </Card>
                    </Grid>

                    {/* Property Address Section */}
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Address" sx={{ mb: 2 }} />
                                <Divider />
                                <Stack spacing={2} sx={{ p: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <Field.Text name="address.address" label="Street Address" multiline rows={3} />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field.Text name="address.city" label="City" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field.Text name="address.state" label="State" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field.Text name="address.zip_code" label="Zip Code" />
                                        </Grid>
                                    </Grid>

                                    <Typography>Location:</Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Field.Text name="address.latitude" label="Latitude" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field.Text name="address.longitude" label="Longitude" />
                                        </Grid>
                                    </Grid>

                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Overview Section */}
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Overview" sx={{ mb: 2 }} />
                            <Divider />
                            <Stack spacing={3} sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Field.Text name="overview.project_area" label="Project Area" />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <Field.Text name="overview.size_range" label="Size Range" />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Field.Text
                                            name="price"
                                            label="Price"
                                            type="number"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>

                                    <Field.MultiSelect 
                                      checkbox
                                      name="overview.property_type" 
                                      label="Property Type" 
                                      options={PRODUCT_SIZE_OPTIONS}
                                       />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <Field.Select name="overview.listing_type" label="Listing Type" options={LISTING_TYPE} />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                    <Field.Select name="overview.property_size" label="Property Size" options={LISTING_TYPE} />
                                </Grid>

                                 

                                    <Grid item xs={12} sm={4}>
                                        <Field.DatePicker name="overview.launch_date" label="Launch Date" />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>

                {/* Upload Section */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Upload Images" sx={{ mb: 2 }} />
                        <Divider />
                        <Stack spacing={3} sx={{ p: 4 }}>
                            <Grid container spacing={2}>
                                <Field.Upload
                                    multiple
                                    thumbnail
                                    name="images"
                                    maxSize={3145728}
                                />
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>

                {/* Action Buttons */}
                <Box mt={3} display="flex" justifyContent="flex-end">
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Create Property
                    </LoadingButton>
                </Box>
            </Stack>
        </Form>
    );
}
