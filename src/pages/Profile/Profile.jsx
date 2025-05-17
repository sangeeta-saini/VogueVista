import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
// import "./Address.css";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const [view, setView] = useState("profile"); // "profile" or "address"

  // Profile states
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");

  // Address states
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [addressType, setAddressType] = useState("home");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/address/${userId}`);
      setAddresses(res.data);
      setShowForm(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!pincode.match(/^[1-9][0-9]{5}$/))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!state.trim()) newErrors.state = "State is required";
    if (!address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/detail/profile`, {
        name,
        mobile,
        email,
        gender,
        birth,
        alternateMobile,
      });
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateFields()) return;

    try {
      await axios.post(`${API_BASE_URL}/address/add`, {
        name,
        mobile,
        pincode,
        state,
        address,
        street,
        city,
        addressType,
        userId,
      });

      // Clear address form
      setName("");
      setMobile("");
      setPincode("");
      setState("");
      setAddress("");
      setStreet("");
      setCity("");
      setAddressType("home");

      fetchAddresses();
      setShowForm(false);
    } catch (err) {
      console.log(err);
      setSubmitError(err.response?.data?.message || "Failed to add address.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const renderAddressSection = () => (
    <div className="address-container">
      <h3 className="address">Address</h3>
      {submitError && <div className="error-message">{submitError}</div>}

      {!showForm && (
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add New Address
        </button>
      )}

      {showForm && (
        <form onSubmit={handleAddressSubmit}>
          <div className="profile-containter-4">
            {/* <div className=""> */}
            <div>
              <h4 className="add-name">Name</h4>
              <input
                className="add-input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h4 className="add-name">Mobile</h4>
              <input
                className="add-input"
                type="tel"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            {/* </div> */}

            <div className="add-container-3">
              <div className="address-container-4">
                <div>
                  <h4 className="add-state">Pincode</h4>
                  <input
                    className="add-pin"
                    type="text"
                    maxLength="6"
                    inputMode="numeric"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  {errors.pincode && (
                    <p className="input-error">{errors.pincode}</p>
                  )}
                </div>
                <div>
                  <h4 className="add-state">State</h4>
                  <input
                    className="add-pin"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  {errors.state && (
                    <p className="input-error">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="add">Address</h4>
                <input
                  className="add-input"
                  type="text"
                  placeholder="(House No., Building, Street, Area)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <p className="input-error">{errors.address}</p>
                )}
              </div>

              <div>
                <h4 className="add">Locality</h4>
                <input
                  className="add-input"
                  type="text"
                  placeholder="Locality"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div>
                <h4 className="add">City</h4>
                <input
                  className="add-input"
                  type="text"
                  placeholder="City/District"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <h4 className="add">Type of Address</h4>
              <div className="add-container-5">
                <label className="add-home">
                  <input
                    className="add-radio"
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={addressType === "home"}
                    onChange={(e) => setAddressType(e.target.value)}
                  />
                  Home
                </label>
                <label className="add-home">
                  <input
                    className="add-radio"
                    type="radio"
                    name="addressType"
                    value="office"
                    checked={addressType === "office"}
                    onChange={(e) => setAddressType(e.target.value)}
                  />
                  Office
                </label>
              </div>

              <div className="btn-container">
                <button
                  className="add-btn"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="add-btn" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {!showForm && (
        <div className="saved-addresses">
          <h3 className="saved-head">Saved Addresses</h3>
          {addresses.length === 0 ? (
            <p>No addresses saved yet.</p>
          ) : (
            <ul>
              {addresses.map((addr) => (
                <li key={addr._id}>
                  <div className="address-box">
                    <div className="saved-add">
                      <div className="address-name">{addr.name}</div>
                      <div className="address-type">{addr.typeOfAddress}</div>
                    </div>
                    <div className="address-detail">
                      {addr.address}, {addr.street} <br />
                      {addr.city} - {addr.pincode}
                      <br />
                      {addr.state}
                      <br />
                      Mobile: {addr.mobile}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="profile-container-1">
      <div className="page-heading">Account</div>

      <div className="page-container">
        <div className="sidebar">
          <div className="orders">
            <button
              className="profile-button"
              onClick={() => setView("profile")}
            >
              Profile Details
            </button>
          </div>
          <div className="orders">
            <button
              className="profile-button"
              onClick={() => setView("address")}
            >
              Address
            </button>
          </div>
          <div className="orders">
            <a href="/order">Order</a>
          </div>
          <div className="orders">
            <a href="/wishlist">Wishlist</a>
          </div>
        </div>

        <div className="profile-container">
          {view === "profile" && (
            <>
              <div className="profile-heading">
                <h3>Profile Details</h3>
              </div>
              <div className="profile-containter-4">
                <div className="name-edit">
                  <h5 className="edit-title">Full Name</h5>
                  <input
                    className="edit-input"
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mobile-edit">
                  <h5 className="edit-title">Mobile Number</h5>
                  <input
                    className="edit-input"
                    placeholder="Mobile Number"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="email-edit">
                  <h5 className="edit-title">Email</h5>
                  <input
                    className="edit-input"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="gender-box">
                  <div className="gender-edit">
                    <label htmlFor="male" className="gender-label">
                      Male
                    </label>
                    <input
                      className="gender-radio"
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="gender-edit">
                    <label htmlFor="female" className="gender-label">
                      Female
                    </label>
                    <input
                      className="gender-radio"
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="date-edit">
                  <h5 className="edit-title">Date of Birth</h5>
                  <input
                    className="edit-input"
                    placeholder="Date Of Birth"
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
                <div className="mobile-edit">
                  <h5 className="edit-title">Alternate Mobile Number</h5>
                  <input
                    className="edit-input"
                    placeholder="Alternate Mobile Number"
                    type="tel"
                    value={alternateMobile}
                    onChange={(e) => setAlternateMobile(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className="saveedit-btn"
                    onClick={handleProfileSubmit}
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </>
          )}

          {view === "address" && renderAddressSection()}
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Profile.css";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [gender, setGender] = useState("");
//   const [birth, setBirth] = useState("");
//   const [alternateMobile, setAlternateMobile] = useState("");
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting:", {
//       name,
//       mobile,
//       email,
//       gender,
//       birth,
//       alternateMobile,
//     });

//     try {
//       const res = await axios.post("http://localhost:8080/detail/profile", {
//         name,
//         mobile,
//         email,
//         gender,
//         birth,
//         alternateMobile,
//       });
//       console.log(res.data.success);
//       navigate("/profile");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="profile-container-1">
//       <div className="page-heading">Account</div>

//       <div className="page-container">
//         <div className="sidebar">
//           <div className="orders">
//             <a href="/profile">Profile Details</a>
//           </div>
//           <div className="orders">
//             <a href="/orders">Orders</a>
//           </div>
//           <div className="orders">
//             <a href="/wishlist">Wishlist</a>
//           </div>
//           <div className="orders">
//             <a href="/address">Address</a>
//           </div>
//           {/* <div className="orders">Help center</div> */}
//         </div>

//         <div className="profile-container">
//           <div className="profile-heading">
//             <h3>Profile Details</h3>
//           </div>
//           <div className="profile-containter-4">
//             <div className="name-edit">
//               <h5 className="edit-title">Full Name</h5>
//               <input
//                 className="edit-input"
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mobile-edit">
//               <h5 className="edit-title">Mobile Number</h5>
//               <input
//                 className="edit-input"
//                 type="tel"
//                 placeholder="Mobile Number"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//               />
//             </div>
//             <div className="email-edit">
//               <h5 className="edit-title">Email</h5>
//               <input
//                 className="edit-input"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="gender-box">
//               <div className="gender-edit">
//                 <label htmlFor="male" className="gender-label">
//                   Male
//                 </label>
//                 <input
//                   className="edit-input-1"
//                   type="radio"
//                   id="male"
//                   name="gender"
//                   value="male"
//                   checked={gender === "male"}
//                   onChange={(e) => setGender(e.target.value)}
//                 />
//               </div>
//               <div className="gender-edit">
//                 <label htmlFor="female" className="gender-label">
//                   Female
//                 </label>
//                 <input
//                   className="edit-input-1"
//                   type="radio"
//                   id="female"
//                   name="gender"
//                   value="female"
//                   checked={gender === "female"}
//                   onChange={(e) => setGender(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="date-edit">
//               <h5 className="edit-title">Date of Birth</h5>
//               <input
//                 className="edit-input"
//                 type="date"
//                 placeholder="BirthDay"
//                 value={birth}
//                 onChange={(e) => setBirth(e.target.value)}
//               />
//             </div>
//             <div className="mobile-edit">
//               <h5 className="edit-title">Alternate Mobile Number</h5>
//               <input
//                 className="edit-input"
//                 type="tel"
//                 placeholder="Alternate Mobile Number"
//                 value={alternateMobile}
//                 onChange={(e) => setAlternateMobile(e.target.value)}
//               />
//             </div>
//             <div>
//               <button className="saveedit-btn" onClick={handleSubmit}>
//                 Save Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
