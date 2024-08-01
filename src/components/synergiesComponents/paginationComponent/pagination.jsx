// src/components/synergiesComponents/Pagination.js
import arrowDown from "../../../assets/icons/arrow-down.png";
import arrowLeft from "../../../assets/icons/Left.png";
import arrowRight from "../../../assets/icons/Right.png";
import styles from "./pagination.module.css";

function Pagination() {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.rowsPerPage}>
        Rows per page:{" "}
        <span className={styles.rowsValue}>
          12{" "}
          <img src={arrowDown} className={styles.arrowIcon} alt="arrow-down" />
        </span>
      </div>
      <div>1-5 of 13</div>
      <div className={styles.navigationIcons}>
        <img src={arrowLeft} className="p-[6px]" alt="arrow-left" />
        <img src={arrowRight} className="p-[6px]" alt="arrow-right" />
      </div>
    </div>
  );
}

export default Pagination;
