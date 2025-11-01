import { apiSlice } from "./apiSlice";

export const notesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotesByDate: builder.query({
      query: (userId) => `/notes/get?userId=${userId}`,
      providesTags: ["Note"],
    }),
    createNote: builder.mutation({
      query: (note) => ({
        url: "/notes/create",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const { useGetNotesByDateQuery, useCreateNoteMutation } = notesApi;
