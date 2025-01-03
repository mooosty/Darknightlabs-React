import "./navbar.scss";
import { BurgerMenuIcon } from "../../utils/constants/images";
import { CustomDropdown } from "../../components";
import { Link, useLocation } from "react-router-dom";

const tabData = ["Home", "Services", "Members", "Partners", "About"];

const Navbar = ({ onScroll }) => {
  return (
    <div className="navbar_wrap">
      <Link to={"/"} className="logo_text">
        Darknight Labs
      </Link>
      <div className="tab_wrap">
        {tabData.map((item) => {
          return (
            <Link to="#" onClick={() => onScroll(item)} className="tab_item">
              {item}
            </Link>
          );
        })}
      </div>
      <div className="more_btn">
        <CustomDropdown toggleButton={<BurgerMenuIcon />} items={tabData} />
      </div>
    </div>
  );
};

export default Navbar;