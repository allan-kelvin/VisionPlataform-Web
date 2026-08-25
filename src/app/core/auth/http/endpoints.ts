export const API_ENDPOINTS = {

  auth: {

    login: '/auth/login',

    me: '/auth/me'

  },

  users: {

    list: '/users',

    create: '/users',

    update: (id: number) => `/users/${id}`,

    delete: (id: number) => `/users/${id}`

  }

};
