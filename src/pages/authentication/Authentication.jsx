import "./authentication.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicContextProvider, DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import { ROUTER } from "../../utils/routes/routes";
import { useEffect ,useState} from "react";
import { storeAuthData } from "../../store/slice/authSlice";
// import img from "../../assets/hero-phone.png";
import axios from "axios";
import { heroFirstImage, heroSecondImage } from "../../utils/constants/images";
import { createTwitterUserAPI, getTwitterUserAPI, createInviteAPI, updateUserWalletAPI } from "../../api-services/userApis";
import { createUserAPI } from "../../api-services";
// import { createTwitterUserAPI } from "../../api-services/chatApis";

const Authentication = () => {
  const [data, setData] = useState([]);
  const [didRun, setdidRun] = useState(false);
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('ref');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authDetails } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    if (refId) {
      localStorage.setItem('referral_id', refId);
    }
  }, [refId]);

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
      } else {
        dispatch(storeAuthData({ response, user: existingUser[0] }));
      }
    }
  };

  // useEffect(() => {
  //   if (authDetails) {
  //     navigate(`/${ROUTER.projects}`);
  //   }
  // }, [authDetails]);

  useEffect(() => {
    console.log(authDetails)
    if (authDetails) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`https://winwinsocietyweb3.com/api/userprojects/${userData.userId}`, {
            headers: {
              Authorization: `Bearer ${authDetails}`,
            },
          });

          const response1 = await axios.get(`https://winwinsocietyweb3.com/api/projects/`, {
            headers: {
              Authorization: `Bearer ${authDetails}`,
            },
          });
          const ids = response.data.data.map((project) => project._project_id);

          const x = response1.data.filter((project) => {
            return ids.includes(project.project_id);
          });

          setData(x);
          setdidRun(true);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProjects();
    }
  }, [authDetails]);

  useEffect(() => {
    if (authDetails && didRun) {
      if (data.length > 0) {
        navigate(`/${ROUTER.projects}`);
      } else {
        navigate(`/welcome`);
      }
    }
  }, [data, authDetails, didRun]);

  return (
    <div className="authentication_wrap">
      <div className="twitterLoginWrp">
        <div className="twitterLoginBody">
          <DynamicContextProvider
            theme={"dark"}
            settings={{
              environmentId: import.meta.env.VITE_DYNAMIC_APP_ID,
              events: {
                onAuthSuccess: handleAuthResponse,
                onLogout: (data) => {
                  console.log('data', data)
                },
              },
            }}
          >
            <div className="widget-container">
              <DynamicEmbeddedWidget background="with-border" />
            </div>
          </DynamicContextProvider>
        </div>
      </div>
      <div className="hero_main_wrap">
        <div className="hero_wrap">
          <div className="hero_wws_wrap">
            <div className="hero_left wws_left">
              <div className="title">wws</div>
              <div className="half_divider"></div>
              <div className="des">Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.</div>
              <button to={ROUTER.profile} className='hero_btn'>To dashboard</button>
            </div>
            <div className="hero_right wws_img">
              <img src={heroFirstImage} alt=" " className='hero_image' />
            </div>
          </div>
          <div className="hero_poow_wrap">
            <div className="hero_right">
              <img src={heroSecondImage} alt=" " className='hero_image' />
            </div>
            <div className="hero_left">
              <div className="title">poow</div>
              <div className="half_divider"></div>
              <div className="des">Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.</div>
              <button to={ROUTER.profile} className='hero_btn'>To dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
