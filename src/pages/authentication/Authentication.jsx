import "./authentication.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DynamicContextProvider, DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import { ROUTER } from "../../utils/routes/routes";
import { useEffect } from "react";
import { storeAuthData } from "../../store/slice/authSlice";
import img from "../../assets/hero-phone.png";
import axios from "axios";

import { createTwitterUserAPI, getTwitterUserAPI } from "../../api-services/userApis";
import { createUserAPI } from "../../api-services";
// import { createTwitterUserAPI } from "../../api-services/chatApis";
import { useState } from "react";
const Authentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [didRun, setdidRun] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authDetails } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth);

  const handleAuthResponse = async (response) => {
    if (response?.isAuthenticated) {
      //   const jwtToken = getAuthToken();

      const twitterId = response.user.verifiedCredentials[2].oauthAccountId;

      console.log("twitterId", twitterId);
      const fetchTwitterUser = async () => {
        const {
          payload: { data },
        } = await dispatch(getTwitterUserAPI(twitterId)).then((res) => res);
        console.log("data", data);
        return data;
      };
      const existingUser = await fetchTwitterUser();

      if (!existingUser.length) {
        console.log("inside payload");

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
      } else {
        dispatch(storeAuthData({ response, user: existingUser[0] }));
      }
    } else {
      console.log("Authentication failed");
    }
  };

  // useEffect(() => {
  //   if (authDetails) {
  //     navigate(`/${ROUTER.projects}`);
  //   }
  // }, [authDetails]);

  useEffect(() => {
    if (authDetails) {
      const fetchProjects = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://winwinsocietyweb3.com/api/userprojects/${userData.userId}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZmNjg4Y2I0LTk3MmItNDZhNy1iZWMwLTJjOTEyNTVlYjUyMyJ9.eyJraWQiOiI2ZjY4OGNiNC05NzJiLTQ2YTctYmVjMC0yYzkxMjU1ZWI1MjMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJpc3MiOiJhcHAuZHluYW1pY2F1dGguY29tL2QxZmZjZWVhLTg5Y2UtNGM4Zi1iYTMyLTBiODAyZmFiODgyMiIsInN1YiI6IjM4NDM3NWQ1LTJiNjUtNDQzMC1iZTQ4LWYwYzE4N2Q0YTg5ZiIsInNpZCI6Ijk2YWJhMGJiLTU3YWYtNGU4YS1hOTkyLTc0ZTYzNmNhZGU4YSIsImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiZW52aXJvbm1lbnRfaWQiOiJkMWZmY2VlYS04OWNlLTRjOGYtYmEzMi0wYjgwMmZhYjg4MjIiLCJsaXN0cyI6W10sIm1pc3NpbmdfZmllbGRzIjpbXSwidmVyaWZpZWRfY3JlZGVudGlhbHMiOlt7ImFkZHJlc3MiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJjaGFpbiI6ImVpcDE1NSIsImlkIjoiYzY0NjFlZjAtNmMxZC00ZjdhLWI4NDUtODEzMTg5NDIzYTU5IiwibmFtZV9zZXJ2aWNlIjp7fSwicHVibGljX2lkZW50aWZpZXIiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJ3YWxsZXRfbmFtZSI6InR1cm5rZXloZCIsIndhbGxldF9wcm92aWRlciI6ImVtYmVkZGVkV2FsbGV0Iiwid2FsbGV0X3Byb3BlcnRpZXMiOnsidHVybmtleVN1Yk9yZ2FuaXphdGlvbklkIjoiMmI1M2RmODktNWM0My00MzNmLTg2Y2MtZGJmZDg5ZTEyNDNiIiwidHVybmtleUhEV2FsbGV0SWQiOiJkMmVlOWMwZC0wNTkwLTVmMmEtYjMwMi1kODFiYjZjMTA4NzMiLCJpc0F1dGhlbnRpY2F0b3JBdHRhY2hlZCI6ZmFsc2UsInR1cm5rZXlVc2VySWQiOiI0Zjk2MjE3My0wMzAwLTRiODAtODBhOC05MzRiMmM5NTRiN2MiLCJpc1Nlc3Npb25LZXlDb21wYXRpYmxlIjpmYWxzZSwidmVyc2lvbiI6IlYxIn0sImZvcm1hdCI6ImJsb2NrY2hhaW4iLCJsYXN0U2VsZWN0ZWRBdCI6IjIwMjQtMTItMDZUMTU6MTI6MjguOTUzWiIsInNpZ25JbkVuYWJsZWQiOmZhbHNlfSx7ImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiaWQiOiJmNDU3NzJkNy0yM2FmLTQ3ZmQtYmQ1YS1lZjJjMGRmNzcxNmQiLCJwdWJsaWNfaWRlbnRpZmllciI6InNhbXNhd2xvMTAwQGdtYWlsLmNvbSIsImZvcm1hdCI6ImVtYWlsIiwic2lnbkluRW5hYmxlZCI6dHJ1ZX0seyJpZCI6IjZlZGM1NmM5LTQwN2QtNDlmYi04NGQ4LTZmMmI4ZTI5NDQxZSIsInB1YmxpY19pZGVudGlmaWVyIjoiTGFoY2VuIiwiZm9ybWF0Ijoib2F1dGgiLCJvYXV0aF9wcm92aWRlciI6InR3aXR0ZXIiLCJvYXV0aF91c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIiwib2F1dGhfZGlzcGxheV9uYW1lIjoiTGFoY2VuIiwib2F1dGhfYWNjb3VudF9pZCI6IjEyMTQzMjk3NjIzNzE1NTk0MjQiLCJvYXV0aF9hY2NvdW50X3Bob3RvcyI6WyJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIl0sIm9hdXRoX2VtYWlscyI6W10sIm9hdXRoX21ldGFkYXRhIjp7ImlkIjoiMTIxNDMyOTc2MjM3MTU1OTQyNCIsIm5hbWUiOiJMYWhjZW4iLCJwdWJsaWNfbWV0cmljcyI6eyJmb2xsb3dlcnNfY291bnQiOjIsImZvbGxvd2luZ19jb3VudCI6MTUsInR3ZWV0X2NvdW50IjowLCJsaXN0ZWRfY291bnQiOjAsImxpa2VfY291bnQiOjIsIm1lZGlhX2NvdW50IjowfSwicHJvZmlsZV9pbWFnZV91cmwiOiJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIiwiZGVzY3JpcHRpb24iOiIiLCJ1c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIn0sInNpZ25JbkVuYWJsZWQiOnRydWV9XSwibGFzdF92ZXJpZmllZF9jcmVkZW50aWFsX2lkIjoiNmVkYzU2YzktNDA3ZC00OWZiLTg0ZDgtNmYyYjhlMjk0NDFlIiwiZmlyc3RfdmlzaXQiOiIyMDI0LTEyLTA1VDE1OjAzOjExLjAxOFoiLCJsYXN0X3Zpc2l0IjoiMjAyNC0xMi0wNlQxNToxMjoyOC41NzNaIiwibmV3X3VzZXIiOmZhbHNlLCJtZXRhZGF0YSI6e30sInZlcmlmaWVkQ3JlZGVudGlhbHNIYXNoZXMiOnsiYmxvY2tjaGFpbiI6ImQ0NzQxYmJjMjA3OWVlOTI4M2EzNmExMGI4ODg3ODdlIiwiZW1haWwiOiI0MzVjY2FiZTEzNmFlNTk3NWNhYTE3ZWVlM2NlNTI0NCIsIm9hdXRoIjoiNjliOWMwYjliMmRmMDk1NWU3NjMwNmM0YTQ0NjNiNjIifSwiaWF0IjoxNzMzNDk3OTQ5LCJleHAiOjE3MzYwODk5NDl9.KoZZuNpDFD8nuGvtz--5qbuUQuXpqHxG5Vfnph-piOZb62eR7DvbP_pJAq48FU4WonGSix75CNeuwzbJhuu2pv3ihgCoPFb77mSRWFBUrgQIBnbYCx_wcVQk-I20_gugsR-pVoGbhpA4EMweOeJ3rSWmQ9TtFJhkCIHgVj6hYr4wVzxDq0pbWYgN-nIS6hGF6l4rMQvq_5aQY9ySLGNstvo9spW6H52R9UuzMSv2V54DX_0RixZr-yMSJhZivUUU8f53DW5iGktZJH5KsN5egzmHR5Yp3JUMy2NAc2cRPHXOAUZ1SjKKqOUsyBFRO1H-w1KjJU1NoH-egFlv7xU9DPtv8i_Ls9SyokRS7WOsgLI64ah29dSDcIJf5k0C1Ovh12qpQynE0JM8J7ZzgkW0-sBTDlcL9wZKzXMI58t0fHUG9-mcjoBtfecakWKwe2xfoXs_3cn3lhyKHQD0I0bxDiz6v_YpCC84i7Xk3N3Fn1_8SOzg3HKFbyTfUtlKZPpWdlK_RltQdDTjivBpz6v-irNZChvAljrczwiw8fln62mB49VAuT2XBI_sLVAalr1CdJCFnVg3TEe53Q-hznT9pxdUF_9QP1b6aTs0X2N60B4Tk3TOfFGgt0Njn6usbkR63fh676v5fFL5y3aibP8JSNDlYRCdowmjAz8oVoMGblc`,
            },
          });

          console.log(response.data.data);
          const response1 = await axios.get(`https://winwinsocietyweb3.com/api/projects/`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZmNjg4Y2I0LTk3MmItNDZhNy1iZWMwLTJjOTEyNTVlYjUyMyJ9.eyJraWQiOiI2ZjY4OGNiNC05NzJiLTQ2YTctYmVjMC0yYzkxMjU1ZWI1MjMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJpc3MiOiJhcHAuZHluYW1pY2F1dGguY29tL2QxZmZjZWVhLTg5Y2UtNGM4Zi1iYTMyLTBiODAyZmFiODgyMiIsInN1YiI6IjM4NDM3NWQ1LTJiNjUtNDQzMC1iZTQ4LWYwYzE4N2Q0YTg5ZiIsInNpZCI6Ijk2YWJhMGJiLTU3YWYtNGU4YS1hOTkyLTc0ZTYzNmNhZGU4YSIsImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiZW52aXJvbm1lbnRfaWQiOiJkMWZmY2VlYS04OWNlLTRjOGYtYmEzMi0wYjgwMmZhYjg4MjIiLCJsaXN0cyI6W10sIm1pc3NpbmdfZmllbGRzIjpbXSwidmVyaWZpZWRfY3JlZGVudGlhbHMiOlt7ImFkZHJlc3MiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJjaGFpbiI6ImVpcDE1NSIsImlkIjoiYzY0NjFlZjAtNmMxZC00ZjdhLWI4NDUtODEzMTg5NDIzYTU5IiwibmFtZV9zZXJ2aWNlIjp7fSwicHVibGljX2lkZW50aWZpZXIiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJ3YWxsZXRfbmFtZSI6InR1cm5rZXloZCIsIndhbGxldF9wcm92aWRlciI6ImVtYmVkZGVkV2FsbGV0Iiwid2FsbGV0X3Byb3BlcnRpZXMiOnsidHVybmtleVN1Yk9yZ2FuaXphdGlvbklkIjoiMmI1M2RmODktNWM0My00MzNmLTg2Y2MtZGJmZDg5ZTEyNDNiIiwidHVybmtleUhEV2FsbGV0SWQiOiJkMmVlOWMwZC0wNTkwLTVmMmEtYjMwMi1kODFiYjZjMTA4NzMiLCJpc0F1dGhlbnRpY2F0b3JBdHRhY2hlZCI6ZmFsc2UsInR1cm5rZXlVc2VySWQiOiI0Zjk2MjE3My0wMzAwLTRiODAtODBhOC05MzRiMmM5NTRiN2MiLCJpc1Nlc3Npb25LZXlDb21wYXRpYmxlIjpmYWxzZSwidmVyc2lvbiI6IlYxIn0sImZvcm1hdCI6ImJsb2NrY2hhaW4iLCJsYXN0U2VsZWN0ZWRBdCI6IjIwMjQtMTItMDZUMTU6MTI6MjguOTUzWiIsInNpZ25JbkVuYWJsZWQiOmZhbHNlfSx7ImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiaWQiOiJmNDU3NzJkNy0yM2FmLTQ3ZmQtYmQ1YS1lZjJjMGRmNzcxNmQiLCJwdWJsaWNfaWRlbnRpZmllciI6InNhbXNhd2xvMTAwQGdtYWlsLmNvbSIsImZvcm1hdCI6ImVtYWlsIiwic2lnbkluRW5hYmxlZCI6dHJ1ZX0seyJpZCI6IjZlZGM1NmM5LTQwN2QtNDlmYi04NGQ4LTZmMmI4ZTI5NDQxZSIsInB1YmxpY19pZGVudGlmaWVyIjoiTGFoY2VuIiwiZm9ybWF0Ijoib2F1dGgiLCJvYXV0aF9wcm92aWRlciI6InR3aXR0ZXIiLCJvYXV0aF91c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIiwib2F1dGhfZGlzcGxheV9uYW1lIjoiTGFoY2VuIiwib2F1dGhfYWNjb3VudF9pZCI6IjEyMTQzMjk3NjIzNzE1NTk0MjQiLCJvYXV0aF9hY2NvdW50X3Bob3RvcyI6WyJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIl0sIm9hdXRoX2VtYWlscyI6W10sIm9hdXRoX21ldGFkYXRhIjp7ImlkIjoiMTIxNDMyOTc2MjM3MTU1OTQyNCIsIm5hbWUiOiJMYWhjZW4iLCJwdWJsaWNfbWV0cmljcyI6eyJmb2xsb3dlcnNfY291bnQiOjIsImZvbGxvd2luZ19jb3VudCI6MTUsInR3ZWV0X2NvdW50IjowLCJsaXN0ZWRfY291bnQiOjAsImxpa2VfY291bnQiOjIsIm1lZGlhX2NvdW50IjowfSwicHJvZmlsZV9pbWFnZV91cmwiOiJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIiwiZGVzY3JpcHRpb24iOiIiLCJ1c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIn0sInNpZ25JbkVuYWJsZWQiOnRydWV9XSwibGFzdF92ZXJpZmllZF9jcmVkZW50aWFsX2lkIjoiNmVkYzU2YzktNDA3ZC00OWZiLTg0ZDgtNmYyYjhlMjk0NDFlIiwiZmlyc3RfdmlzaXQiOiIyMDI0LTEyLTA1VDE1OjAzOjExLjAxOFoiLCJsYXN0X3Zpc2l0IjoiMjAyNC0xMi0wNlQxNToxMjoyOC41NzNaIiwibmV3X3VzZXIiOmZhbHNlLCJtZXRhZGF0YSI6e30sInZlcmlmaWVkQ3JlZGVudGlhbHNIYXNoZXMiOnsiYmxvY2tjaGFpbiI6ImQ0NzQxYmJjMjA3OWVlOTI4M2EzNmExMGI4ODg3ODdlIiwiZW1haWwiOiI0MzVjY2FiZTEzNmFlNTk3NWNhYTE3ZWVlM2NlNTI0NCIsIm9hdXRoIjoiNjliOWMwYjliMmRmMDk1NWU3NjMwNmM0YTQ0NjNiNjIifSwiaWF0IjoxNzMzNDk3OTQ5LCJleHAiOjE3MzYwODk5NDl9.KoZZuNpDFD8nuGvtz--5qbuUQuXpqHxG5Vfnph-piOZb62eR7DvbP_pJAq48FU4WonGSix75CNeuwzbJhuu2pv3ihgCoPFb77mSRWFBUrgQIBnbYCx_wcVQk-I20_gugsR-pVoGbhpA4EMweOeJ3rSWmQ9TtFJhkCIHgVj6hYr4wVzxDq0pbWYgN-nIS6hGF6l4rMQvq_5aQY9ySLGNstvo9spW6H52R9UuzMSv2V54DX_0RixZr-yMSJhZivUUU8f53DW5iGktZJH5KsN5egzmHR5Yp3JUMy2NAc2cRPHXOAUZ1SjKKqOUsyBFRO1H-w1KjJU1NoH-egFlv7xU9DPtv8i_Ls9SyokRS7WOsgLI64ah29dSDcIJf5k0C1Ovh12qpQynE0JM8J7ZzgkW0-sBTDlcL9wZKzXMI58t0fHUG9-mcjoBtfecakWKwe2xfoXs_3cn3lhyKHQD0I0bxDiz6v_YpCC84i7Xk3N3Fn1_8SOzg3HKFbyTfUtlKZPpWdlK_RltQdDTjivBpz6v-irNZChvAljrczwiw8fln62mB49VAuT2XBI_sLVAalr1CdJCFnVg3TEe53Q-hznT9pxdUF_9QP1b6aTs0X2N60B4Tk3TOfFGgt0Njn6usbkR63fh676v5fFL5y3aibP8JSNDlYRCdowmjAz8oVoMGblc`,
            },
          });
          const ids = response.data.data.map((project) => project._project_id);
          console.log("ids");
          console.log(ids);
          const x = response1.data.filter((project) => {
            return ids.includes(project.project_id);
          });

          setData(x);
          setdidRun(true);
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProjects();
    }
  }, [authDetails]);

  useEffect(() => {
    if (authDetails && didRun) {
      console.log(userData);
      if (data.length > 0) {
        navigate(`/${ROUTER.projects}`);
      } else {
        navigate(`/${ROUTER.profile}`);
      }
    }
  }, [data, authDetails, didRun]);

  return (
    <div className="twitterLoginWrp">
      <div className="twitterLoginBody">
        <DynamicContextProvider
          theme={"dark"}
          settings={{
            environmentId: import.meta.env.VITE_DYNAMIC_APP_ID,
            events: {
              onAuthSuccess: handleAuthResponse,
              onLogout: (data) => {
                console.log("data", data);
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
  );
};

export default Authentication;