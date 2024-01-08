/**
 * @api {module} UserFilesApi
 * @apiDescription Provides access to user files related endpoints.
 * @apiVersion 1.0.0
 * @apiName UserFilesApi
 * @apiGroup API Modules
 */

import { ipcApi } from '../';

const userFilesApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @api {function} useUserFilesQuery Get User Files Query
     * @apiDescription This query allows you to retrieve user files.
     * @apiName useUserFilesQuery
     * @apiGroup UserFilesApi
     *
     * @apiParam {Object} params - The parameters for retrieving user files.
     * @apiParam {number} params.page - The page number.
     *
     * @apiSuccess {Promise} Promise - A Promise that resolves with the user files.
     */
    userFiles: builder.query({
      query: ({ page }) => ({
        url: `${process.env.REACT_APP_API_HOST}/file/v1/list`,
        params: { page },
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'files', id: result.user_id }],
    }),
  }),
});

export const { useUserFilesQuery } = userFilesApi;
