import { paths } from 'src/routes/paths';
import { DashboardContent, PageContentLayout } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getByProperty } from 'src/store/action/propertyActions';
import PropertyEditForm from './operation/property-edit-form';

// ----------------------------------------------------------------------
export function PropertyEditView() {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the property ID from the URL

    const property = useSelector((state) => state.property.getByProperty); // Access the property from the Redux store

    // Fetch the property data when the component mounts or the ID changes
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    console.log("Fetching property data...");
                    await dispatch(getByProperty(id)); // Dispatch the action to fetch property data
                    console.log("Property data fetched successfully.");
                } catch (error) {
                    console.error("Error fetching property data:", error);
                }
            };

            fetchData();
        }
    }, [id, dispatch]);

    return (
        <DashboardContent maxWidth='2xl'>
            <CustomBreadcrumbs
                heading={`Edit #${property?.itemName || ''}`}
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Properties', href: paths?.properties.root },
                    { name: 'Edit' },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <PageContentLayout>
                <PropertyEditForm currentData={property} />
            </PageContentLayout>
        </DashboardContent>
    );
}
