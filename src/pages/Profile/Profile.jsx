import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", {
      name,
      mobile,
      email,
      gender,
      birth,
      alternateMobile,
    });

    try {
      const res = await axios.post("http://localhost:8080/detail/profile", {
        name,
        mobile,
        email,
        gender,
        birth,
        alternateMobile,
      });
      console.log(res.data.success);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container-1">
      <div className="page-heading">Account</div>

      <div className="page-container">
        <div className="sidebar">
          <div className="orders">
            <a href="/orders">Orders</a>
          </div>
          <div className="orders">
            <a href="/wishlist">Wishlist</a>
          </div>
          <div className="orders">
            <a href="/address">Address</a>
          </div>
          <div className="orders">Help center</div>
        </div>

        <div className="profile-container">
          <div className="profile-heading">
            <h3>Profile Details</h3>
          </div>
          <div className="profile-containter-4">
            <div className="name-edit">
              <h5 className="edit-title">Full Name</h5>
              <input
                className="edit-input"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mobile-edit">
              <h5 className="edit-title">Mobile Number</h5>
              <input
                className="edit-input"
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="email-edit">
              <h5 className="edit-title">Email</h5>
              <input
                className="edit-input"
                type="email"
                placeholder="Email"
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
                  className="edit-input-1"
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
                  className="edit-input-1"
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
                type="date"
                placeholder="BirthDay"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </div>
            <div className="mobile-edit">
              <h5 className="edit-title">Alternate Mobile Number</h5>
              <input
                className="edit-input"
                type="tel"
                placeholder="Alternate Mobile Number"
                value={alternateMobile}
                onChange={(e) => setAlternateMobile(e.target.value)}
              />
            </div>
            <div>
              <button className="saveedit-btn" onClick={handleSubmit}>
                Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
