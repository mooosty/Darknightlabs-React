import "./ambassadorProjects.scss";
import { useState, useEffect } from "react";
import { SearchIcon } from "../../utils/constants/images";
import { AmbassadorsCard, CustomSearch, EmptyData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsAPI } from "../../api-services/projectApis";
import { axiosApi } from "../../api-services/service";

const AmbassadorProjects = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { projects } = useSelector((state) => state.project);
  const [filterProject, setFilterProject] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [projectStatuses, setProjectStatuses] = useState({});

  const [activeLayout, setActiveLayout] = useState("TRENDING");
  const [filter, setFilter] = useState({
    synergyAngleValues: "",
    types: "",
    searchBy: "",
  });

  useEffect(() => {
    setIsLoading(true);

    const fetchProjectStatuses = async () => {
      const statuses = {};
      for (const project of projects) {
        try {
          const response = await axiosApi.get(`/content-requirements/project/${project.project_id}`);
          if (response?.data?.length > 0) {
            const timeframe = response.data[0];
            const currentDate = new Date();
            const startDate = new Date(timeframe.start_date);
            const endDate = new Date(timeframe.end_date);

            if (currentDate >= startDate && currentDate <= endDate) {
              statuses[project.project_id] = "LIVE";
            } else if (currentDate < startDate) {
              statuses[project.project_id] = "Coming Soon";
            }
          }
        } catch (error) {
          console.error("Error fetching timeframe:", error);
          statuses[project.project_id] = "Coming Soon";
        }
      }
      setProjectStatuses(statuses);
    };

    if (projects.length > 0) {
      fetchProjectStatuses();
    }
  }, [projects]);

  const handleActive = (key) => {
    setActiveLayout(key);
  };


  useEffect(() => {
    console.log(projectStatuses)


    const sortedProjects = [...projects].sort((a, b) => {
      if (activeLayout === "TRENDING") {
        const aIsLive = projectStatuses[a.project_id] === "LIVE";
        const bIsLive = projectStatuses[b.project_id] === "LIVE";
        if (aIsLive && !bIsLive) return -1;
        if (!aIsLive && bIsLive) return 1;
        return 0;
      } else if (activeLayout === "NEWEST") {
        return new Date(b.date) - new Date(a.date);
      } else if (activeLayout === "OLDEST") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
    setFilterProject(sortedProjects);



  }, [activeLayout]);


  const handleSearchChange = (value) => {
    setSearchStr(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        searchBy: searchStr,
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchStr]);

  useEffect(() => {
    let data = [...projects];
    // Sort projects - LIVE projects first
    data.sort((a, b) => {
      const aIsLive = projectStatuses[a.project_id] === "LIVE";
      const bIsLive = projectStatuses[b.project_id] === "LIVE";
      if (aIsLive && !bIsLive) return -1;
      if (!aIsLive && bIsLive) return 1;
      return 0;
    });
console.log(data)
    setFilterProject([...data]);
    setIsLoading(false);
  }, [projectStatuses]);

  useEffect(() => {
    let data = [...projects];
    if (filter.searchBy !== "") {
      const searchKeyword = filter.searchBy.toLowerCase();
      data = data.filter(
        (project) =>
          project?.project_name?.toLowerCase().includes(searchKeyword) ||
          project?.description?.toLowerCase().includes(searchKeyword)
      );
    }

    setFilterProject([...data]);
    setIsLoading(false);
  }, [filter]);

  useEffect(() => {
    dispatch(getProjectsAPI());
  }, []);

  return (
    <>
      <div className="ambassador_content_wrapper">
        <div className="ambassador_content_header">
          <div className="ambassador_content_left">
            <h2>Projects</h2>
            <div className="search_wrap">
              <CustomSearch
                value={searchStr}
                placeholder="Search"
                onSearchChange={(e) => handleSearchChange(e.target.value)}
                isOpen={isSearchOpen}
                setIsOpen={setIsSearchOpen}
              />
            </div>
          </div>
          {isSearchOpen && (
            <div className="mobile_search">
              <span className="icon">
                <SearchIcon />
              </span>
              <input
                value={searchStr}
                type="text"
                placeholder="Search"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          )}
          <div className="ambassador_content_right">
            <a href="#">Darknight Labs</a>
          </div>
        </div>

        <div className="user_ambassador_page_data">
          <div className={`page_data ${isSearchOpen ? "search_open" : ""}`}>
            <div className="ambassador_card_box">
              <div className="ambassador_card_header">
                <div className="header_top">Ambassador Projects</div>
                <div className="header_bottom">
                  <div className="btns">
                    <button
                      className={`btn ${activeLayout === "TRENDING" ? "active" : ""}`}
                      onClick={() => handleActive("TRENDING")}
                      data-type="trending"
                    >
                      Trending
                    </button>
                    <button
                      className={`btn ${activeLayout === "NEWEST" ? "active" : ""}`}
                      onClick={() => handleActive("NEWEST")}
                      data-type="newest"
                    >
                      Newest
                    </button>
                    <button
                      className={`btn ${activeLayout === "OLDEST" ? "active" : ""}`}
                      onClick={() => handleActive("OLDEST")}
                      data-type="oldest"
                    >
                      Oldest
                    </button>
                  </div>
                </div>
              </div>

              <div className="ambassador_cards">
                {!isLoading && filterProject.length == 0 ? (
                  <EmptyData />
                ) : filterProject.length == 0 ? (
                  <div className="fetching_data">Fetching data...</div>
                ) : (
                  <>
                    {filterProject?.map((data, index) => {
                      const isLive = projectStatuses[data.project_id] === "LIVE";
                      return (
                        <div className={`card_wrap ${!isLive ? "blurred" : ""}`} key={index}>
                          <AmbassadorsCard
                            isTimeFramed={data?.timeFramed}
                            key={data?.project_id}
                            projectId={data?.project_id}
                            name={data?.project_name}
                            img={data?.image}
                            synergiesAngles={data?.synergy_angles}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmbassadorProjects;
