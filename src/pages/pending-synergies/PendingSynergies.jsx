import './pendingSynergies.scss'
import searchIcon from "../../assets/search-icon.png";
import { useState } from 'react';
import DeleteConfirmPopup from '../../components/popup/delete-confirm-popup/DeleteConfirmaPopup';
import { GradientGraphIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, LeftIcon, RightIcon, StarIcon } from '../../utils/SVGs/SVGs';
import cardActor1 from '../../assets/pending-synergy-img1.png'
import cardActor2 from '../../assets/pending-synergy-img2.png'
import cardActor3 from '../../assets/pending-synergy-img3.png'
import cardActor4 from '../../assets/pending-synergy-img4.png'
import cardActor5 from '../../assets/pending-synergy-img5.png'
import cardActor6 from '../../assets/pending-synergy-img6.png'
import cardActor7 from '../../assets/pending-synergy-img7.png'
import cardActor8 from '../../assets/pending-synergy-img8.png'
import cardActor9 from '../../assets/pending-synergy-img9.png'
import cardActor10 from '../../assets/pending-synergy-img10.png'
import cardActor11 from '../../assets/pending-synergy-img11.png'
import cardActor12 from '../../assets/pending-synergy-img12.png'
import cardActor13 from '../../assets/pending-synergy-img13.png'
import cardActor14 from '../../assets/pending-synergy-img14.png'
import cardActor15 from '../../assets/pending-synergy-img15.png'
import EditPendingSynergiesAngelPopup from '../../components/popup/edit-pending-synergies-angel-popup/EditPendingSynergiesAngelPopup';

const cardData = [
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor1,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor2,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor3,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor4,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor5,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor6,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor7,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor8,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor9,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor10,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor11,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor12,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor13,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor14,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
  {
    synergyName: 'Byte City X Neo Tokyo',
    creatorImg: cardActor15,
    synergiesAngles: [
      {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
      },
      {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
      },
      {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
      },
      {
        icon: <HealthIcon />,
        label: 'Angle49',
      },
      {
        icon: <StarIcon />,
        label: 'Angle50',
      }],
  },
]

const PendingSynergies = () => {
  const [activeLayout, setActiveLayout] = useState('TAB');
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isEditPendingSynergiesAngelPopupOpen, setIsEditPendingSynergiesAngelPopupOpen] = useState(false);
  const handleActive = (key) => {
    setActiveLayout(key);
  }


  return (
    <>
      <div className="pending_synergies_content_header">
        <div className="content_left">
          <h2>Pending Synergies </h2>
          <div className="search_box">
            <img className="search_icon" src={searchIcon} alt="Search" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>

      <div className="pending_synergies_page_data">
        <div className="synergies_page_header">
          <div className="synergies_pagination">
            <button className={`synergies_pagination_btn ${activeLayout === 'TAB' ? 'active' : ''}`} onClick={() => handleActive('TAB')} >
              {/* <ListIcon /> */}
              <span>Newest</span>
            </button>
            <button className={`synergies_pagination_btn ${activeLayout === 'LAYOUT' ? 'active' : ''}`} onClick={() => handleActive('LAYOUT')} >
              {/* <GridIcon /> */}
              <span>Oldest</span>
            </button>
          </div>
        </div>
        <div className="synergies_page_body">
          <div className="card_container">
            {cardData.map((data, index) => {
              return (
                <>
                  <div key={index} className="card" onClick={() =>setIsEditPendingSynergiesAngelPopupOpen(true)}>
                    <div className="card_image">
                      <img src={data.creatorImg} alt="" />
                    </div>
                    <div className="card_body">
                      <div className="name">{data.synergyName} </div>
                      <div className="tabs">
                        {
                          data.synergiesAngles.map((angle, index) => {
                            return (
                              <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                <div className='angle_tag' >
                                  <>{angle.icon} </>
                                  <span className='text'>
                                    <span>{angle.label}</span>
                                  </span>
                                </div>
                              </div>)
                          })
                        }
                      </div>
                    </div>
                  </div></>
              )
            })}
          </div>
          <div className="synergies_pagination">
            <div className="synergies_pagination_content">
              <div className="synergies_pagination_content_text">
                <span className='pagination_head'>Row per page:</span>
                <span className='pagination_dropdown'>
                  <select name="cars" id="cars" >
                    <option value="12">12</option>
                    <option value="10">10</option>
                    <option value="8">8</option></select></span>
                <span className='pagination_pages'>1-5 of 13</span>
                <div className="synergies_pagination_content_arrows">
                  <button className={`table_pagination_content_button`}>
                    <LeftIcon />
                  </button>
                  <button className={`table_pagination_content_button`}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmPopup
        open={isDeleteConfirmPopupOpen}
        handleClose={() => setIsDeleteConfirmPopupOpen(false)}
      />

      <EditPendingSynergiesAngelPopup
        open={isEditPendingSynergiesAngelPopupOpen}
        handleClose={() => setIsEditPendingSynergiesAngelPopupOpen(false)}
      />

    </>
  )
}

export default PendingSynergies
