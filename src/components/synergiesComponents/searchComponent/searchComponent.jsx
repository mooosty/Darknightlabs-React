// src/components/synergiesComponents/SearchComponent.js
import searchIcon from "../../../assets/icons/search.png";
import styles from "./searchComponent.module.css";

// eslint-disable-next-line react/prop-types
function SearchComponent({ tabName }) {
  return (
    <div className={styles.searchContainer}>
      <div className="flex items-center gap-8">
        <div className={styles.tabName}>{tabName}</div>
        <div className="flex items-center">
          <input
            type="search"
            placeholder="Search"
            className={styles.searchInput}
          />
          <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        </div>
      </div>
      <h1 className={styles.tabNameMobile}>Darknight Labs</h1>
      <img src={searchIcon} alt="menu" className={styles.searchIconMobile} />
    </div>
  );
}

export default SearchComponent;
