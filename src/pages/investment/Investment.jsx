import './investment.scss'
import searchIcon from "../../assets/search-icon.png";
import { useState } from 'react';
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
import MultiselectDropDown from '../../components/multiselect-dropdwon/MultiselectDropDown';
import { projectTypesOptions, synergyAnglesOptions } from '../../utils/constants/options';

const cardData = [
  {
    investmentName: 'Investment name',
    investorImg: cardActor1,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor2,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor3,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor4,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor5,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor6,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor7,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor8,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor9,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor10,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor11,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor12,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor13,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor14,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
  {
    investmentName: 'Investment name',
    investorImg: cardActor15,
    tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    investments: [
      {
        head: 'Token name',
        data: '$RIFT',
      },
      {
        head: 'Round',
        data: 'private',
      },
      {
        head: 'FDV',
        data: '20mil',
      },],
  },
]

const Investment = () => {
  const [activeLayout, setActiveLayout] = useState('TRENDING');
  const handleActive = (key) => {
    setActiveLayout(key);
  }

  const [filter, setFilter] = useState({
    synergyAngleValues: [],
    status: '',
    sortBy: '',
    types: [],
    searchBy: ''
  })
  return (
    <>
      <div className="investments_content_header">
        <div className="content_left">
          <h2>Investment</h2>
          <div className="search_box">
            <img className="search_icon" src={searchIcon} alt="Search" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="investments_page_data">
        <div className="page_data">
          <div className="investment_page_header">
            <div className="investment_toggleWrap">
              <button className={`investment_toggle_btn ${activeLayout === 'TRENDING' ? 'active' : ''}`} onClick={() => handleActive('TRENDING')} >
                <span>Trending</span>
              </button>
              <button className={`investment_toggle_btn ${activeLayout === 'TAB' ? 'active' : ''}`} onClick={() => handleActive('TAB')} >
                <span>Newest</span>
              </button>
              <button className={`investment_toggle_btn ${activeLayout === 'LAYOUT' ? 'active' : ''}`} onClick={() => handleActive('LAYOUT')} >
                <span>Oldest</span>
              </button>
            </div>
            <div className="selects">
              <MultiselectDropDown
                options={projectTypesOptions}
                placeholder={'All types'}
                onApply={(currentOptions) => {
                  console.log('currentOptions', currentOptions)
                  setFilter({
                    ...filter,
                    types: currentOptions?.map((option) => option.value)
                  })
                }}
              >
              </MultiselectDropDown>
              <MultiselectDropDown
                options={synergyAnglesOptions}
                placeholder={'All synergies angles'}
                onApply={(currentOptions) => {
                  setFilter({
                    ...filter,
                    synergyAngleValues: currentOptions?.map((option) => option.value)
                  })
                }}
              >
              </MultiselectDropDown>
            </div>
          </div>
          <div className="investment_page_body">
            <div className="card_container">
              {cardData.map((data, index) => {
                return (
                  <>
                    <div key={index} className="card" >
                      <div className="card_image">
                        <img src={data.investorImg} alt="" />
                      </div>
                      <div className="card_body">
                        <div className="name">{data.investmentName} </div>
                        <div className="tabs">
                          {
                            data.investments.map((tag, index) => {
                              return (
                                <div className={``} key={index}>
                                  <div className='investment_tag' >
                                    <>{tag.head}:{tag.data} </>
                                  </div>
                                </div>)
                            })
                          }
                        </div>
                        <div className="tabs">
                          {
                            data.tags.map((data, index) => {
                              return (
                                <div className={``} key={index}>
                                  <div className='meta_tag' >
                                    <>{data} </>
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
            {/* <div className="investment_pagination">
              <div className="investment_pagination_content">
                <div className="investment_pagination_content_text">
                  <span className='pagination_head'>Row per page:</span>
                  <span className='pagination_dropdown'>
                    <select name="page" id="page" >
                      <option value="12">12</option>
                      <option value="10">10</option>
                      <option value="8">8</option></select></span>
                  <span className='pagination_pages'>1-5 of 13</span>
                  <div className="investment_pagination_content_arrows">
                    <button className={`table_pagination_content_button`}>
                      <LeftIcon />
                    </button>
                    <button className={`table_pagination_content_button`}>
                      <RightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

    </>
  )
}

export default Investment
