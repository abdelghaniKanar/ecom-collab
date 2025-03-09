// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-stone-400 text-stone shadow-md">
//       <div className="container mx-auto p-6 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-semibold text-stone-900">boutique 101</Link>
//         <div className="space-x-6 text-lg">
//           <Link to="/" className="hover:text-yellow-400">Accueil</Link>
//           <Link to="/cart" className="hover:text-yellow-400">Panier</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";

// // Example user data (Replace with actual user data from state or API)
// const user = {
//   name: "Alice Dupont",
//   image: "https://randomuser.me/api/portraits/women/44.jpg", // Example profile picture
// };

// const Navbar = () => {
//   return (
//     <nav className="bg-stone-400 text-stone shadow-md">
//       <div className="container mx-auto p-6 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-semibold text-stone-900">boutique 101</Link>

//         {/* Navigation Links */}
//         <div className="space-x-6 text-lg flex items-center">
//           <Link to="/" className="hover:text-white">Accueil</Link>

//           {/* Profile Link */}
//           <Link to="/profile" className="flex items-center space-x-2 hover:text-white">
//           <span>{user.name}</span>
//             <img
//               src={user.image}
//               alt={user.name}
//               className="w-8 h-8 rounded-full object-cover border border-white"
//             />
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from "react";
import { Link } from "react-router-dom";

// Example user data (Replace with actual user data from state or API)
const user = {
  name: "Kanar Abdelghani", // Example profile picture
};

const Navbar = () => {
  const handleLogout = () => {
    console.log("User logged out"); // Replace this with actual logout logic
  };

  return (
    <nav className="bg-stone-400 text-stone shadow-md">
      <div className="container mx-auto p-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/productCards" className="text-2xl font-semibold text-stone-700">boutique 101</Link>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg flex items-center">
          <Link to="/productCards" className="text-stone-700 hover:text-stone-500">Accueil</Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-stone-700 hover:text-stone-500 transition"
          >
            Déconnexion
          </button>

          {/* Profile Image as Link */}
          <Link to="/profile">
            <span className="text-stone-700 hover:text-stone-500 transition">{user.name}</span>
          </Link>

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
