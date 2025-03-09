// import React from "react";
// import { useNavigate } from "react-router-dom";

// // Example user data (Replace with actual user data from state or API)
// const user = {
//   name: "kanar Abdelghani",
//   email: "kanar.ab@example.com",
//   image: "/assets/jewelry.jpg",
//   address: "123 Hb FBS, Maroc",
//   phone: "+212 6 12 34 56 78",
// };

// const Profile = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     console.log("User logged out"); // Replace with real logout logic
//     navigate("/"); // Redirect to home after logout
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-stone-200 shadow-lg rounded-lg mt-10 mb-10">
//       {/* Profile Image */}
//       <div className="flex flex-col items-center">
//         <img
//           src={user.image}
//           alt="Profile"
//           className="w-24 h-24 rounded-full border-4 border-stone-500 object-cover"
//         />
//         <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
//         <p className="text-gray-600">{user.email}</p>
//       </div>

//       {/* User Details */}
//       <div className="mt-6 space-y-4">
//         <div className="flex justify-between">
//           <span className="text-gray-700 font-semibold">Adresse :</span>
//           <span className="text-gray-600">{user.address}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-700 font-semibold">Téléphone :</span>
//           <span className="text-gray-600">{user.phone}</span>
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div className="mt-6 text-center">
//         <button
//           onClick={handleLogout}
//           className="bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-500 transition"
//         >
//           Déconnexion
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Example user data (Replace with real user data from state or API)
const initialUser = {
        name: "kanar Abdelghani",
        email: "kanar.ab@example.com",
        image: "/assets/jewelry.jpg",
        address: "123 Hb FBS, Maroc",
        phone: "+212 6 12 34 56 78",
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(initialUser);

  const handleLogout = () => {
    console.log("User logged out"); // Replace with real logout logic
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
    console.log("User updated:", updatedUser); // Replace with real update logic (API call)
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted"); // Replace with real delete logic
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-stone-200 shadow-lg rounded-lg mt-10 mb-10">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        
        {isEditing ? (
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              className="border px-2 py-1 rounded-lg mt-2"
            />
          ) : (
            <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
          )}

          
        {isEditing ? (
            <input
              type="text"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              className="border px-2 py-1 rounded-lg mt-2"
            />
          ) : (
            <p className="text-gray-600">{user.email}</p>
          )}
      </div>

      {/* User Details (Editable) */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-around">
          <span className="text-gray-700 font-semibold">Adresse :</span>
          {isEditing ? (
            <input
              type="text"
              value={updatedUser.address}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })}
              className="border px-2 py-1 rounded-lg"
            />
          ) : (
            <span className="text-gray-600">{user.address}</span>
          )}
        </div>
        <div className="flex justify-around">
          <span className="text-gray-700 font-semibold">Téléphone :</span>
          {isEditing ? (
            <input
              type="text"
              value={updatedUser.phone}
              onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
              className="border px-2 py-1 rounded-lg"
            />
          ) : (
            <span className="text-gray-600">{user.phone}</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 text-center space-y-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-500 transition"
          >
            Sauvegarder
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-500 transition"
          >
            Modifier
          </button>
        )}

        <button
          onClick={handleDeleteAccount}
          className="block w-full mt-3 bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-500 transition"
        >
          Supprimer le compte
        </button>

        <button
          onClick={handleLogout}
          className="block w-full mt-3 bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-500 transition"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Profile;
