import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5001"}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `general/user/${id}`, providesTags: ["User"]
        }), getProducts: builder.query({
            query: () => `client/products`, providesTags: ["Products"],
        }),
        getCustomers: builder.query({
            query: () => `client/customers`, providesTags: ["Customers"]
        }),
        getTransactions: builder.query({
            query: ({page, pageSize, sort, search}) => (
                {
                    url: 'client/transactions',
                    method: 'GET',
                    params: {
                        page: page,
                        pageSize: pageSize,
                        sort: sort,
                        search: search

                    },
                })
            , providesTags: ["Transactions"]
        }),
        getGeography: builder.query({
            query: () => `client/geography`, providesTags: ["Geography"]
        }),
        getSales: builder.query({
                query: () => `sales/sales`, providesTags: ["Sales"]
            }
        ),
        getAdmins: builder.query({
            query: () => `management/admins`, providesTags: ["AdminsUser"]
        }),
        getUserPerformance: builder.query({
            query: (id) => `management/performance/${id}`, providesTags: ["Performance"]
        }),
        getDashboard: builder.query({
            query: () => `general/dashboard`, providesTags: ["Dashboard"]
        }),
    }),
});
export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery
} = api;
