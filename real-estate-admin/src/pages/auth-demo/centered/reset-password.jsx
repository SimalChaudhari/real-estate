import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CenteredResetPasswordView } from 'src/sections/auth-demo/centered';

// ----------------------------------------------------------------------

const metadata = { title: `Reset password | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CenteredResetPasswordView />
    </>
  );
}
