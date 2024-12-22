import axios from "axios";
import "./projectManagerEdit.scss";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAPI } from "../../api-services/userApis";
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateProjectAPI } from "../../api-services/projectApis";
import { synergyAnglesOptions } from "../../utils/constants/options";
import { AddAngelPopup, DeleteConfirmPopup, ImageUploader, Loader, Select, TagInput } from "../../components";
import { addProjectAPI, deleteProjectAPI, addMemberAPI, getProjectsApiById } from "../../api-services/projectApis";
import { SearchIcon, autherProfile, DeleteIcon, PlusIcon, sepratorImage, RightIcon } from "../../utils/constants/images";

const ProjectManagerEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false);
  const [whoAccessToSynergySide, setWhoAccessToSynergySide] = useState("All Users");
  const [whoAccessToInvestmentSide, setWhoAccessToInvestmentSide] = useState("All Users");
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [angelPopupIndex, setAngelPopupIndex] = useState();

  const userData = useSelector((state) => state.user.users);
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

      Promise.allSettled(resArr).then(() => {
        navigate("/project-manager");
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
      date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
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
        navigate("/project-manager");
      })
      .catch((err) => console.error(err));
  };

  const handleProjectDelete = () => {
    dispatch(
      deleteProjectAPI({
        projectIds: [projectId - 0],
      })
    ).then(() => {
      navigate("/project-manager");
    });
    setIsDeleteConfirmPopupOpen(false);
  };

  const handleAddNewAngel = (data) => {
    toggleAddAngelPopupOpen();
    if (data?.description) {
      synergyAnglesOptions.push({
        label: data?.description,
        value: data?.description,
        tooltip:
          "Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences",
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
    if (projectId && projectId !== "add") {
      dispatch(getProjectsApiById(projectId)).then((res) => {
        let projectData = res.payload;
        let synergy_angles = projectData?.synergy_angles.map((synergyAngle) => {
          if (!synergyAnglesOptions?.find((data) => data.value == synergyAngle[1])) {
            synergyAnglesOptions.push({
              label: synergyAngle[1],
              value: synergyAngle[1],
              tooltip:
                "Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences",
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

        const obj = {
          project_name: projectData.project_name,
          tags: projectData?.project_info?.split("#"),
          twitter_username: projectData.twitter,
          discord_username: projectData.discord_link,
          members: [
            {
              name: "",
              position: "",
            },
          ],
          description: projectData.description,
          synergy_angles: synergy_angles,
          image: {
            file: null,
            base64Url: projectData.image,
          },
          investments: investments,
          open_to_invest: false,
        };
        setValues(obj);
      });
    }

    dispatch(getUsersAPI());
  }, [projectId]);

  useEffect(() => {
    dispatch(getUsersAPI());
  }, []);

  return (
    <>
      <div className="content_header">
        <div className="content_left">
          <h2>Projects Manager</h2>
          <div className="search_box">
            <span className="search_icon"><SearchIcon /></span>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="project_edit_page_data">
        <div className="page_data">
          <div className="page_header">
            <div className="pagination">
              <Link to={"/project-manager"}>Project manager</Link>
              <span>
                <RightIcon />
              </span>
              <p>{values.project_name}</p>
            </div>
            {projectId !== "add" && (
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
            {projectId === "add" && (
              <button className="btn_gray" onClick={handleAddProject} disabled={projectApiLoading}>
                {projectApiLoading ? (
                  <>
                    {" "}
                    <Loader loading={projectApiLoading} isItForButton={true} /> <p> Add Project</p>{" "}
                  </>
                ) : (
                  " Add Project"
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
                    Add synergy angle<PlusIcon />
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
              </div>

              <div className="delete_project_btn">
                <button
                  className="btn_delete"
                  disabled={projectId === "add"}
                  onClick={() => {
                    setIsDeleteConfirmPopupOpen(true);
                  }}
                >
                  <DeleteIcon /> Delete project
                </button>
                <button type="submit" className="btn_gray" onClick={handleSubmit}>
                  {" "}
                  {projectId !== "add" ? "Save changes" : "Add Project"}
                </button>
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
    </>
  );
};

export default ProjectManagerEdit;
