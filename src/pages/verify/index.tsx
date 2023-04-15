import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useAuthContext } from "contexts";
import { authApis } from 'apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NextPageWithLayout, VerifyEmailBody, VerifyEmailResponse } from '@types';
// import FormHelperText from '@mui/material/FormHelperText';
import { FcGoogle } from 'react-icons/fc';
import { AuthLayout } from 'layout';
import LoadingButton from '@mui/lab/LoadingButton';
const VerifySchema = z.object({
  email: z.string().email(),
});
type VerifyFormInputs = z.infer<typeof VerifySchema>;
const VerifyPage: NextPageWithLayout = () => {
  const router = useRouter();
  // const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    clearErrors,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    mode: 'all',
    resolver: zodResolver(VerifySchema),
  });
  const queryClient = useQueryClient();
  const {
    mutate: verifyMutate,
    error,
    isLoading,
  } = useMutation<VerifyEmailResponse, string, VerifyEmailBody, unknown>({
    mutationFn: (body) => authApis.verifyEmail(body),
  });

  function handleVerifyEmail() {
    //TODO: call API verify email
  }
  function onSubmit(data: VerifyFormInputs) {
    const body = { email: data.email };
    verifyMutate(body, {
      onSuccess: (response) => {
        router.push({ pathname: '/login', query: { identifier: data.email } });
      },
    });
  }

  // useEffect(() => {
  //   window.addEventListener('message', (event) => {
  //     console.log('🚀 ~ event:', event);
  //     if (event.origin !== 'http://funiverse.world:30001') return; // Check that the event is coming from the correct origin

  //     const { type, payload } = event.data;

  //     if (type === 'oauth2:success') {
  //       // Handle successful authentication
  //       console.log(payload);
  //     } else if (type === 'oauth2:error') {
  //       // Handle authentication error
  //       console.error(payload);
  //     }
  //   });

  //   return () => {};
  // }, []);

  async function handleOAuthLogin() {
    // const oauth = await authApis.oauthLogin();
    // oauthQuery.refetch();
    const popup = window.open(
      `${process.env.NEXT_PUBLIC_GOOGLE_SIGNIN}`,
      'OAuth2',
      'popup',
    ) as Window;
    // const popupWindow = popup.window;
    // popupWindow.addEventListener('load', () => {
    //   const pre = popupWindow.document.querySelector('pre');
    //   window.console.log('🚀 ~ pre:', pre);
    // });
    // console.log('🚀 ~ popup:', popup);
  }
  return (
    <Box
      sx={{
        width: '300px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          color="initial"
          fontSize={45}
          fontWeight="100"
          textAlign={'center'}
        >
          {'{'}Workspace Name{'}'}
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          id="entityForm"
          autoComplete="off"
          noValidate
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
        >
          <InputLabel htmlFor="email" sx={{ color: 'black', fontWeight: 600, fontSize: '18px' }}>
            Enter your email to start using {'{'}Workspace Name{'}'}
          </InputLabel>
          <TextField
            required
            error={Boolean(errors.email) || Boolean(error)}
            helperText={errors.email?.message || (error as any)?.message}
            fullWidth
            autoFocus
            {...register('email')}
          />
          {/* <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText> */}
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={null}
          >
            Continue
          </LoadingButton>
          <Button
            startIcon={<FcGoogle />}
            variant="contained"
            color="primary"
            fullWidth
            type="button"
            sx={{
              mt: 2,
              backgroundColor: '#fff',
              color: '#000',
              height: 42,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255, 0.8)',
              },
            }}
            onClick={handleOAuthLogin}
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyPage;

VerifyPage.MainLayout = AuthLayout;
