const API_ROUTES = {
    USERS: {
    //  CREATE : "/users",
     GET : "/users",
     UPDATE : (id) => `/users/update/${id}`,
     DELETE : (id) => `/users/${id}`,
     GET_ID : (id) => `/users/${id}`
    },
    AUTH: {
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
    },
    PROPERTIES: {
      LIST: "/properties-listing/get",
      CREATE: "/properties-listing/create",
      GET_BY_ID: (id) => `/properties-listing/${id}`,
    },
    CITIES: {
      GET: "/location/city/list",
    },
    // Add other routes here
  };
  
  export default API_ROUTES;
  