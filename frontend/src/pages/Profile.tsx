import { ReviewList } from 'components/Detail/ProductReview';
import { LoginCard } from 'components/Profile/';
import React from 'react';

const Profile = () => {
  return (
    <div className="loginPage">
      {/* <LoginCard /> */}
      <ReviewList />
    </div>
  );
};

export default Profile;
