
import { Link } from "react-router-dom";
import { LayoutDashboard, User, PlusCircle, List, Settings } from "lucide-react";




const Navbar = () => {
  const logOut = () => {
        localStorage.clear();
     window.location.href = "/";
    // //   };
  
  };
  return (
    <div className="bg-zinc-600 min-h-screen">
      <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
        <div className="flex items-center justify-between py-2 text-5xl">
          <div className="font-bold text-blue-900 text-xl">
            Mehdi<span className="text-orange-600">Store</span>
          </div>
          <div className="flex items-center text-gray-500 space-x-4">

  <i className="material-icons-outlined p-2 text-xl hover:text-gray-700 transition-colors">notifications</i>

  <div
    className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-10 w-10 ml-2 border-2 border-gray-300 hover:opacity-80 transition-opacity"
    style={{
      backgroundImage: "url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)",
    }}
  ></div> </div>
        </div>
      </div>

      <div className="flex flex-row pt-24 px-10 pb-4">
      <div>
        <Link to="/" className="flex items-center text-slate-50 hover:text-black my-4 w-full px-3 py-2 rounded-lg transition-all hover:bg-gray-100">
          <LayoutDashboard className="w-5 h-5 text-blue-600 mr-2" />
          <span>Dashboard</span>
        </Link>

        <Link to="/profile" className="flex items-center text-slate-50 hover:text-black my-4 w-full px-3 py-2 rounded-lg transition-all hover:bg-gray-100">
          <User className="w-5 h-5 text-indigo-600 mr-2" />
          <span>Profile</span>
        </Link>

        <Link to="/ProductForm" className="flex items-center text-slate-50 hover:text-black my-4 w-full px-3 py-2 rounded-lg transition-all hover:bg-gray-100">
          <PlusCircle className="w-5 h-5 text-purple-600 mr-2" />
          <span>Ajouter un produit</span>
        </Link>

        <Link to="/Admin" className="flex items-center text-slate-50 hover:text-black my-4 w-full px-3 py-2 rounded-lg transition-all hover:bg-gray-100">
          <List className="w-5 h-5 text-sky-600 mr-2" />
          <span>List produits</span>
        </Link>

        <Link to="/settings" className="flex items-center text-slate-50 hover:text-black my-4 w-full px-3 py-2 rounded-lg transition-all hover:bg-gray-100">
          <Settings className="w-5 h-5 text-orange-600 mr-2" />
          <span>Paramètres</span>
        </Link>

  <button
  onClick={logOut}
  className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
>
  Déconnexion  
</button>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
