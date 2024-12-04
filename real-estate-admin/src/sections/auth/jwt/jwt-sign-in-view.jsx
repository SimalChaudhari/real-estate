import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { Form, Field } from 'src/components/hook-form';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useDispatch } from 'react-redux';
import { login } from 'src/store/action/authActions';
import { IconButton, InputAdornment } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

// Validation schema for login form
export const LoginSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Invalid email format!' }),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

export function JwtSignInView() {
  const router = useRouter();
  const password = useBoolean();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(login(data.email, data.password));
      if (res) {
        router.push(PATH_AFTER_LOGIN);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to login');
    }
  };

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack spacing={1.5} sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Don't have an account?`}
          </Typography>
          <Link
            component={RouterLink}
            // href={paths.auth.jwt.signUp}
            variant="subtitle2">
            Get started
          </Link>
        </Stack>
      </Stack>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Stack spacing={3}>
        <Field.Text
          name="email"
          label="Email"
          InputLabelProps={{ shrink: true }}
        />

        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Logging in..."
        >
          Sign in
        </LoadingButton>
      </Stack>
    </Form>
  );
}
