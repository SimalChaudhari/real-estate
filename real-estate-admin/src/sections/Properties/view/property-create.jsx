import { paths } from 'src/routes/paths';
import { DashboardContent, PageContentLayout } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { PropertyCreateForm } from './operation/property-create-form';

// ----------------------------------------------------------------------
export function PropertyCreateView() {


    return (
        <DashboardContent maxWidth='2xl'>
            <CustomBreadcrumbs
                heading="Create"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Properties', href: paths?.properties.root },
                    { name: 'Create' },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <PageContentLayout>
                <PropertyCreateForm/>
            </PageContentLayout>
        </DashboardContent>
    );
}
