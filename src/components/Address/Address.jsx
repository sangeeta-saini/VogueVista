import React, { useState, useEffect } from "react";
import "./Address.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Address() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
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
      const res = await axios.get(`http://localhost:8080/address/${userId}`);
      setAddresses(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateFields()) return;

    try {
      await axios.post("http://localhost:8080/address/add", {
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

      // Clear form
      setName("");
      setMobile("");
      setPincode("");
      setState("");
      setAddress("");
      setStreet("");
      setCity("");
      setAddressType("home");

      // Refresh address list
      fetchAddresses();
      setShowForm(false);
    } catch (err) {
      console.log(err);
      setSubmitError(
        err.response?.data?.message ||
          "Failed to add address. Please try again."
      );
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="address-container">
      <h3 className="address">Address</h3>
      {submitError && <div className="error-message">{submitError}</div>}
      {!showForm && (
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add New Address
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="address-container-2">
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
          </div>

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
                {errors.state && <p className="input-error">{errors.state}</p>}
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
              <button className="add-btn" type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="add-btn" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      )}

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
                    <div className="address-type"> {addr.typeOfAddress}</div>
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
    </div>
  );
}

export default Address;

// import React, { useState } from "react";
// import "./Address.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Address() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [state, setState] = useState("");
//   const [address, setAddress] = useState("");
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [addressType, setAddressType] = useState("home");
//   const [errors, setErrors] = useState({});
//   const [submitError, setSubmitError] = useState("");

//   const navigate = useNavigate();

//   const validateFields = () => {
//     const newErrors = {};

//     if (!pincode.match(/^[1-9][0-9]{5}$/))
//       newErrors.pincode = "Enter a valid 6-digit pincode";
//     if (!state.trim()) newErrors.state = "State is required";
//     if (!address.trim()) newErrors.address = "Address is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError("");
//     if (!validateFields()) return;

//     try {
//       const res = await axios.post("http://localhost:8080/address/add", {
//         name,
//         mobile,
//         pincode,
//         state,
//         address,
//         street,
//         city,
//         addressType,
//       });
//       console.log(res.data);
//     } catch (err) {
//       console.log(err);
//       setSubmitError(
//         err.response?.data?.message ||
//           "Failed to add address. Please try again."
//       );
//     }
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="address-container">
//       <h3 className="address">Address</h3>
//       {submitError && <div className="error-message">{submitError}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="address-container-2">
//           <div>
//             <h4 className="add-name">Name</h4>
//             <input
//               className="add-input"
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <h4 className="add-name">Mobile</h4>
//             <input
//               className="add-input"
//               type="tel"
//               placeholder="Mobile"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="add-container-3">
//           <div className="address-container-4">
//             <div>
//               <h4 className="add-state">Pincode</h4>
//               <input
//                 className="add-pin"
//                 type="text"
//                 maxLength="6"
//                 inputMode="numeric"
//                 placeholder="Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//               />
//               {errors.pincode && (
//                 <p className="input-error">{errors.pincode}</p>
//               )}
//             </div>
//             <div>
//               <h4 className="add-state">State</h4>
//               <input
//                 className="add-pin"
//                 type="text"
//                 placeholder="State"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//               />
//               {errors.state && <p className="input-error">{errors.state}</p>}
//             </div>
//           </div>

//           <div>
//             <h4 className="add">Address</h4>
//             <input
//               className="add-input"
//               type="text"
//               placeholder="(House No., Building, Street, Area)"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             {errors.address && <p className="input-error">{errors.address}</p>}
//           </div>

//           <div>
//             <h4 className="add">Locality</h4>
//             <input
//               className="add-input"
//               type="text"
//               placeholder="Locality"
//               value={street}
//               onChange={(e) => setStreet(e.target.value)}
//             />
//           </div>

//           <div>
//             <h4 className="add">City</h4>
//             <input
//               className="add-input"
//               type="text"
//               placeholder="City/District"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </div>

//           <h4 className="add">Type of Address</h4>
//           <div className="add-container-5">
//             <div>
//               <label className="add-home">
//                 <input
//                   className="add-radio"
//                   type="radio"
//                   name="addressType"
//                   value="home"
//                   checked={addressType === "home"}
//                   onChange={(e) => setAddressType(e.target.value)}
//                 />
//                 Home
//               </label>
//             </div>
//             <div>
//               <label className="add-home">
//                 <input
//                   className="add-radio"
//                   type="radio"
//                   name="addressType"
//                   value="office"
//                   checked={addressType === "office"}
//                   onChange={(e) => setAddressType(e.target.value)}
//                 />
//                 Office
//               </label>
//             </div>
//           </div>

//           <div className="btn-container">
//             <button className="add-btn" type="button" onClick={handleCancel}>
//               Cancel
//             </button>
//             <button className="add-btn" type="submit">
//               Save
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Address;
