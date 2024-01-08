import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import {
  handleLogout,
  setToken,
  setCsrftoken,
} from 'store/slices/app/app.slice';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Origin', window.location.origin);
    const currentState = getState();

    const token = currentState?.app?.auth?.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const csrf = currentState?.app?.csrftoken;

    if (csrf) {
      headers.set('x-csrf-token', csrf);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  const csrfToken = result?.meta?.response?.headers.get('x-csrf-token');

  if (csrfToken) {
    api.dispatch(setCsrftoken(csrfToken));
  }

  const appState = api?.getState()?.app;

  if (result?.error?.data?.message === 'jwt expired') {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: `${process.env.REACT_APP_API_HOST}/token/v1/refresh`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              refresh_token: appState?.auth?.refreshToken,
            },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data?.access_token) {
          api.dispatch(
            setToken({
              accessToken: refreshResult.data.access_token,
              refreshToken: refreshResult.data.refresh_token,
            }),
          );

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(handleLogout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result?.error?.data?.error === 'Invalid CSRF token') {
    if (!mutex.isLocked()) {
      // Retry the initial query with the new CSRF token added to the headers
      const retryArgs = {
        ...args,
        headers: {
          ...args.headers,
          'x-csrf-token': csrfToken,
        },
      };
      result = await baseQuery(retryArgs, api, extraOptions);
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const ipcApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'ipcApi',
  endpoints: () => ({}),
});
