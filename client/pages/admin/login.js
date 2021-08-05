import Layout from "../../components/layouts/Layout";
import addToast, { TOAST_ERROR } from "../../helpers/toastr";

const Login = () => {
  const handleSubmit = (event) => {
    event && event.preventDefault();
    const form = new FormData(event.target);

    const values = {};
    form.forEach((value, key) => {
      values[key] = value;
    });

    try {
    } catch (error) {
      addToast(error.message || "Une erreur est survenue.", TOAST_ERROR);
    }
  };

  return (
    <Layout>
      <div className="mt-52">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 border-gray-400 border rounded-md shadow-lg w-96 mx-auto"
        >
          <div className="w-full p-2 text-center">
            <label>Login</label>
            <input
              name="login"
              type="text"
              className="w-full px-3 py-1 rounded-md border-2 text-lg transition duration-200 border-gray-300 hover:border-2 hover:border-blue-600 focus:border-blue-700"
              placeholder="login"
            />
          </div>
          <div className="w-full p-2 text-center">
            <label>Password</label>
            <input
              name="Password"
              type="password"
              className="w-full px-3 py-1 rounded-md border-2 text-lg transition duration-200 border-gray-300 hover:border-2 hover:border-blue-600 focus:border-blue-700"
              placeholder="Password"
            />
          </div>

          <div className="text-center my-2">
            <button
              className="px-4 py-1 text-lg rounded-md bg-blue-600 text-white hover:bg-blue-700"
              type="submit"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
