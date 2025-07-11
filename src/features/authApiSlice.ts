import { apiSlice } from '@/redux/api/apiSlice';
import { AuthResponse } from '@/types/authTypes';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginWithGoogle: builder.mutation<AuthResponse, { credential: string }>({
            query: (body) => ({
                url: '/users/auth/google',
                method: 'POST',
                body,
            }),
        }),
        // You can add register and other endpoints here as needed
    }),
});

export const { useLoginWithGoogleMutation } = authApiSlice; 