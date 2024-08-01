import { useState } from "react";
import { cardData, tagData } from "../../../constants/synergiesConstants";
import leftArrow from "../../../assets/icons/left-arrow.png";
import arrowDown from "../../../assets/icons/arrow-down.png";
import Status from "../statusComponent/status";
import Pagination from "../paginationComponent/pagination";
import shadowFrameBottom from "../../../assets/images/shadow-frame-bottom.png";
import styles from './synergiesCard.module.css';

function SynergiesCard() {
  const [selected, setSelected] = useState("Live");
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>Available synergies</h1>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => setSelected("Live")}
              className={`${styles.button} ${selected === "Live" ? styles.buttonActive : styles.buttonInactive}`}
            >
              Live
            </button>
            <button
              onClick={() => setSelected("Pending")}
              className={`${styles.button} ${selected === "Pending" ? styles.buttonActive : `${styles.buttonInactive} ${styles.buttonPending}`}`}
            >
              Pending
            </button>
            <button
              onClick={() => setSelected("Refused")}
              className={`${styles.button} ${selected === "Refused" ? styles.buttonActive : `${styles.buttonInactive} ${styles.buttonPending}`}`}
            >
              Refused
            </button>
          </div>
          <div className="flex gap-2 mt-[18px] xl:mt-0 xl:h-[48px] xl:gap-4">
            <div className={styles.dropdown}>
              <p className="text-[12px] xl:text-[16px] font-normal">
                All synergies angles
              </p>
              <img src={arrowDown} alt="arrow-down" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {cardData.map((card, i) => (
          <div key={i} className={styles.card}>
            <div className="absolute ml-[228px] 2xl:ml-[236px]">
              <Status
                color={`${
                  card.status === "Refused"
                    ? "from-[#690700] to-[#380300]"
                    : card.status === "Pending"
                    ? "from-[#5F5500] to-[#332E00]"
                    : card.status === "Live"
                    ? "from-[#1C5600] to-[#0E2D00]"
                    : ""
                }`}
                status={card.status}
              />
            </div>
            <div
              className={styles.cardInner}
              style={{
                boxShadow:
                  card.id === "6"
                    ? "0 0 24px 0 rgba(255, 137, 28, 0.35)"
                    : "none",
              }}
            >
              <img
                src={card.cardImage}
                className={styles.cardImage}
                alt="card-img"
              />
              <div className={styles.tagContainer}>
                <div className={styles.tag}>
                  <div className={`${styles.tagInner} w-[108px]`}>
                    <img src={card.globeIcon} alt="globe-icon" />
                    <h1
                      className="bg-gradient-to-r from-[#622BFD] to-[#DA4370] bg-clip-text"
                      style={{
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {card.buttonOne}
                    </h1>
                  </div>
                </div>
                <div className={`${styles.tag} bg-gradient-to-r from-[#E58A02] to-[#DAB943]`}>
                  <div className={`${styles.tagInner} w-[114px]`}>
                    <img src={card.graphIcon} alt="graph-icon" />
                    <h1
                      className="bg-gradient-to-r from-[#E58A02] to-[#DAB943] bg-clip-text"
                      style={{
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {card.buttonTwo}
                    </h1>
                  </div>
                </div>
                <div className={styles.tagButton}>
                  <img src={card.grammarlyIcon} alt="grammarly-icon" />
                  <h1 className="text-white">{card.buttonThree}</h1>
                </div>
                <div className={styles.tagButton}>
                  <img src={card.healthIcon} alt="health-icon" />
                  <h1 className="text-white">{card.buttonFour}</h1>
                </div>
                <div className={styles.tagButton}>
                  <img src={card.starIcon} alt="star-icon" />
                  <h1 className="text-white">{card.buttonFive}</h1>
                </div>
              </div>
              <h1 className={styles.projectName}>{card.projectName}</h1>
              <div>
                <h1 className={styles.projectContent}>
                  {card.projectContent}
                </h1>
              </div>
              <div className={styles.tagButtonContainer}>
                {tagData.map((tag, i) => (
                  <button
                    key={i}
                    className="flex bg-[#2F2E2A] rounded-[3px] p-1 text-white text-[12px] leading-[14px] font-normal font-inter"
                  >
                    <span>{tag.tagIcon}</span> #{tag.tagTitle}
                  </button>
                ))}
              </div>
              <div>
                <button className={styles.readMore}>
                  Read more <img src={leftArrow} alt="left-arrow" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
      <div className={styles.pagination}>
        <img src={shadowFrameBottom} className="absolute" alt="shadow-frame" />
      </div>
    </div>
  );
}

export default SynergiesCard;
