import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:7800/api/auth", data);
      
      console.log("Réponse API:", response.data); // 🔍 Vérifier la réponse API
    
      localStorage.setItem("token", response.data.data);
      localStorage.setItem("role", response.data.role);
    
      if (response.data.role === "admin") {
        navigate("/after-login");
      } else if (response.data.role === "client") {
        navigate("/home");
      } else {
        setError("Rôle non reconnu.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  }    
  
  return (
    <div className="flex justify-center items-center min-h-screen rounded py-2 m-0"
      style={{ backgroundImage: "url('https://wallpapers.com/images/hd/connected-chains-of-dots-and-lines-8w53afda4c6ie6kc.jpg')" }}>
      
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        
        {/* Form Section */}
        <div className="w-2/3 p-8 bg-sky-200">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-gray-700">Login to Your Account</h1>
            
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <button type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Signup Section */}
        <div className="w-1/3 bg-blue-600 text-white flex flex-col justify-center items-center p-8"
          style={{
            backgroundImage: "url('https://cdn.wallpapersafari.com/39/5/JRoYuv.jpg')",
            height: '500px', backgroundSize: 'cover',
            backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
          }}>
          
          <h1 className="text-xl font-semibold">New Here ?</h1>
          <Link to="/signup">
            <button className="mt-20 px-20 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">
              Sign Up
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
