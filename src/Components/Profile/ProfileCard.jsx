import React, { useState, useRef, useCallback } from "react";
import "./ProfileCard.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Utility/Loading/Loading";

const ProfileCard = ({ userData }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: userData.fullName,
    email: userData.email,
    mobile: userData.mobile,
    avatar: userData.avatar,
    address: userData.address,
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [previewPic, setPreviewPic] = useState(profile.avatar?.secure_url);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPic(imageUrl);
      setTempProfile((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const triggerFilePicker = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setPreviewPic(profile.avatar?.secure_url);
    setEditing(false);
  };

  const navigate = useNavigate();
  const handleCheckOrders = () => {
    navigate("/Orders");
  };

  // compare temp vs profile
  const isEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (obj1[key].toString().trim() !== obj2[key].toString().trim()) return false;
    }
    return true;
  };

  const handleSave = useCallback(async () => {
    if (isEqual(tempProfile, profile)) {
      toast.warn("Do some changes for updating");
      return;
    }

    const formData = new FormData();
    Object.keys(tempProfile).forEach((key) => {
      if (tempProfile[key] !== profile[key] && tempProfile[key] !== "") {
        formData.append(key, tempProfile[key]);
      }
    });

    const fileInput = fileInputRef.current?.files?.[0];
    if (fileInput) {
      formData.append("avatar", fileInput);
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/info`,
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );
      setEditing(false);
      toast.success("Profile update successfully");
    } catch (error) {
      toast.error(error.response?.data || "Network error");
    }
    setLoading(false);
  }, [profile, tempProfile]);

  return (
    <div className="profile-card">
      {loading ? (
        <Loading messge={"updating profile..."} />
      ) : (
        <>
          <div className="profile-content">
            {/* Profile image */}
            <div className="profile-image-section">
              <div className="profile-pic-wrapper">
                {!previewPic ? (
                  <Avatar
                    name={profile.fullName}
                    textSizeRatio={1.2}
                    round={true}
                    size="120"
                  />
                ) : (
                  <img src={previewPic} alt="Profile" className="profile-pic" />
                )}
              </div>

              {editing && (
                <div
                  className="camera-icon-profile"
                  onClick={triggerFilePicker}
                >
                  <i className="bi bi-camera"></i>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              {!editing && (
                <button
                  className="edit-btn"
                  onClick={() => setEditing((prev) => !prev)}
                >
                  Edit
                </button>
              )}
            </div>

            {/* Profile info */}
            <div className="profile-info-section">
              {editing ? (
                <form
                  className="profile-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {[
                    {
                      label: "Full Name",
                      name: "fullName",
                      value: tempProfile.fullName,
                    },
                    {
                      label: "Email",
                      name: "email",
                      value: tempProfile.email,
                      type: "email",
                    },
                    {
                      label: "Mobile Number",
                      name: "mobile",
                      value: tempProfile.mobile,
                      type: "tel",
                    },
                    {
                      label: "Address",
                      name: "address",
                      value: tempProfile.address,
                    },
                  ].map((field, i) => (
                    <div className="input-group-profile" key={i}>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={field.value}
                        onChange={handleInputChange}
                        required
                        placeholder=" "
                      />
                      <label>{field.label}</label>
                    </div>
                  ))}
                  <div className="button-group">
                    <button type="button" className="save" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-display">
                  <h3>{profile.fullName}</h3>
                  <p>{profile.email}</p>
                  <p>{profile.mobile}</p>
                  <p>{profile.address}</p>

                  {userData.role === "buyer" && (
                    <button className="orders-btn" onClick={handleCheckOrders}>
                      Check Orders
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {userData.role === "seller" && (
            <button className="orders-btn">Check orders</button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileCard;
