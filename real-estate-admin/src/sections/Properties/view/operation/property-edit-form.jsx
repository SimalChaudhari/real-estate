import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Stack, Typography, Grid, Button, Divider, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Field, Form } from 'src/components/hook-form';
import { editProperty } from 'src/store/action/propertyActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function PropertyEditForm({ currentData }) {
    console.log("🚀 ~ PropertyEditForm ~ currentData:", currentData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const defaultValues = useMemo(() => ({
        title: currentData?.title || '',
        description: currentData?.description || '',
        price: currentData?.price || '',
        property_type: currentData?.property_type || '',
        status: currentData?.status || '',
        listing_type: currentData?.listing_type || '',
        listed_by: currentData?.listed_by || '',
        images: currentData?.images || [],
        address: currentData?.address || {
            address: '',
            city: '',
            state: '',
            zip_code: '',
            latitude: '',
            longitude: ''
        },
        overview: currentData?.overview || {
            project_area: '',
            size_range: { min: '', max: '' },
            project_size: { buildings: '', units: '' },
            launch_date: '',
            avg_price: '',
            possession_starts: '',
            configuration: ''
        },
        features: currentData?.features || []
    }), [currentData]);

    const methods = useForm({ defaultValues });
    const { reset, handleSubmit, setValue, watch } = methods;
    const values = watch();

    // Sync features state with form data
    const [features, setFeatures] = useState(currentData?.features || []);

    // Update the features value in form when features state changes
    useEffect(() => {
        setValue('features', features);
    }, [features, setValue]);

    useEffect(() => {
        if (currentData) {
            reset(defaultValues);
        }
    }, [currentData, defaultValues, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
            const res = await dispatch(editProperty(currentData.id, data));
            if (res) {
                navigate('/properties');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error updating property:', error);
            setLoading(false);
        }
    });

    const handleCancel = () => {
        navigate(-1);
    };

    const handleAddFeature = () => {
        setFeatures([...features, { name: '', value: '' }]);
    };

    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index][field] = value;
        setFeatures(updatedFeatures);
    };

    const handleRemoveFeature = (index) => {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
    };

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3}>
                <Card>
                    <Stack spacing={2} sx={{ p: 3 }}>
                        {/* Title and Description */}
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">Property Details</Typography>
                                <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                                <Grid container spacing={2}> {/* Adjusted spacing between the grid items */}
                                    {/* Left Column */}
                                    <Grid item xs={12} sm={6}>
                                        <Field.Text name="title" label="Title" fullWidth sx={{ mb: 2 }} />
                                        <Field.Text name="price" label="Price" type="number" fullWidth sx={{ mb: 2 }} />
                                      
                                    </Grid>

                                    {/* Right Column */}
                                    <Grid item xs={12} sm={6}>
                                        <Field.Select
                                            name="status"
                                            label="Status"
                                            options={['Available', 'Sold', 'Pending']}
                                            fullWidth sx={{ mb: 2 }}
                                        />
                                        <Field.Select
                                            name="listing_type"
                                            label="Listing Type"
                                            options={['Buy', 'Rent', 'Lease']}
                                            fullWidth sx={{ mb: 2 }}
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                    <Field.Select
                                    name="property_type"
                                    label="Property Type"
                                    options={['Villa', 'Apartment', 'Plot']}
                                  
                                />

                                </Grid>

                                 
                                </Grid>
                            </Grid>



                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">Address</Typography>
                                <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                                <Grid container spacing={2}> {/* Adjust the spacing to 2 or 3 for more consistent space between fields */}
                                    {/* Left Column */}
                                    <Grid item xs={12} sm={6}>
                                        <Field.Text name="address.address" label="Street Address" fullWidth sx={{ mb: 2 }} />
                                        <Field.Text name="address.city" label="City" fullWidth sx={{ mb: 2 }} />
                                        <Field.Text name="address.state" label="State" fullWidth sx={{ mb: 2 }} />
                                    </Grid>

                                    {/* Right Column */}
                                    <Grid item xs={12} sm={6}>
                                        <Field.Text name="address.zip_code" label="ZIP Code" fullWidth sx={{ mb: 2 }} />
                                        <Field.Text name="address.latitude" label="Latitude" type="number" fullWidth sx={{ mb: 2 }} />
                                        <Field.Text name="address.longitude" label="Longitude" type="number" fullWidth sx={{ mb: 2 }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Field.Text name="description" label="Description" multiline rows={3} fullWidth sx={{ mb: 2 }} />
                            </Grid>

                            {/* Overview Section */}
                            <Grid item xs={12}>
                                <Typography variant="h6">Overview</Typography>
                                <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                                <Stack spacing={2}>
                                    <Field.Text name="overview.project_area" label="Project Area (acres)" type="number" fullWidth />
                                    <Field.Group>
                                        <Field.Text name="overview.size_range.min" label="Min Size (sq. ft.)" type="number" fullWidth />
                                        <Field.Text name="overview.size_range.max" label="Max Size (sq. ft.)" type="number" fullWidth />
                                    </Field.Group>
                                    <Field.Group>
                                        <Field.Text name="overview.project_size.buildings" label="Buildings" type="number" fullWidth />
                                        <Field.Text name="overview.project_size.units" label="Units" type="number" fullWidth />
                                    </Field.Group>
                                    <Field.DatePicker name="overview.launch_date" label="Launch Date" fullWidth />
                                    <Field.Text name="overview.avg_price" label="Average Price" fullWidth />
                                    <Field.DatePicker name="overview.possession_starts" label="Possession Starts" fullWidth />
                                    <Field.Text name="overview.configuration" label="Configuration" fullWidth />
                                </Stack>
                            </Grid>

                            {/* Features Section */}
                            <Grid item xs={12}>
                                <Typography variant="h6">Features</Typography>
                                <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                                <Stack spacing={2}>
                                    {features.map((feature, index) => (
                                        <Grid container spacing={2} key={index}>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Feature Name"
                                                    fullWidth
                                                    value={feature.name}
                                                    onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Feature Value"
                                                    fullWidth
                                                    value={feature.value}
                                                    onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleRemoveFeature(index)}
                                                    sx={{ width: '100%' }}
                                                >
                                                    Remove
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    <Button variant="outlined" onClick={handleAddFeature} sx={{ mt: 2 }}>
                                        Add Feature
                                    </Button>
                                </Stack>
                            </Grid>

                        </Grid>
                    </Stack>
                </Card>

                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <LoadingButton type="submit" variant="contained" loading={loading}>
                        Submit
                    </LoadingButton>
                </Stack>
            </Stack>
        </Form>
    );
}
