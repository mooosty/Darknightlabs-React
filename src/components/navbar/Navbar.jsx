import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { CustomDropdown } from "../../components";
import { BurgerMenuIcon } from "../../utils/constants/images";
import { useEffect } from "react";


const tabData = [
  {
    label: <Link to="/" className="tab_item">Home</Link>
  },
  {
    label: <Link to="/#services" className="tab_item">Services</Link>
  },
  {
    label: <Link to="/#members" className="tab_item">Members</Link>
  },
  {
    label: <Link to="/#partners" className="tab_item">Partners</Link>
  },
  {
    label: <Link to="/#about" className="tab_item">About</Link>
  },
  {
    label: <Link className="tab_item btn">Contact us</Link>
  }
]


const Navbar = () => {

  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        const scrollToPx = element.offsetTop - 15
        window.scrollTo({
          top: scrollToPx,
          behavior: 'smooth',
        });
      }
    }
  }, [hash])
  
  return (
    <div className="navbar_wrap">
      <Link to={"/"} className="logo_text">
        Darknight Labs
      </Link>
      <div className="tab_wrap">
        {tabData.map((data) => {
          return (
            <> {data.label}</>
          )
        })}
      </div>
      <div className="more_btn">
        <CustomDropdown toggleButton={<BurgerMenuIcon />} items={tabData} />
      </div>
    </div>
  );
};

export default Navbar;