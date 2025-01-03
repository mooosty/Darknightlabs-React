import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.scss';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate('/dashboard');
  };

  const handleAuthResponse = async (response) => {
    if (response?.isAuthenticated) {
      const twitterId = response.user.verifiedCredentials[2].oauthAccountId;

      const fetchTwitterUser = async () => {
        const {
          payload: { data },
        } = await dispatch(getTwitterUserAPI(twitterId)).then((res) => res);
        return data;
      };
      const existingUser = await fetchTwitterUser();

      if (!existingUser.length) {
        const payloadUser = {
          key: response?.user.verifiedCredentials[2].oauthAccountId,
          firstname: response?.user.verifiedCredentials[2].publicIdentifier,
          profile_picture: response.user.verifiedCredentials[2].oauthAccountPhotos[0],
          username: response.user.verifiedCredentials[2].oauthUsername,
          lastname: "",
          birthday: "28-07-1998",
          bio: response.user.verifiedCredentials[2].oauthMetadata.description,
          email: response.user.email,
          validated: 1,
          password: `${response.user.id}@@@${response.user.email}`,
        };

        const createTwitterUser = async () => {
          const {
            payload: { data },
          } = await dispatch(createTwitterUserAPI(payloadUser)).then((res) => res);
          return data;
        };
        const twitterUser = await createTwitterUser();

        const chatPayload = {
          _id: twitterUser.insertId,
          name: response.user.verifiedCredentials[2].publicIdentifier,
          email: response.user.email,
          password: `${response.user.id}@@@${response.user.email}`,
        };

        dispatch(createUserAPI(chatPayload));

        payloadUser.id = twitterUser.insertId;
        dispatch(storeAuthData({ response, user: payloadUser }));

        const referralId = localStorage.getItem('referral_id');
        if (referralId) {
          try {
            await dispatch(createInviteAPI({
              invited_user: twitterUser.insertId,
              invite_user: parseInt(referralId)
            }));
            await dispatch(updateUserWalletAPI({
              invited_user: twitterUser.insertId
            }));
            localStorage.removeItem('referral_id');
          } catch (error) {
            console.error('Error processing referral:', error);
          }
        }
        navigate('/dashboard');
      } else {
        dispatch(storeAuthData({ response, user: existingUser[0] }));
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="welcome-page">
      <div className="project_content_body">
        <div className="page_data">
          <div className="popup">
            <div className="popup-content">
              <h2>Welcome to The Win-Win Society!</h2>
              <p>Explore the various features:</p>
              <ul>
                <li><strong>Projects:</strong> Manage and view your projects.</li>
                <li><strong>Synergies:</strong> Collaborate with others.</li>
                <li><strong>Investment:</strong> Explore investment opportunities.</li>
                <li><strong>Chat:</strong> Communicate with your network.</li>
                <li><strong>Karma:</strong> Track your contributions and rewards.</li>
              </ul>
              <p>Some tabs are blocked. Please complete your profile to unlock them.</p>
              <button className='btn_gray' onClick={handleGoToProfile}>Go to Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 