import "./home.scss";
import { Navbar, SocietyCard } from "../../components";
import { MaskIcon, sepratorImage, StileArrow, TwitterXIcon } from "../../utils/constants/images";
import {
  heroFirstImage,
  heroSecondImage,
  servicesCardImg1,
  servicesCardImg2,
  servicesCardImg3,
  servicesCardImg4,
  MembersImage1,
  MembersImage2,
  MembersImage3,
  MembersImage4,
  MembersImage5,
  MembersImage6,
  MembersImage7,
  MembersImage8,
  recordImage1,
  recordImage2,
  recordImage3,
  recordImage4,
  recordImage5,
  recordImage6,
  recordImage7,
  recordImage8,
  recordImage9,
  recordImage10,
  recordImage11,
  recordImage12,
  recordImage13,
  recordImage14,
  recordImage15,
  recordImage16,
} from "../../utils/constants/images";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "../../utils/routes/routes";
import { DynamicConnectButton, DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useDispatch, useSelector } from "react-redux";
import {
  createInviteAPI,
  createTwitterUserAPI,
  getTwitterUserAPI,
  updateUserWalletAPI,
} from "../../api-services/userApis";
import { createUserAPI } from "../../api-services";
import { storeAuthData } from "../../store/slice/authSlice";
import { useRef } from "react";

const servicesCardData = [
  {
    title: "Nft startegy",
    desc: "We will dive deep into every angle of your project through calls with you and your team and will then determine each and every element to maximize chances of success, both in the short term (initial community building and hype) and in the long term (floor price, community sentiment and strength, etc.)",
    img: servicesCardImg1,
  },
  {
    title: "Founders mastermind",
    desc: "We will dive deep into every angle of your project through calls with you and your team and will then determine each and every element to maximize chances of success, both in the short term (initial community building and hype) and in the long term (floor price, community sentiment and strength, etc.)",
    img: servicesCardImg2,
  },
  {
    title: "Marketing, Collaborations & Partnerships",
    desc: "We will dive deep into every angle of your project through calls with you and your team and will then determine each and every element to maximize chances of success, both in the short term (initial community building and hype) and in the long term (floor price, community sentiment and strength, etc.)",
    img: servicesCardImg3,
  },
  {
    title: "PR, VC raise, token listing...etc",
    desc: "We will dive deep into every angle of your project through calls with you and your team and will then determine each and every element to maximize chances of success, both in the short term (initial community building and hype) and in the long term (floor price, community sentiment and strength, etc.)",
    img: servicesCardImg4,
  },
];

const societyCardData = [
  {
    name: "Mirko Basil Dölger",
    post: "CEO Owned.gg",
    img: MembersImage1,
  },

  {
    name: "JR Walker",
    post: "Sony",
    img: MembersImage2,
  },

  {
    name: "Petr Martynov",
    post: "Head of Growth Morningstar Ventures",
    img: MembersImage3,
  },

  {
    name: "CryptoGorilla",
    post: "Founder Gorilla Labs",
    img: MembersImage4,
  },

  {
    name: "Michael Liou",
    post: "Head of Gaming Shima Capital Founder Paladins DAO",
    img: MembersImage5,
  },

  {
    name: "Adam Justice",
    post: "Head of Marketing Shrapnel",
    img: MembersImage6,
  },

  {
    name: "Jian Tam",
    post: "Founder BIG3 Ownership Samurai Saga",
    img: MembersImage7,
  },

  {
    name: "Gavin Thomas",
    post: "Founder Obscu.ro",
    img: MembersImage8,
  },

  {
    name: "Igor K.Founder",
    post: "Founder DeQuest",
    img: MembersImage1,
  },
];

const recordCardData = [
  {
    name: "Assassin's Creed Smart Collectibles",
    img: recordImage1,
  },
  {
    name: "DeQuest",
    img: recordImage2,
  },
  {
    name: "Unix Gaming /Owned.gg",
    img: recordImage3,
  },
  {
    name: "GORJS by NYX /L'Oréal",
    img: recordImage4,
  },
  {
    name: "Virtua Metaverse",
    img: recordImage5,
  },
  {
    name: "Nitro League",
    img: recordImage6,
  },
  {
    name: "BitBrawl",
    img: recordImage7,
  },
  {
    name: "Stashed (ex Ember)",
    img: recordImage8,
  },
  {
    name: "Neo Tokyo",
    img: recordImage9,
  },
  {
    name: "Assassin's Creed Smart Collectibles",
    img: recordImage10,
  },
  {
    name: "The Bornless",
    img: recordImage11,
  },
  {
    name: "Symbiogenesis(by Square Enix)",
    img: recordImage12,
  },
  {
    name: "KlubList",
    img: recordImage13,
  },
  {
    name: "Steady Stack",
    img: recordImage14,
  },
  {
    name: "BYTE CITY",
    img: recordImage15,
  },
  {
    name: "dotmoovs",
    img: recordImage16,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authDetails } = useSelector((state) => state.auth);

  const handleAuthResponse = async (response) => {
    console.log(response)
    if (response?.isAuthenticated) {
      //   const jwtToken = getAuthToken();



      console.log("response", response);

      const twitterId = response.user.verifiedCredentials[1].oauthAccountId;

      const fetchTwitterUser = async () => {
        const {
          payload: { data },
        } = await dispatch(getTwitterUserAPI(twitterId)).then((res) => res);

        return data;
      };
      const existingUser = await fetchTwitterUser();

      if (!existingUser.length) {
        const payloadUser = {
          key: response?.user.verifiedCredentials[1].oauthAccountId,
          firstname: response?.user.verifiedCredentials[1].publicIdentifier,
          profile_picture: response.user.verifiedCredentials[1].oauthAccountPhotos[0],
          username: response.user.verifiedCredentials[1].oauthUsername,
          lastname: "",
          birthday: "28-07-1998",
          bio: response.user.verifiedCredentials[1].oauthMetadata.description,
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
          name: response.user.verifiedCredentials[1].publicIdentifier,
          email: response.user.email,
          password: `${response.user.id}@@@${response.user.email}`,
        };

        dispatch(createUserAPI(chatPayload));

        payloadUser.id = twitterUser.insertId;
   
        dispatch(storeAuthData({ response, user: payloadUser }));

        const referralId = localStorage.getItem("referral_id");
        if (referralId) {
          try {
            // Create invite
            await dispatch(
              createInviteAPI({
                invited_user: twitterUser.insertId,
                invite_user: parseInt(referralId),
              })
            );

            // Update wallet
            await dispatch(
              updateUserWalletAPI({
                invited_user: twitterUser.insertId,
              })
            );

            // Clear referral ID
            localStorage.removeItem("referral_id");
          } catch (error) {
            console.error("Error processing referral:", error);
          }
        }

        navigate(ROUTER.dashboard);
      } else {
        dispatch(storeAuthData({ response, user: existingUser[0] }));
        navigate(ROUTER.dashboard);
      }
    }
  };

  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const membersRef = useRef(null);
  const partnersRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToTop = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (section) => {
    if (section === "Home") {
      homeRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Services") {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Members") {
      membersRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Partners") {
      partnersRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "About") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home_wrapper">
      <Navbar onScroll={handleScroll} />
      <DynamicContextProvider
        theme={"dark"}
        settings={{
          environmentId: import.meta.env.VITE_DYNAMIC_APP_ID,
          events: {
            onAuthSuccess: handleAuthResponse,
            onLogout: (data) => {
              console.log(data);
            },
          },
        }}
      >
        <div className="home_main_wrap" ref={homeRef}>
          <div className="hero_main_wrap">
            <div className="hero_wrap">
              <div className="hero_wws_wrap">
                <div className="hero_left wws_left">
                  <div className="title">wws</div>
                  <div className="half_divider"></div>
                  <div className="des">
                    Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur
                    neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.
                  </div>
                  {authDetails ? (
                    <Link to={ROUTER.dashboard} className="hero_btn">
                      To dashboard
                    </Link>
                  ) : (
                    <DynamicConnectButton buttonClassName="hero_btn">To dashboard</DynamicConnectButton>
                  )}
                </div>
                <div className="hero_right wws_img">
                  <img src={heroFirstImage} alt=" " className="hero_image" />
                </div>
              </div>
              <div className="hero_poow_wrap">
                <div className="hero_right">
                  <img src={heroSecondImage} alt=" " className="hero_image" />
                </div>
                <div className="hero_left">
                  <div className="title">poow</div>
                  <div className="half_divider"></div>
                  <div className="des">
                    Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur
                    neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.
                  </div>
                  {authDetails ? (
                    <Link to={ROUTER.dashboard} className="hero_btn">
                      To dashboard
                    </Link>
                  ) : (
                    <DynamicConnectButton buttonClassName="hero_btn">To dashboard</DynamicConnectButton>
                  )}
                </div>
              </div>
            </div>

            <div className="seprator-image">
              <img src={sepratorImage} alt="Separator" />
            </div>
          </div>
          <div className="services_main_wrap" id="services" ref={servicesRef}>
            <div className="services_wrap">
              <div className="wrap_header">Services</div>
              <div className="card_wrap">
                {servicesCardData.map((data) => {
                  return (
                    <div key={data.title} className="services_card">
                      <div className="card_img">
                        <img src={data.img} alt=" " />
                      </div>
                      <div className="card_head">{data.title}</div>
                      <div className="card_desc">{data.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="society_main_wrap" id="members" ref={membersRef}>
            <div className="society_wrap">
              <div className="wrap_header">THE WIN-WIN SOCIETY</div>
              <div className="card_wrap">
                {societyCardData.slice(0, 8).map((data, cardIndex) => {
                  return (
                    <div className="card_box" key={cardIndex}>
                      <SocietyCard name={data.name} post={data.post} img={data.img} />
                    </div>
                  );
                })}
              </div>
              <button onClick={() => navigate(ROUTER.societyFullList)} className="more_btn">
                Load more
              </button>
            </div>
          </div>
          <div className="record_main_wrap" id="partners" ref={partnersRef}>
            <div className="record_wrap">
              <div className="wrap_header">TRACK RECORD & PARTNERS</div>
              <div className="record_card_wrap">
                {recordCardData.map((data, recordIndex) => {
                  return (
                    <div key={recordIndex} className="record_card_box">
                      <div className="record_card">
                        <div className="card_img">
                          <img src={data.img} alt="" />
                        </div>
                        <div className="card_name">{data.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="about_main_wrap" id="about" ref={aboutRef}>
            <div className="about_wrap" id="about">
              <div className="wrap_header">ABOUT </div>
              <div className="text_wrap">
                <p>
                  Darknight Labs is an NFT Strategy, Marketing and Partnership agency. Known for providing
                  paradigm-shifting strategies to ensure optimal NFT drops by their partners, Darknight Labs is one of
                  the most well- connected entities in the Web3 space, with hundreds of warm connections to founders and
                  core team members from the very best projects, communities, VCs and brands in the space.
                </p>
                <p>
                  Our typical client is a Web2 brand or company that want to enter the NFT space in the most optimal
                  way, without replicating the deadly mistakes (that we&apos;ve observed many major brands commit), or a
                  Web3 project, either a crypto game, a defi platform, a tool or any other value-adding product, looking
                  to tap into the NFT community the right way, while performing a successful mint.
                </p>
                <p>
                  In addition, through high level partners, Darknight Labs help their partners through other services
                  when needed, such as high tier token listings (Binance, KuCoin, Coinbase), blockchain partnerships /
                  grants (Polygon, Arbitrum, Binance Chain, Venom, etc), high tier launchpads (Polkastarter, DAOmaker,
                  etc.), and more. Darknight Labs is also a Web3 founders mastermind with the purpose of making Web3
                  founders with a great product and a healthy mindset synergize, cross-pollinate audiences,
                  cross-integrate assets and utilities, and cross-market. The goal is to create the ultimate win-win
                  Web3 ecosystem.
                </p>
              </div>
            </div>
          </div>

          <div className="footer_wrap">
            <div className="text_wrap">
              <div className="icons">
                <a
                  href="https://x.com/DarknightLabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://x.com/DarknightLabs", "_blank");
                  }}
                >
                  <TwitterXIcon />
                </a>
                <a
                  href="https://discord.com/darknightlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://discord.com/darknightlabs", "_blank");
                  }}
                >
                  <MaskIcon />
                </a>
              </div>
              <div className="text">© All rights reserved to Darkknight Labs 2025</div>
            </div>
            <div className="up_arrow">
              <button onClick={scrollToTop} className="scroll-to-top-btn">
                <StileArrow />
              </button>
            </div>
          </div>
          <div className="widget-container">
            <DynamicWidget variant="modal" buttonClassName="extra_button" />
          </div>
        </div>
      </DynamicContextProvider>
    </div>
  );
};

export default Home;
