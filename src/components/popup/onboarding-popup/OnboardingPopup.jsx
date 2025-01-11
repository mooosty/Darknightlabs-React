import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfileAPI } from "../../../api-services/userApis";
import { addProjectAPI, addMemberAPI } from "../../../api-services/projectApis";
import { Select } from "../../../components";
import { synergyAnglesOptions } from "../../../utils/constants/options";
import { AddAngelPopup } from "../../../components";
import { Download } from "../../../utils/SVGs/SVGs";
import axios from "axios";
import "./onboardingPopup.scss";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../../utils/routes/routes";

const CustomImageUploader = ({ image, setFieldValue }) => {
  const handleUploadImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const img = new Image();
      img.onload = function () {
        let base64Url = reader.result;
        setFieldValue("image", {
          file: file,
          base64Url: base64Url,
        });
      };
      img.src = reader.result;
    };
    reader.onerror = function (error) {
      console.error("Error: ", error);
    };
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .png, .svg, .jpeg";
    input.onchange = (e) => {
      if (e.target.files[0]) {
        handleUploadImage(e.target.files[0]);
      }
    };
    input.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`image_uploader ${image?.base64Url ? "has_image" : ""}`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {!image?.base64Url ? (
        <div className="upload_content">
          <div className="upload_icon">
            <Download />
          </div>
          <div className="upload_text">
            <div className="main_text">
              Click to upload<span className="required">*</span>
            </div>
            <div className="sub_text">or drag and drop</div>
            <div className="file_types">SVG, PNG, JPG (max. 800x400px)</div>
          </div>
        </div>
      ) : (
        <>
          <img src={image.base64Url} alt="Project" />
          <div className="image_overlay">
            <span className="change_image_text">Change Image</span>
          </div>
        </>
      )}
    </div>
  );
};

const OnboardingPopup = ({ open, handleClose, userId , setExistingProjects  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authDetails } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [customRole, setCustomRole] = useState("");
  const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false);
  const [angelPopupIndex, setAngelPopupIndex] = useState(0);
  const [formData, setFormData] = useState({
    // Profile Data
    firstname: "",
    lastname: "",
    bio: "",
    email: "",
    primary_city: "",
    secondary_city: "",
    roles: [],

    // Project Data
    project_name: "",
    project_twitter: "",
    image: null,
    synergy_angles: [
      {
        synergy_angle: "",
      },
    ],
  });

  const predefinedRoles = ["Investor", "Founder", "Developer", "Designer", "Advisor"];

  useEffect(() => {
    // Pre-fill data from Twitter if available
    if (authDetails?.user?.verifiedCredentials?.[1]) {
      const twitterData = authDetails.user.verifiedCredentials[1];
      setFormData((prev) => ({
        ...prev,
        firstname: twitterData.publicIdentifier || "",
        bio: twitterData.oauthMetadata?.description || "",
        email: authDetails.user.email || "",
        project_twitter: twitterData.oauthUsername || "",
      }));
    }
  }, [authDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role],
    }));
  };

  const handleAddCustomRole = (e) => {
    e.preventDefault();
    if (customRole.trim() && !formData.roles.includes(customRole.trim())) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, customRole.trim()],
      }));
      setCustomRole("");
    }
  };

  const handleRemoveRole = (roleToRemove) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((role) => role !== roleToRemove),
    }));
  };

  const toggleAddAngelPopupOpen = () => setIsAddAngelPopupOpen(!isAddAngelPopupOpen);

  const handleAddNewAngel = (data) => {
    toggleAddAngelPopupOpen();
    if (data?.description) {
      synergyAnglesOptions.push({
        label: data?.description,
        value: data?.description,
        tooltip: "Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences",
      });
      setFormData((prev) => ({
        ...prev,
        synergy_angles: [
          ...prev.synergy_angles.slice(0, angelPopupIndex),
          {
            synergy_angle: data?.description,
          },
          ...prev.synergy_angles.slice(angelPopupIndex + 1),
        ],
      }));
    }
  };

  const handleSubmit = async (isSkipped = false) => {
    try {
      // Save profile data
      const profilePayload = {
        id: userId,
        userData: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          bio: formData.bio,
          description: formData.description,
          email: formData.email,
          primary_city: formData.primary_city,
          secondary_city: formData.secondary_city,
          roles: formData.roles.join(","),
        },
      };
      console.log(profilePayload);
      dispatch(editUserProfileAPI(profilePayload));

      if (isSkipped) {
        // Make POST request to /firstlogin/:id when skipping
        try {
          await axios.post(`https://winwinsocietyweb3.com/api/users/firstlogin/${userId}`);
        } catch (error) {
          console.error("Error making firstlogin request:", error);
        }
      } else if (formData.project_name) {
        // Save project data if not skipped and project name is provided
        const date = new Date();
        const synergy_obj = {};

        formData.synergy_angles.forEach((synergy_angle, index) => {
          synergy_obj[`synergy_angle${index}`] = synergy_angle.synergy_angle;
        });

        // Upload image if exists
        let imageUrl = "";
        if (formData.image?.file) {
          const formDataImg = new FormData();
          formDataImg.append("file", formData.image.file);
          const response = await axios.post(`${import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL}/`, formDataImg, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          imageUrl = response.data.image_url;
        }

        const projectPayload = {
          project_name: formData.project_name,
          project_info: "",
          website: "",
          discord_link: "",
          description: formData.description,
          twitter: formData.project_twitter,
          rating: 0,
          featured: 0,
          image: imageUrl,
          date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          synergy_access: true,
          synergy_angles: synergy_obj,
          investments_access: true,
          investments: {},
        };

        const projectResponse = await dispatch(addProjectAPI(projectPayload));

        // Add user as project member
        if (projectResponse.payload?.response?.data?.insertId) {
          const memberPayload = {
            userId: userId,
            projectId: projectResponse.payload.response.data.insertId,
            roles: formData.roles[0] || "Member", // Use first selected role or default to 'Member'
          };
          dispatch(addMemberAPI(memberPayload));
        }
      }

      handleClose();
     
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="popup_overlay">
      <div className="onboarding_popup_content">
        <div className="step_indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="step_line"></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
        </div>

        {step === 1 ? (
          <div className="step_content">
            <h2>Complete Your Profile</h2>
            <p>Let's get to know you better</p>

            <div className="form_group">
              <input
                type="text"
                name="firstname"
                placeholder="First Name*"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name*"
                value={formData.lastname}
                onChange={handleInputChange}
              />
              <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} />
              <textarea name="bio" placeholder="Tell us about yourself" value={formData.bio} onChange={handleInputChange} />
              <input
                type="text"
                name="primary_city"
                placeholder="Primary City"
                value={formData.primary_city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="secondary_city"
                placeholder="Secondary City"
                value={formData.secondary_city}
                onChange={handleInputChange}
              />

              <div className="roles_section">
                <h3>Select Your Roles</h3>
                <div className="roles_grid">
                  {predefinedRoles.map((role) => (
                    <div
                      key={role}
                      className={`role_chip ${formData.roles.includes(role) ? "selected" : ""}`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      {role}
                    </div>
                  ))}
                </div>

                <div className="custom_role_section">
                  <div className="custom_role_input">
                    <input
                      type="text"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="Add custom role"
                    />
                    <button className="add_role_button" onClick={handleAddCustomRole} disabled={!customRole.trim()}>
                      Add
                    </button>
                  </div>

                  <div className="selected_roles">
                    {formData.roles
                      .filter((role) => !predefinedRoles.includes(role))
                      .map((role) => (
                        <div key={role} className="selected_role_chip">
                          {role}
                          <button className="remove_role" onClick={() => handleRemoveRole(role)}>
                            ×
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="button_group">
              <button
                className="next_button"
                onClick={() => setStep(2)}
                disabled={!formData.firstname || !formData.lastname || !formData.email || !formData.roles.length || !formData.bio}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="step_content">
            <h2>Project Information</h2>
            <p>Tell us about your project</p>

            <CustomImageUploader
              image={formData.image}
              setFieldValue={(field, value) =>
                setFormData((prev) => ({
                  ...prev,
                  [field]: value,
                }))
              }
            />

            <div className="form_group">
              <input
                type="text"
                name="project_name"
                placeholder="Project Name*"
                value={formData.project_name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="project_twitter"
                placeholder="Project Twitter Handle"
                value={formData.project_twitter}
                onChange={handleInputChange}
              />


<textarea name="description" placeholder="Short description about your project" value={formData.description} onChange={handleInputChange} />

              <div className="synergy_section">
                <h3>Synergy Angles</h3>
                {formData.synergy_angles.map((synergy_angle, index) => (
                  <div key={index} className="synergy_input">
                    <Select
                      options={synergyAnglesOptions}
                      placeholder="Select synergy angle"
                      hasAddButton={true}
                      onAdd={() => {
                        toggleAddAngelPopupOpen();
                        setAngelPopupIndex(index);
                      }}
                      value={synergy_angle.synergy_angle}
                      addButtonLabel="Add new angle"
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          synergy_angles: [
                            ...prev.synergy_angles.slice(0, index),
                            {
                              synergy_angle: value.value,
                            },
                            ...prev.synergy_angles.slice(index + 1),
                          ],
                        }));
                      }}
                    />
                    {index > 0 && (
                      <button
                        className="remove_synergy"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            synergy_angles: [...prev.synergy_angles.slice(0, index), ...prev.synergy_angles.slice(index + 1)],
                          }));
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="add_synergy_button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      synergy_angles: [
                        ...prev.synergy_angles,
                        {
                          synergy_angle: "",
                        },
                      ],
                    }));
                  }}
                >
                  Add Synergy Angle
                </button>
              </div>
            </div>

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "8px" }}>
              <div
                style={{
                  flex: "1",
                  backgroundColor: "#666",
                  padding: "1rem 2rem 1rem 2rem",
                  border: "1px solid black",
                  borderRadius: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setStep(1)}
              >
                Back
              </div>
              <div
                style={{
                  flex: "1",
                  backgroundColor: "rgba(245, 239, 219, 0.3)",
                  color: "#F5EFDB",
                  padding: "1rem 2rem 1rem 2rem",
                  border: "1px solid rgba(245, 239, 219, 0.3)",
                  borderRadius: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSubmit(true)}
              >
                Skip
              </div>
              <div
                style={{
                  flex: "1",
                  backgroundColor: "white",
                  color: "black",
                  padding: "1rem 2rem 1rem 2rem",
                  border: "1px solid black",
                  borderRadius: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSubmit(false)}
              >
                Complete
              </div>
            </div>
            {/* <div className="button_group two-buttons">
              <button className="back_button" onClick={() => setStep(1)}>
                Back
              </button>
              <button 
                className="submit_button"
                onClick={handleSubmit}
                disabled={!formData.project_name}
              >
                Complete
              </button>
            </div> */}
          </div>
        )}
      </div>

      <AddAngelPopup
        open={isAddAngelPopupOpen}
        handleClose={toggleAddAngelPopupOpen}
        handleAddNewAngel={handleAddNewAngel}
        defaultValue={formData.project_name}
      />
    </div>
  );
};

export default OnboardingPopup;
