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
import { cardActor1, cardActor2, cardActor3, cardActor4, cardActor5, cardActor6, cardActor7, cardActor8, cardActor9, cardActor10, cardActor11, cardActor12, cardActor13, cardActor14, cardActor15, searchIcon } from '../../utils/constants/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { appendToSheet } from '../../utils/googleSheets';

const cardData = [
  {
    investmentName: '🌙 KIKI : The Evolution',
    investorImg: cardActor1,
    tags: ['🐱 #Meme', '🤖 #AI', '🎮 #IP'],
    investments: [
      {
        head: 'Token',
        data: '$KIKI',
      },
      {
        head: 'Supply',
        data: '1B',
      },
      {
        head: 'Launch',
        data: 'Winter 2024',
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
  const [showDetails, setShowDetails] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const handleActive = (key) => { setActiveLayout(key) }

  const handleCardClick = (data, index) => {
    if (index === 0) {
      setSelectedInvestment(data);
      setShowDetails(true);
    }
  }

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedInvestment(null);
  }

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

  const InvestmentForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validationSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      telegram: Yup.string().required('Telegram handle is required'),
      twitter: Yup.string().required('Twitter handle is required'),
      role: Yup.string().required('Role is required'),
      inTelegramGroup: Yup.string().required('Please select an option'),
      investmentAmount: Yup.number()
        .required('Investment amount is required')
        .min(1, 'Amount must be greater than 0')
        .max(500, 'Maximum investment amount is $500'),
      transactionLink: Yup.string()
        .required('Transaction link is required')
        .url('Must be a valid URL'),
      claimWallet: Yup.string()
        .required('Claim wallet is required')
        .matches(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid ETH address'),
      holdsApe: Yup.string().required('This field is required'),
      apeOpenseaLink: Yup.string()
        .required('Opensea link is required')
        .url('Must be a valid URL'),
      followsTwitter: Yup.string().required('Please select an option'),
      joinedTwitterList: Yup.string().required('Please select an option'),
    });

    const formik = useFormik({
      initialValues: {
        name: '',
        telegram: '',
        twitter: '',
        role: '',
        inTelegramGroup: '',
        investmentAmount: '',
        transactionLink: '',
        claimWallet: '',
        holdsApe: '',
        apeOpenseaLink: '',
        followsTwitter: '',
        joinedTwitterList: '',
      },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
          await appendToSheet(values);
          setSubmitSuccess(true);
          resetForm();
        } catch (error) {
          console.error('Form submission error:', error);
          setSubmitError('Failed to submit form. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} className="investment-form">
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="telegram">Telegram*</label>
          <input
            id="telegram"
            name="telegram"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telegram}
          />
          {formik.touched.telegram && formik.errors.telegram && (
            <div className="error">{formik.errors.telegram}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="twitter">Twitter*</label>
          <input
            id="twitter"
            name="twitter"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.twitter}
          />
          {formik.touched.twitter && formik.errors.twitter && (
            <div className="error">{formik.errors.twitter}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role in the space*</label>
          <input
            id="role"
            name="role"
            type="text"
            placeholder="founder, KOL, VC, degen..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          />
          {formik.touched.role && formik.errors.role && (
            <div className="error">{formik.errors.role}</div>
          )}
        </div>

        <div className="form-group">
          <label>Are you in the Ape Ventures Telegram Group already?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="inTelegramGroup"
                value="inside"
                onChange={formik.handleChange}
                checked={formik.values.inTelegramGroup === 'inside'}
              />
              I'm inside already
            </label>
            <label>
              <input
                type="radio"
                name="inTelegramGroup"
                value="justDMed"
                onChange={formik.handleChange}
                checked={formik.values.inTelegramGroup === 'justDMed'}
              />
              Just DMed
            </label>
          </div>
          {formik.touched.inTelegramGroup && formik.errors.inTelegramGroup && (
            <div className="error">{formik.errors.inTelegramGroup}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="investmentAmount">Investment Amount ($USDT)*</label>
          <input
            id="investmentAmount"
            name="investmentAmount"
            type="number"
            max="500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.investmentAmount}
          />
          {formik.touched.investmentAmount && formik.errors.investmentAmount && (
            <div className="error">{formik.errors.investmentAmount}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="transactionLink">Transaction Link*</label>
          <input
            id="transactionLink"
            name="transactionLink"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.transactionLink}
          />
          {formik.touched.transactionLink && formik.errors.transactionLink && (
            <div className="error">{formik.errors.transactionLink}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="claimWallet">BASE Claim Wallet*</label>
          <input
            id="claimWallet"
            name="claimWallet"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.claimWallet}
          />
          {formik.touched.claimWallet && formik.errors.claimWallet && (
            <div className="error">{formik.errors.claimWallet}</div>
          )}
        </div>

        <div className="form-group">
          <label>Do you hold a Mutant or a Bored Ape?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="holdsApe"
                value="yes"
                onChange={formik.handleChange}
                checked={formik.values.holdsApe === 'yes'}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="holdsApe"
                value="no"
                onChange={formik.handleChange}
                checked={formik.values.holdsApe === 'no'}
              />
              No
            </label>
          </div>
          {formik.touched.holdsApe && formik.errors.holdsApe && (
            <div className="error">{formik.errors.holdsApe}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="apeOpenseaLink">Opensea Link of Ape*</label>
          <input
            id="apeOpenseaLink"
            name="apeOpenseaLink"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apeOpenseaLink}
          />
          {formik.touched.apeOpenseaLink && formik.errors.apeOpenseaLink && (
            <div className="error">{formik.errors.apeOpenseaLink}</div>
          )}
        </div>

        <div className="form-group">
          <label>Do you follow Ape Ventures and founders on Twitter?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="followsTwitter"
                value="yes"
                onChange={formik.handleChange}
                checked={formik.values.followsTwitter === 'yes'}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="followsTwitter"
                value="justFollowed"
                onChange={formik.handleChange}
                checked={formik.values.followsTwitter === 'justFollowed'}
              />
              Wasn't but I just did
            </label>
          </div>
          {formik.touched.followsTwitter && formik.errors.followsTwitter && (
            <div className="error">{formik.errors.followsTwitter}</div>
          )}
        </div>

        <div className="form-group">
          <label>Did you join Ape Ventures List on Twitter?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="joinedTwitterList"
                value="yes"
                onChange={formik.handleChange}
                checked={formik.values.joinedTwitterList === 'yes'}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="joinedTwitterList"
                value="justJoined"
                onChange={formik.handleChange}
                checked={formik.values.joinedTwitterList === 'justJoined'}
              />
              Wasn't but I just did
            </label>
          </div>
          {formik.touched.joinedTwitterList && formik.errors.joinedTwitterList && (
            <div className="error">{formik.errors.joinedTwitterList}</div>
          )}
        </div>

        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="success-message">
            Form submitted successfully!
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    );
  };

  return (
    <>
      {!showDetails ? (
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
                      setFilter({
                        ...filter,
                        types: currentOptions?.map((option) => option.value)
                      })
                    }}
                  />
                  <MultiselectDropDown
                    options={synergyAnglesOptions}
                    placeholder={'All synergies angles'}
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
                      <div className='card_wrap' key={index} onClick={() => handleCardClick(data, index)}>
                        <div className="card">
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
      ) : (
        <div className="investment_details">
          <div className="investments_content_header">
            <div className="content_left">
              <button className="btn_gray" onClick={handleBackToList}>Back to Investments</button>
              <h2>Investment Details</h2>
            </div>
          </div>
          <div className="investments_page_data">
            <div className="page_data">
              <div className="investment_page_body">
                <div className="investment_details_content">
                  <div className="details_left">
                    <h1 className="title">🌙 KIKI : The Evolution</h1>
                    <div className="description">
                      Come join Kiki's journey from being a popular Giphy IP, to being a face of the newest AI agent x memecoin on Solana, backed by $SHIB
                    </div>
                    
                    <div className="section">
                      <p>Powered by Solana, KIKI isn't just a token — it's a movement.</p>
                      <p>Once the World's meme sweetheart and a viral sensation with 10.6 billion Giphy views, KiKi's journey took an unexpected turn. Despite its global fame, challenges arose. He had no choice but to rely on the blockchain, sparking a transformation like no other: the ultimate glow-up.</p>
                      <p>The World-famous cat has formed an alliance with the largest meme project on the planet, $SHIB</p>
                      <p>"WAIT AND SEE!"</p>
                    </div>

                    <div className="section">
                      <h3>Project Details</h3>
                      <ul>
                        <li>🐱 Sector: Meme, AI Agent, Digital IP AI Creation</li>
                        <li>🐱 Fair Launch with Total Supply of 1B tokens 🚀</li>
                        <li>🐱 Launching Date: Winter 2024 ❄️</li>
                      </ul>
                    </div>

                    <div className="section">
                      <h3>Mission</h3>
                      <p>KIKI is reborn in Web3 — a symbol of resilience and BIG dreams. Backed by KiKats (fandom) and a global team, KIKI is building the future meme economy.</p>
                      <p>KIKI invites you all to reinvent yourself. It's ok to be burnt out. But you need to bounce back, and be reborn. Fall down 7. Stand up 8. Live 9 lives.</p>
                      <p>With its alliance with the World's largest and most successful meme community, $SHIB, it is poised for sustainable growth and longevity. Be the first holder and witness our journey to success.</p>
                    </div>

                    <div className="section">
                      <h3>Why KIKI?</h3>
                      <ul>
                        <li>🚀 NOT just a meme, THE IP UNICORN: One of TOP Giphy IPs and creative contents in the world with 10.6 B+ views.</li>
                        <li>🚀 100% Community Owned</li>
                        <li>🚀 Locked Liquidity: Permanently secured liquidity, enhancing stability and security.</li>
                        <li>🚀 Immutable Contract: Unchangeable smart contract ensures a stable foundation</li>
                      </ul>
                    </div>

                    <div className="section">
                      <h3>Backed by</h3>
                      <ul>
                        <li>👑 $SHIB</li>
                        <li>👑 $TREAT</li>
                        <li>👑 $BONE</li>
                        <li>👑 $LEASH</li>
                        <li>👑 $SHIFU</li>
                        <li>👑 $SOL</li>
                        <li>👑 giphy.com</li>
                        <li>👑 12 largest social media influencers in Asia with 30M+ accumulated followers</li>
                        <li>👑 666 Crypto, Web 3.0, Meme KOLs</li>
                      </ul>
                    </div>

                    <div className="section">
                      <h3>Led by</h3>
                      <ul>
                        <li>🐈‍⬛ Shytoshi Kusama - <a href="https://x.com/shytoshikusama" target="_blank">@shytoshikusama</a></li>
                        <li>🐈‍⬛ Kaal Dhairya - <a href="https://x.com/Kaaldhairya" target="_blank">@Kaaldhairya</a></li>
                        <li>🐈‍⬛ Ian Utile - <a href="https://x.com/IanUtile" target="_blank">@IanUtile</a></li>
                        <li>🐈‍⬛ Tryke Gutierrez - <a href="https://instagram.com/trykegutierrez" target="_blank">@trykegutierrez</a></li>
                        <li>🐈‍⬛ James Afante - <a href="https://www.tiktok.com/@jmsfnt" target="_blank">@jmsfnt</a></li>
                        <li>🐈‍⬛ JBond - <a href="https://x.com/jbondwagon" target="_blank">@jbondwagon</a></li>
                      </ul>
                    </div>

                    <div className="section">
                      <h3>Links</h3>
                      <div className="links">
                        <a href="https://giphy.com/search/kiki-cat" target="_blank">🙀 KIKI on Giphy</a>
                      </div>
                    </div>

                    <div className="section">
                      <h3>Security & Ownership</h3>
                      <ul>
                        <li>🚀 100% Community Owned</li>
                        <li>🚀 Locked Liquidity: Permanently secured liquidity, enhancing stability and security.</li>
                        <li>🚀 Immutable Contract: Unchangeable smart contract ensures a stable foundation</li>
                      </ul>
                    </div>

                    <div className="section movement_section">
                      <h3>🌙 Join the KiKi Movement</h3>
                      <p>If we dream BIG, we are totally unstoppable. Heading to the MOON baby! Be part of the movement 🚀</p>
                      <div className="stars">💫💫💫💫💫💫💫💫💫💫💫💫</div>
                    </div>
                  </div>
                  <div className="details_right">
                    <div className="form_container">
                      <InvestmentForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Investment
