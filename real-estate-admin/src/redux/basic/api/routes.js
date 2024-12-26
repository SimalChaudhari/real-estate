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
      LIST: "/properties",
      CREATE: "/properties/create",
      UPDATE:  (id) => `/properties/update/${id}`,
      DELETE : (id) => `/properties/delete/${id}`,
      GET_ID : (id) => `/properties/${id}`
    },
    LOC : {
      GET_LOC: "/location/get",
    }
    // Add other routes here
  };
  
  export default API_ROUTES;
  