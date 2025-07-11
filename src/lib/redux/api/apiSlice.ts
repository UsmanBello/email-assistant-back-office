import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
        prepareHeaders: (headers, { getState }) => {
            // Optionally add auth token here if needed
            // const token = (getState() as any).auth?.token;
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    endpoints: () => ({}), // We'll inject endpoints in feature slices
}); 