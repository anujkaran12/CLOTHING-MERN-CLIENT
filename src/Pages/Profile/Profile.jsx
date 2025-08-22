import "./Profile.css";
import ProfileCard from "../../Components/Profile/ProfileCard";
import { useSelector } from "react-redux";


import Loading from "../../Components/Utility/Loading/Loading";

import NotLoggedIn from "../../Components/Utility/ErrorStates/NotLoggedIn";


const Profile = () => {
  
  
  const { userData, loading, error } = useSelector(
    (state) => state.userReducer
  );
 
  return (
    <div className="profile-container">
      {loading ? (
        <Loading />
      ) : error ? (
        <NotLoggedIn/>
      ) : userData ? (
        <ProfileCard userData={userData} />
      ) : (
        <NotLoggedIn/>
      )}
    </div>
  );
};

export default Profile;
