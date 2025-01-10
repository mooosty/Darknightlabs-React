import axios from "axios";
import "./projectManagerEdit.scss";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { axiosApi } from "../../../../api-services/service";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAPI } from "../../../../api-services/userApis";
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateProjectAPI } from "../../../../api-services/projectApis";
import { synergyAnglesOptions } from "../../../../utils/constants/options";
import { autherProfile, DeleteIcon, PlusIcon, sepratorImage, RightIcon, project } from "../../../../utils/constants/images";
import { AddAngelPopup, DeleteConfirmPopup, ImageUploader, Loader, Select, TagInput } from "../../../../components";
import { addProjectAPI, deleteProjectAPI, addMemberAPI, getProjectsApiById } from "../../../../api-services/projectApis";
import debounce from "lodash.debounce";

const ProjectEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { projectId } = useParams();

  const urlItems = window.location.pathname.split("/");
  const [projectId, setProjectId] = useState(urlItems[urlItems.length - 1]);

  const isAddMode = window.location.pathname === "/project-manager/add";

  const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false);
  const [whoAccessToSynergySide, setWhoAccessToSynergySide] = useState("All Users");
  const [whoAccessToInvestmentSide, setWhoAccessToInvestmentSide] = useState("All Users");
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [angelPopupIndex, setAngelPopupIndex] = useState();
  const [emailValidationResults, setEmailValidationResults] = useState({});

  const {
    projectDetails,
    isLoading: projectApiLoading,
    isSaveLoading: projectSaveApiLoading,
  } = useSelector((state) => state.project);

  const initialValues = {
    project_name: "",
    tags: [],
    twitter_username: "",
    discord_username: "",
    members: [
      {
        name: "",
        position: "",
      },
    ],
    description: "",
    synergy_angles: [
      {
        synergy_angle: "",
      },
    ],
    image: null,
    investments: [
      {
        property: "",
        price: "",
      },
    ],
    open_to_invest: false,
    ambassadors_enabled: false,
    ambassadors_start_date: "",
    ambassadors_end_date: "",
    subject_title: "",
    requirements: [
      {
        frequency: "",
        frequency_count: "",
        period: "",
        type: "",
      },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      if (projectId === "add") {
        handleAddProject();
      } else {
        handleSaveChanges();
      }
    },
  });

  const { values, setFieldValue, setValues, handleChange, handleSubmit } = formik;

  const toggleAddAngelPopupOpen = () => setIsAddAngelPopupOpen(!isAddAngelPopupOpen);

  const handleAddProject = async () => {
    const date = new Date();
    const synergy_obj = {};

    values.synergy_angles.forEach((synergy_angle, index) => {
      synergy_obj[`synergy_angle${index}`] = synergy_angle[`synergy_angle`];
    });

    const investment_obj = {};
    values.investments.forEach(({ property, price }) => {
      investment_obj[property] = price;
    });

    const formData = new FormData();
    formData.append("file", values?.image?.file);
    const response = await axios.post(`${import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = {
      project_name: values.project_name,
      project_info: values.tags.join("#"),
      website: "",
      discord_link: values.discord_username,
      description: values.description,
      twitter: values.twitter_username,
      rating: 0,
      featured: 0,
      image: response.data.image_url,
      date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      synergy_access: true,
      synergy_angles: synergy_obj,
      investments_access: true,
      investments: investment_obj,
    };

    dispatch(addProjectAPI(data)).then((res) => {
      const resArr = values.members.map((member) => {
        const data = {
          userId: member.userId,
          projectId: res.payload.response.data.insertId,
          roles: member.position,
        };
        return dispatch(addMemberAPI(data));
      });

      if (values.ambassadors_enabled && values.requirements.length > 0) {
        const formattedRequirements = {
          tweets: {
            frequency: values.requirements
              .filter((req) => req.type === "tweet")
              .reduce((acc, curr) => acc + Number(curr.frequency_count), 0),
            period: values.requirements.find((req) => req.type === "tweet")?.period || "week",
          },
          videos: {
            frequency: values.requirements
              .filter((req) => req.type === "video")
              .reduce((acc, curr) => acc + Number(curr.frequency_count), 0),
            period: values.requirements.find((req) => req.type === "video")?.period || "month",
          },
        };

        const contentReqData = {
          project_id: res.payload.response.data.insertId,
          title: values.subject_title,
          start_date: values.ambassadors_start_date + " 00:00:00",
          end_date: values.ambassadors_end_date + " 23:59:59",
          requirements: formattedRequirements,
        };

        resArr.push(axiosApi.post(`/content-requirements`, contentReqData));
      }

      Promise.allSettled(resArr).then(() => {
        navigate("/profile");
      });
    });
  };

  const handleSaveChanges = async () => {
    const date = new Date();
    const synergy_obj = {};

    values.synergy_angles.forEach((synergy_angle, index) => {
      synergy_obj[`synergy_angle${index}`] = synergy_angle[`synergy_angle`];
    });

    const investment_obj = {};
    values.investments.forEach(({ property, price }) => {
      investment_obj[property] = price;
    });

    let data = {
      project_id: projectId - 0,
      project_name: values.project_name,
      project_info: values.tags.join("#"),
      website: "",
      discord_link: values.discord_username,
      description: values.description,
      twitter: values.twitter_username,
      rating: 0,
      image: values.image.base64Url,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      synergy_access: true,
      synergy_angles: synergy_obj,
      investments_access: true,
      investments: investment_obj,
    };

    if (values.image.file !== null) {
      const formData = new FormData();
      formData.append("file", values?.image?.file);
      const response = await axios.post(`${import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      data = { ...data, image: response.data.image_url };
    }

    dispatch(
      updateProjectAPI({
        projectId: projectId - 0,
        projectData: data,
      })
    )
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        navigate("/profile");
      })
      .catch((err) => console.error(err));
  };

  const handleProjectDelete = () => {
    dispatch(
      deleteProjectAPI({
        projectIds: [projectId - 0],
      })
    ).then(() => {
      navigate("/profile");
    });
    setIsDeleteConfirmPopupOpen(false);
  };

  const handleAddNewAngel = (data) => {
    toggleAddAngelPopupOpen();
    if (data?.description) {
      synergyAnglesOptions.push({
        label: data?.description,
        value: data?.description,
        tooltip: "Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences",
      });
      setFieldValue("synergy_angles", [
        ...values.synergy_angles.slice(0, angelPopupIndex),
        {
          [`synergy_angle`]: data?.description,
        },
        ...values.synergy_angles.slice(angelPopupIndex + 1),
      ]);
    }
  };

  useEffect(() => {
    if (!isAddMode && projectId) {
      dispatch(getProjectsApiById(projectId)).then((res) => {
        let projectData = res.payload;
        let synergy_angles = projectData?.synergy_angles.map((synergyAngle) => {
          if (!synergyAnglesOptions?.find((data) => data.value == synergyAngle[1])) {
            synergyAnglesOptions.push({
              label: synergyAngle[1],
              value: synergyAngle[1],
              tooltip: "Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences",
            });
          }
          return { [`synergy_angle`]: synergyAngle[1] };
        });

        let investments = projectData.investments.map((investment) => {
          return {
            property: investment[0],
            price: investment[1],
          };
        });

        const members = [];

        const fetchProjectUsers = async () => {
          try {
            const response1 = await axios.get(`https://winwinsocietyweb3.com/api/projectusers/${projectId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("dynamic_authentication_token").replace(/"/g, "")}`,
              },
            });

            members.push(
              ...response1.data.data.map((user) => {
                return { email: user.email, position: user.job_desc };
              })
            );

            const obj = {
              project_name: projectData.project_name,
              tags: projectData?.project_info?.split("#"),
              twitter_username: projectData.twitter,
              discord_username: projectData.discord_link,
              members: [...members],
              description: projectData.description,
              synergy_angles: synergy_angles,
              image: {
                file: null,
                base64Url: projectData.image,
              },
              investments: investments,
              open_to_invest: false,
              ambassadors_enabled: false,
              ambassadors_start_date: "",
              ambassadors_end_date: "",
            };
            console.log("obj------------------------");
            console.log(obj);
            console.log("obj------------------------");
            setValues(obj);
          } catch (error) {}
        };
        console.log(fetchProjectUsers());

        // Fetch members data for the project
        axiosApi.get(`/project-members/${projectId}`).then((response) => {
          // Update email validation results for existing members
          const newEmailValidationResults = {};
          formattedMembers.forEach((member, index) => {
            if (member.email && member.name) {
              newEmailValidationResults[index] = {
                isValid: true,
                message: `User: ${member.name}`,
                username: member.name,
                userId: member.userId,
              };
            }
          });
          setEmailValidationResults(newEmailValidationResults);

          setValues(obj);

          // Set the access states
          setWhoAccessToSynergySide(projectData.synergy_access ? "All Users" : "Selected Users");
          setWhoAccessToInvestmentSide(projectData.investments_access ? "All Users" : "Selected Users");
        });
      });
    }

    dispatch(getUsersAPI());
  }, [projectId, isAddMode]);

  useEffect(() => {
    dispatch(getUsersAPI());
  }, []);

  const validateEmail = async (email, index) => {
    if (!email) {
      setEmailValidationResults((prev) => ({
        ...prev,
        [index]: { isValid: false, message: "", username: "" },
      }));
      return;
    }

    try {
      const response = await axiosApi.get(`/users/email/${email}`);

      if (response.data?.success === 1) {
        setEmailValidationResults((prev) => ({
          ...prev,
          [index]: {
            isValid: true,
            message: `User: ${response.data.data.username}`,
            username: response.data.data.username,
            userId: response.data.data.id,
          },
        }));

        setFieldValue("members", [
          ...values.members.slice(0, index),
          {
            ...values.members[index],
            userId: response.data.data.id,
            name: response.data.data.username,
            email: email,
          },
          ...values.members.slice(index + 1),
        ]);
      }
    } catch (error) {
      setEmailValidationResults((prev) => ({
        ...prev,
        [index]: { isValid: false, message: "User doesn't exist" },
      }));
    }
  };

  const debouncedValidateEmail = debounce(validateEmail, 300);

  useEffect(() => {
    const fetchProjectUsers = async () => {
      try {
        const response = await axios.get(`https://winwinsocietyweb3.com/api/projectusers/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("dynamic_authentication_token").replace(/"/g, "")}`,
          },
        });
        console.log("response.data.data");

        setFieldValue("members", [...response.data.data.map((user) => user.email)]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjectUsers();
  }, [projectId]);
  useEffect(() => {
    console.log("values");
    console.log(values);
  }, [values]);

  return (
    <div className="project_manager_edit_wrapper">
      <div className="content_header">
        <div className="content_left">
          <h2>Profile</h2>
        </div>
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="project_edit_page_data">
        <div className="page_data">
          <div className="page_header">
            <div className="pagination">
              <Link to={"/profile"}>Project involvment</Link>
              <span>
                <RightIcon />
              </span>
              <p>{isAddMode ? "Add Project" : values.project_name}</p>
            </div>
            {!isAddMode && (
              <button className="btn_gray" onClick={handleSaveChanges} disabled={projectSaveApiLoading}>
                {projectSaveApiLoading ? (
                  <>
                    {" "}
                    <Loader loading={projectSaveApiLoading} isItForButton={true} /> <p>Save changes</p>{" "}
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            )}
            {isAddMode && (
              <button className="btn_gray" onClick={handleAddProject} disabled={projectApiLoading}>
                {projectApiLoading ? (
                  <>
                    {" "}
                    <Loader loading={projectApiLoading} isItForButton={true} /> <p>Add Project</p>{" "}
                  </>
                ) : (
                  "Add Project"
                )}
              </button>
            )}
          </div>
          <div className="page_body">
            <div className="page_content">
              <div className="project_author">
                <span className="created_by">Created by</span>
                <img className="auther_profile" src={autherProfile} alt="Author" />
                <span className="auther_name">Joan of Arc</span>
                <span className="auther_post_date">17/11/2023</span>
                <span className="auther_time">16:07</span>
              </div>

              <ImageUploader image={values.image} setFieldValue={setFieldValue} />

              <div className="project_description_form">
                <div className="project_author">
                  <span className="created_by">Created by</span>
                  <img className="auther_profile" src={autherProfile} alt="Author" />
                  <span className="auther_name">Joan of Arc</span>
                  <span className="auther_post_date">17/11/2023</span>
                  <span className="auther_time">16:07</span>
                </div>
                <div className="form_box">
                  <h3 className="project_title">Project details</h3>
                  <div className="form_group">
                    <label htmlFor="projectName">Project Name</label>
                    <input
                      type="text"
                      id="projectName"
                      name="project_name"
                      value={values.project_name}
                      placeholder="Add project name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form_group">
                    <label>Tags</label>
                    <div className="tag_box">
                      <TagInput
                        tags={values.tags}
                        setTags={(value) => {
                          setFieldValue("tags", value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form_item_box">
                    <div className="form_group">
                      <label htmlFor="arc">Twitter</label>
                      <input
                        type="text"
                        id="twitter_username"
                        name="twitter_username"
                        value={values.twitter_username}
                        placeholder="twitter.com/username"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form_group">
                      <label htmlFor="owner">Discord</label>
                      <input
                        type="text"
                        id="discord_username"
                        name="discord_username"
                        value={values.discord_username}
                        placeholder="discordapp.com/users/xxxx/"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <label htmlFor="arc">Members</label>
                  {values.members.map((member, index) => {
                    return (
                      <>
                        <div className="form_item_box" key={index}>
                          <div className="form_group">
                            <input
                              type="email"
                              placeholder="Member email"
                              value={member.email || ""}
                              onChange={(e) => {
                                const email = e.target.value;
                                setFieldValue("members", [
                                  ...values.members.slice(0, index),
                                  {
                                    ...member,
                                    email: email,
                                  },
                                  ...values.members.slice(index + 1),
                                ]);
                                debouncedValidateEmail(email, index);
                              }}
                            />
                            {emailValidationResults[index] && (
                              <div
                                className={`validation-message ${emailValidationResults[index].isValid ? "valid" : "invalid"}`}
                              >
                                {emailValidationResults[index].message}
                              </div>
                            )}
                          </div>

                          <div className="form_group">
                            <Select
                              options={[
                                { label: "Owner", value: "Owner" },
                                { label: "C-Level", value: "C-Level" },
                                { label: "Web3 employee", value: "Web3 employee" },
                                { label: "KOL / Ambassador / Content Creator", value: "KOL / Ambassador / Content Creator" },
                                { label: "Angel Investor", value: "Angel Investor" },
                              ]}
                              value={member.position}
                              onChange={(value) => {
                                setFieldValue("members", [
                                  ...values.members.slice(0, index),
                                  {
                                    ...member,
                                    position: value.value,
                                  },
                                  ...values.members.slice(index + 1),
                                ]);
                              }}
                            />
                          </div>
                          <div
                            className="btn_delete"
                            onClick={() => {
                              setFieldValue("members", [...values.members.slice(0, index), ...values.members.slice(index + 1)]);
                              // Clear validation result for this index
                              setEmailValidationResults((prev) => {
                                const newResults = { ...prev };
                                delete newResults[index];
                                return newResults;
                              });
                            }}
                          >
                            <DeleteIcon />
                          </div>
                        </div>

                        {/* 



                        <div className="form_item_box">
                          <div className="form_group">
                            <Select
                              options={userData?.map((user) => {
                                return {
                                  label: `${user.firstname} ${user.lastname}`,
                                  value: user.id,
                                };
                              })}
                              value={member.userId}
                              onChange={(value) => {
                                setFieldValue("members", [
                                  ...values.members.slice(0, index),
                                  {
                                    name: value.label,
                                    userId: value.value,
                                    position: member.position,
                                  },
                                  ...values.members.slice(index + 1),
                                ]);
                              }}
                            />
                          </div>
                          <div className="form_group">
                            <Select
                              options={[
                                { label: "Owner", value: "Owner" },
                                { label: "Joan of Arc", value: "Joan of Arc" },
                              ]}
                              value={member.position}
                              onChange={(value) => {
                                setFieldValue("members", [
                                  ...values.members.slice(0, index),
                                  {
                                    ...member,
                                    position: value.value,
                                  },
                                  ...values.members.slice(index + 1),
                                ]);
                              }}
                            />
                          </div>
                          <button
                            className="btn_delete"
                            onClick={() => {
                              setFieldValue("members", [
                                ...values.members.slice(0, index),
                                ...values.members.slice(index + 1),
                              ]);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>


 */}
                      </>
                    );
                  })}
                  <button
                    className="btn_gray"
                    onClick={() => {
                      setFieldValue("members", [
                        ...values.members,
                        {
                          member: "",
                          position: "",
                        },
                      ]);
                    }}
                  >
                    Add member
                    <PlusIcon />
                  </button>
                  <br />
                  <div className="form_group">
                    <label htmlFor="description">Project Description</label>
                    <textarea
                      id="description"
                      value={values.description}
                      name="description"
                      rows="7"
                      cols="60"
                      placeholder="Add project Description"
                      onChange={handleChange}
                    >
                      {values.description}
                    </textarea>
                  </div>
                  <div className="seprator-image">
                    <img src={sepratorImage} alt="Separator" />
                  </div>
                  <div className="form_box ambassadors">
                    <div className="toogle-switch">
                      <h3>Ambassadors</h3>
                      <span className="switch">
                        <input
                          id="ambassadors-switch"
                          type="checkbox"
                          checked={values.ambassadors_enabled}
                          onChange={(e) => {
                            setFieldValue("ambassadors_enabled", e.target.checked);
                            if (!e.target.checked) {
                              setFieldValue("requirements", []);
                              setFieldValue("subject_title", "");
                            } else {
                              setFieldValue("requirements", [
                                {
                                  frequency: "",
                                  frequency_count: "",
                                  period: "",
                                  type: "",
                                },
                              ]);
                            }
                          }}
                        />
                        <label htmlFor="ambassadors-switch"></label>
                      </span>
                    </div>
                    {values.ambassadors_enabled && (
                      <>
                        <div className="form_group">
                          <label>Subject title</label>
                          <input
                            type="text"
                            name="subject_title"
                            value={values.subject_title}
                            onChange={handleChange}
                            placeholder="Enter subject title"
                          />
                        </div>

                        {values.ambassadors_start_date ? (
                          <div className="timeframe-section">
                            <label>Timeframe</label>
                            <div className="timeframe-inputs">
                              <div className="form_group">
                                <DatePicker
                                  selected={values.ambassadors_start_date ? new Date(values.ambassadors_start_date) : null}
                                  onChange={(date) => {
                                    setFieldValue("ambassadors_start_date", date ? date.toISOString().split("T")[0] : "");
                                  }}
                                  dateFormat="M/d/yyyy"
                                  placeholderText="Select date"
                                  className="custom-datepicker"
                                  calendarClassName="custom-calendar"
                                  dayClassName={() => "custom-day"}
                                  popperClassName="custom-popper"
                                />
                              </div>
                              <span className="to-text">to</span>
                              <div className="form_group">
                                <DatePicker
                                  selected={values.ambassadors_end_date ? new Date(values.ambassadors_end_date) : null}
                                  onChange={(date) => {
                                    setFieldValue("ambassadors_end_date", date ? date.toISOString().split("T")[0] : "");
                                  }}
                                  dateFormat="M/d/yyyy"
                                  placeholderText="Select date"
                                  className="custom-datepicker"
                                  calendarClassName="custom-calendar"
                                  dayClassName={() => "custom-day"}
                                  popperClassName="custom-popper"
                                />
                              </div>
                              <button
                                className="btn_delete"
                                onClick={() => {
                                  setFieldValue("ambassadors_start_date", "");
                                  setFieldValue("ambassadors_end_date", "");
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            className="btn_gray add-timeframe"
                            onClick={() => {
                              const today = new Date();
                              const nextYear = new Date();
                              nextYear.setFullYear(today.getFullYear() + 1);

                              setFieldValue("ambassadors_start_date", today.toISOString().split("T")[0]);
                              setFieldValue("ambassadors_end_date", nextYear.toISOString().split("T")[0]);
                            }}
                          >
                            Add timeframe <PlusIcon />
                          </button>
                        )}

                        <div className="requirements-section">
                          <label>Requirements</label>
                          {values.requirements.map((requirement, index) => (
                            <div key={index} className="requirement-row">
                              <div className="form_group">
                                <Select
                                  options={[
                                    { label: "Each week", value: "week" },
                                    { label: "Every month", value: "month" },
                                  ]}
                                  value={requirement.frequency}
                                  onChange={(value) => {
                                    setFieldValue("requirements", [
                                      ...values.requirements.slice(0, index),
                                      {
                                        ...requirement,
                                        frequency: value.value,
                                        period: value.value,
                                      },
                                      ...values.requirements.slice(index + 1),
                                    ]);
                                  }}
                                  placeholder="Select frequency"
                                />
                              </div>
                              <div className="form_group">
                                <input
                                  type="number"
                                  min="1"
                                  placeholder="How many times?"
                                  value={requirement.frequency_count || ""}
                                  onChange={(e) => {
                                    setFieldValue("requirements", [
                                      ...values.requirements.slice(0, index),
                                      {
                                        ...requirement,
                                        frequency_count: e.target.value,
                                      },
                                      ...values.requirements.slice(index + 1),
                                    ]);
                                  }}
                                />
                              </div>
                              <div className="form_group">
                                <Select
                                  options={[
                                    { label: "Tweet", value: "tweet" },
                                    { label: "Video", value: "video" },
                                  ]}
                                  value={requirement.type}
                                  onChange={(value) => {
                                    setFieldValue("requirements", [
                                      ...values.requirements.slice(0, index),
                                      {
                                        ...requirement,
                                        type: value.value,
                                      },
                                      ...values.requirements.slice(index + 1),
                                    ]);
                                  }}
                                  placeholder="Select content type"
                                />
                              </div>
                              <button
                                className="btn_delete"
                                onClick={() => {
                                  setFieldValue("requirements", [
                                    ...values.requirements.slice(0, index),
                                    ...values.requirements.slice(index + 1),
                                  ]);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          ))}
                          <button
                            className="btn_gray add-requirement"
                            onClick={() => {
                              setFieldValue("requirements", [
                                ...values.requirements,
                                {
                                  frequency: "",
                                  frequency_count: "",
                                  period: "",
                                  type: "",
                                },
                              ]);
                            }}
                          >
                            Add requirement <PlusIcon />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="seprator-image">
                    <img src={sepratorImage} alt="Separator" />
                  </div>
                  <h3 className="project_title">Synergy</h3>
                  <div className="form_box synergy">
                    <label htmlFor="synergy">Who has access to synergy side?</label>
                    <Select
                      options={[
                        { label: "All Users", value: "All Users" },
                        { label: "Joan of Arc", value: "Joan of Arc" },
                      ]}
                      value={whoAccessToSynergySide}
                      onChange={(value) => {
                        setWhoAccessToSynergySide(value.value);
                      }}
                    />
                  </div>

                  {values.synergy_angles.map((synergy_angle, index) => {
                    return (
                      <>
                        <div className="custom_select">
                          <div className="form_box synergy_selected">
                            {index === 0 && <label>Synergy angles</label>}
                            <Select
                              name="synergy_angles"
                              options={synergyAnglesOptions}
                              placeholder="Select synergy angle"
                              hasAddButton={true}
                              onAdd={() => {
                                toggleAddAngelPopupOpen();
                                setAngelPopupIndex(index);
                              }}
                              value={synergy_angle[`synergy_angle`]}
                              addButtonLabel="Add new angle"
                              onChange={(value) => {
                                setFieldValue("synergy_angles", [
                                  ...values.synergy_angles.slice(0, index),
                                  {
                                    [`synergy_angle`]: value.value,
                                  },
                                  ...values.synergy_angles.slice(index + 1),
                                ]);
                              }}
                            />
                          </div>
                          <button
                            className="btn_delete"
                            onClick={() => {
                              setFieldValue("synergy_angles", [
                                ...values.synergy_angles.slice(0, index),
                                ...values.synergy_angles.slice(index + 1),
                              ]);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </>
                    );
                  })}

                  <button
                    className="btn_gray"
                    onClick={() => {
                      setFieldValue(`synergy_angles`, [
                        ...values.synergy_angles,
                        {
                          synergy_angle: "",
                        },
                      ]);
                    }}
                  >
                    {" "}
                    Add synergy angle
                    <PlusIcon />
                  </button>
                  <div className="invostments-group">
                    <div className="seprator-image">
                      <img src={sepratorImage} alt="Separator" />
                    </div>
                    <h3 className="project_title">Investments</h3>
                    <div className="toogle-switch">
                      <h3>Open to investments</h3>
                      <span className="switch">
                        <input
                          id="switch-rounded"
                          type="checkbox"
                          onChange={(e) => {
                            setFieldValue("open_to_invest", e.target.checked);
                          }}
                        />
                        <label htmlFor="switch-rounded"></label>
                      </span>
                    </div>
                    <div className="form_box synergy">
                      <label htmlFor="synergy">Who has access to investment side?</label>
                      <Select
                        options={[
                          { label: "All Users", value: "All Users" },
                          { label: "Joan of Arc", value: "Joan of Arc" },
                        ]}
                        value={whoAccessToInvestmentSide}
                        onChange={(value) => {
                          setWhoAccessToInvestmentSide(value.value);
                        }}
                      />
                    </div>
                    <div className="invostments-pro-wrap">
                      <label htmlFor="arc">Investment terms</label>
                      {values.investments.map((investment, index) => {
                        return (
                          <>
                            <div className="form_item_box investment_item_box">
                              <div className="form_group">
                                <Select
                                  options={[
                                    { label: "FDV", value: "FDV" },
                                    { label: "FDV 2", value: "FDV 2" },
                                    { label: "FDV 3", value: "FDV 3" },
                                  ]}
                                  value={investment.property}
                                  onChange={(value) => {
                                    setFieldValue("investments", [
                                      ...values.investments.slice(0, index),
                                      {
                                        property: value.value,
                                        price: investment.price,
                                      },
                                      ...values.investments.slice(index + 1),
                                    ]);
                                  }}
                                />
                              </div>

                              <div className="form_group">
                                <input
                                  type="text"
                                  id="property_price"
                                  name="property_price"
                                  value={investment.price}
                                  onChange={(e) => {
                                    setFieldValue("investments", [
                                      ...values.investments.slice(0, index),
                                      {
                                        property: investment.property,
                                        price: e.target.value,
                                      },
                                      ...values.investments.slice(index + 1),
                                    ]);
                                  }}
                                />
                              </div>

                              <button
                                className="btn_delete"
                                onClick={() => {
                                  setFieldValue("investments", [
                                    ...values.investments.slice(0, index),
                                    ...values.investments.slice(index + 1),
                                  ]);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </>
                        );
                      })}

                      <button
                        className="btn_gray"
                        onClick={() => {
                          setFieldValue("investments", [
                            ...values.investments,
                            {
                              property: "",
                              price: "",
                            },
                          ]);
                        }}
                      >
                        Add property
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
                --
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmPopup
        title="Are You Sure ?"
        description={`After once a delete project can't be recover...`}
        open={isDeleteConfirmPopupOpen}
        handleClose={() => {
          setIsDeleteConfirmPopupOpen(false);
        }}
        handleDelete={handleProjectDelete}
      />

      <AddAngelPopup
        open={isAddAngelPopupOpen}
        handleClose={() => toggleAddAngelPopupOpen()}
        handleAddNewAngel={handleAddNewAngel}
        defaultValue={projectId == "add" ? "" : projectDetails.project_name}
      />

      <Loader loading={projectApiLoading} />
    </div>
  );
};

export default ProjectEdit;
