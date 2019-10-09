const blogs = [
  {
    likes: 16,
    title: "fake ",
    author: "kage",
    url: "mdalksdas",
    user: {
      username: "TEST_USER",
      name: "Pepe",
      id: "5d898a97ccb5c16d170347a1"
    },
    id: "5d90bea69662c39885bd6bdb"
  },
  {
    likes: 15,
    title: "peter should",
    author: "Manuel",
    url: "http://localhost:3003",
    user: {
      username: "Peter!!",
      name: "Pepe",
      id: "5d883e37be5c1b66b97c9b52"
    },
    id: "5d8982153a6d0f6b95f6d4d7"
  },
  {
    likes: 15,
    title: "peter should",
    author: "Manuel",
    url: "http://localhost:3003",
    user: {
      username: "Peter!!",
      name: "Pepe",
      id: "5d883e37be5c1b66b97c9b52"
    },
    id: "5d8989b4a4fb836ccde40cf0"
  }
];

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };
