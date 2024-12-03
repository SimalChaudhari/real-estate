import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/store/authSlice';
import { PATH_AFTER_LOGIN } from 'src/config-global';

const SignInSchema = zod.object({
  email: zod.string().email({ message: 'Enter a valid email' }).min(1, { message: 'Email is required' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters' }).min(1, { message: 'Password is required' }),
});

export function JwtSignInView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const [errorMsg, setErrorMsg] = useState('');
  const passwordVisible = useBoolean();

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await dispatch(login({ email: data.email, password: data.password }));
      if (result.meta.requestStatus === 'fulfilled') {
        router.push(returnTo || PATH_AFTER_LOGIN);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to sign in');
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5, textAlign: 'center' }}>
      <Typography variant="h5">Sign in to your account</Typography>
      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account?
        </Typography>
        <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
          Get started
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="email"
        label="Email address"
        InputLabelProps={{ shrink: true }}
        aria-label="email"
      />
      <Stack spacing={1.5}>
        <Link component={RouterLink} href="#" variant="body2" sx={{ alignSelf: 'flex-end' }}>
          Forgot password?
        </Link>
        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={passwordVisible.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordVisible.onToggle} edge="end" aria-label="toggle password visibility">
                  <Iconify icon={passwordVisible.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          aria-label="password"
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={onSubmit}
        loading={isSubmitting}
        loadingIndicator="Signing in..."
      >
        Sign in
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Form methods={methods}>{renderForm}</Form>
    </>
  );
}
