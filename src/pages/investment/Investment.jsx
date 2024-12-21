import './investment.scss'
import { useState } from 'react';
import { MultiselectDropDown } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import WalletConnect from '../../components/investments/WalletConnect/WalletConnect';
import { projectTypesOptions, synergyAnglesOptions } from '../../utils/constants/options';
import ContributionForm from '../../components/investments/ContributionForm/ContributionForm';
import ContributionStatus from '../../components/investments/ContributionStatus/ContributionStatus';
import { setWalletAddress, setWhitelistMessage } from '../../store/slice/authSlice';
import WhitelistVerification from '../../components/investments/WhitelistVerification/WhitelistVerification';
import { cardActor1, cardActor2, cardActor3, cardActor4, cardActor5, cardActor6, cardActor7, cardActor8, cardActor9, cardActor10, cardActor11, cardActor12, cardActor13, cardActor14, cardActor15, SearchIcon } from '../../utils/constants/images';

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

const hasMaxContributions = false;
const Investment = () => {

  const dispatch = useDispatch();
  const { walletAddress, isWalletVerified, whitelistMessage } = useSelector(state => state.auth);
  const [activeLayout, setActiveLayout] = useState('TRENDING');
  const handleActive = (key) => { setActiveLayout(key) }

  const [filter, setFilter] = useState({
    synergyAngleValues: [],
    status: '',
    sortBy: '',
    types: [],
    searchBy: ''
  })

  const handleConnectWallet = (address) => {
    dispatch(setWalletAddress({ walletAddress: address }));
  }

  const handleVerificationComplete = (message) => {
    dispatch(setWhitelistMessage({ whitelistMessage: message }));
  }

  // const handleMaxContributions = (isMaxContributions) => {
  //   dispatch(setMaxContributions({ maxContributions: isMaxContributions }));
  // }


  return (
    <>
      <div className="investments_content_header">
        <div className="content_left">
          <h2>Investment</h2>
          <div className="search_box">
          <span className="search_icon"><SearchIcon /></span>
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
                  setFilter({
                    ...filter,
                    types: currentOptions?.map((option) => option.value)
                  })
                }}
              />
              <MultiselectDropDown
                options={synergyAnglesOptions}
                placeholder={'All synergies angels'}
                onApply={(currentOptions) => {
                  setFilter({
                    ...filter,
                    synergyAngleValues: currentOptions?.map((option) => option.value)
                  })
                }}
              />
              <WalletConnect onConnect={handleConnectWallet} account={walletAddress ?? ''} />
            </div>
          </div>
          <div className="investment_page_body">

            {walletAddress && !isWalletVerified && (
              <div className='wallet_details_wrap'>
                <WhitelistVerification
                  walletAddress={walletAddress}
                  onVerificationComplete={handleVerificationComplete}
                />
              </div>
            )}

            {walletAddress && isWalletVerified && !hasMaxContributions && (
              <div className="md:col-span-3">
                <ContributionForm
                  walletAddress={walletAddress}
                  whitelistSignature={whitelistMessage}
                />
              </div>
            )}

            {walletAddress && (
              <div className="contribution_status_wrap">
                <ContributionStatus
                  walletAddress={walletAddress}
                />
              </div>
            )}

            <div className="card_container">
              {cardData.map((data, index) => {
                return (
                  <div className='card_wrap' key={index} >
                    <div className="iv_card" >
                      <div className="iv_card_image">
                        <img src={data.investorImg} alt="" />
                      </div>
                      <div className="iv_card_body">
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
                    </div>
                  </div>
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
