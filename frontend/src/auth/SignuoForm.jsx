import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "client", // Par défaut, c'est un client
    secretKey: "", // Ajout pour Admin
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      if (formData.role !== "admin") {
        delete payload.secretKey;
      }

      const { data: res } = await axios.post(
        "http://localhost:7800/api/users/leo",
        payload
      );

      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://st3.depositphotos.com/30440304/33807/i/450/depositphotos_338077292-stock-photo-abstract-background-colorful-gradient-vibrant.jpg')",
      }}
    >
      <div className="w-full max-w-4xl flex rounded-lg shadow-lg overflow-hidden">
        <div
          className="hidden lg:block lg:w-5/12 bg-cover"
          style={{
            backgroundImage:
              "url('https://wallpapers.com/images/hd/messi-argentina-orange-light-hvcxki4x3hw2fde3.jpg')",
          }}
        ></div>
        <div className="w-full lg:w-7/12 bg-sky-200 dark:bg-gray-700 p-6">
          <h3 className="text-2xl text-center text-gray-800 dark:text-white mb-6">
            Create an Account!
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Sélection du rôle */}
            <div className="flex space-x-4">
              <label className="text-gray-700 dark:text-white">Role:</label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={formData.role === "client"}
                  onChange={handleChange}
                />
                Client
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>

            {/* Champ "Secret Key" visible uniquement pour Admin */}
            {formData.role === "admin" && (
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="secretKey">
                  Secret Key
                </label>
                <input
                  id="secretKey"
                  name="secretKey"
                  type="text"
                  value={formData.secretKey}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow text-gray-700 dark:text-white dark:bg-gray-800"
                  placeholder="Enter Secret Key"
                />
              </div>
            )}

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow text-gray-700 dark:text-white dark:bg-gray-800"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow text-gray-700 dark:text-white dark:bg-gray-800"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow text-gray-700 dark:text-white dark:bg-gray-800"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow text-gray-700 dark:text-white dark:bg-gray-800"
                placeholder="**********"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="text-center">
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
              >
                Register Account
              </button>
            </div>
          </form>
          <hr className="my-6 border-t" />
          <div className="text-center">
            <Link to="/" className="text-sm text-blue-500 hover:text-blue-800">
              Already have an account? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
