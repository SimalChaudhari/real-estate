
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { PropertyListView } from 'src/sections/Properties/view/property-list-view';

const metadata = { title: `Properties - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PropertyListView />
        </>
    );
}
