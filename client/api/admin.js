import localApp from "../helpers/api/localApp";

export const login = (data) => {
  return localApp.post("admin/login", data);
};

export const Tags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          tags: [
            { label: "Action", value: "Action" },
            { label: "Drama", value: "Drama" },
            { label: "Horreur", value: "Horreur" },
          ],
        },
      });
    }, 500);
  });
};
