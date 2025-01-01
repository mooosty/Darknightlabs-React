import './investment.scss'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendToSheet } from '../../utils/googleSheets';
import { setWhitelistMessage } from '../../store/slice/authSlice';
import { projectTypesOptions } from '../../utils/constants/options';
import PledgeForm from '../../components/investments/PledgeForm/PledgeForm';
import { CustomSearch, EmptyData, MultiselectDropDown } from '../../components';
import ContributionForm from '../../components/investments/ContributionForm/ContributionForm';
import ContributionStatus from '../../components/investments/ContributionStatus/ContributionStatus';
import WhitelistVerification from '../../components/investments/WhitelistVerification/WhitelistVerification';
import { cardActor1, cardActor2, cardActor3, cardActor4, cardActor5, cardActor6, cardActor7, cardActor8, cardActor9, cardActor10, cardActor11, cardActor12, cardActor13, cardActor14, cardActor15, SearchIcon, BackArrow, showa } from '../../utils/constants/images';

const cardData = [
  {
    investmentName: '🌙 SHOWA : The Community Revolution',
    investorImg: showa,
    tags: ['🎮 #Gaming', '💰 #RWA', '🌐 #Community'],
    investments: [
      {
        head: 'Token',
        data: '$SHOWA',
      },
      {
        head: 'Revenue',
        data: '10% Steam',
      },
      {
        head: 'Launch',
        data: 'Dec 19',
      },
    ],
    karmaNeeded: 0
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
  const [activeLayout, setActiveLayout] = useState('OPEN');
  const [showDetails, setShowDetails] = useState(false);
  // const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const detailsLeftRef = useRef(null);
  const detailsRightRef = useRef(null);
  const [isPhase2, setIsPhase2] = useState(false);

  useEffect(() => {
    const fetchPhase = async () => {
      try {
        const response = await fetch('https://winwinsocietyweb3.com/api/investments/1');
        const data = await response.json();
        setIsPhase2(data.phase === 2);
      } catch (error) {
        console.error('Error fetching phase:', error);
      }
    };

    fetchPhase();
  }, []);

  const handleActive = (key) => { setActiveLayout(key) }
  const syncScroll = (e) => {
    const source = e.target;
    if (source === detailsLeftRef.current) {
      if (detailsRightRef.current.scrollHeight > detailsRightRef.current.clientHeight) {
        detailsRightRef.current.scrollTop = source.scrollTop;
      }
    } else if (source === detailsRightRef.current) {
      if (detailsLeftRef.current.scrollHeight > detailsLeftRef.current.clientHeight) {
        detailsLeftRef.current.scrollTop = source.scrollTop;
      }

      if (
        detailsRightRef.current.scrollTop + detailsRightRef.current.clientHeight >=
        detailsRightRef.current.scrollHeight
      ) {
        if (detailsLeftRef.current.scrollHeight > detailsLeftRef.current.clientHeight) {
          detailsLeftRef.current.scrollTop = detailsRightRef.current.scrollTop;
        }
      }
    }
  };


  const handleCardClick = (data, index) => {
    if (index === 0) {
      // setSelectedInvestment(data);
      setShowDetails(true);
    }
  }

  const handleBackToList = () => {
    setShowDetails(false);
    // setSelectedInvestment(null);
  }

  const [filter, setFilter] = useState({
    types: [],
    searchBy: ''
  })

  // const handleConnectWallet = (address) => {
  //   dispatch(setWalletAddress({ walletAddress: address }));
  // }

  const handleVerificationComplete = (message) => {
    dispatch(setWhitelistMessage({ whitelistMessage: message }));
  }

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
              I&apos;m inside already
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
          <div className="payment-details">
            <p><strong>COIN:</strong> $USDT</p>
            <p><strong>NETWORK:</strong> SOLANA</p>
            <p>
              <strong>ADDRESS:</strong>
              <span
                className="copy-address"
                onClick={() => {
                  navigator.clipboard.writeText("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
                  toast.success("Address copied!", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    style: {
                      background: "var(--card-background)",
                      color: "var(--primary-white)",
                      fontFamily: "MedievalSharp, cursive"
                    }
                  });
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </span>
            </p>
          </div>
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
              Wasn&apos;t but I just did
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
              Wasn&apos;t but I just did
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
    <div className='investment_wrapper'>
      {!showDetails ? (
        <>
          <div className="investments_content_header">
            <div className="content_left">
              <h2>Investment</h2>
              <div className="search_wrap">
                <CustomSearch value={filter.searchBy} placeholder="Search" isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
              </div>
            </div>
            {isSearchOpen && <div className="mobile_search">
              <span className="icon"><SearchIcon /></span>
              <input value={filter.searchBy} type="text" placeholder="Search" />
            </div>}
            <div className="content_right">
              <a href="#">Darknight Labs</a>
            </div>
          </div>
          <div className="investments_page_data">
            <div className={`page_data ${isSearchOpen ? 'search_open' : ''}`}>
              <div className="investment_page_header">
                <div className="investment_toggleWrap">
                  <button
                    className={`investment_toggle_btn ${activeLayout === 'CLOSED' ? 'active' : ''}`}
                    onClick={() => handleActive('CLOSED')}
                  >
                    <span>Closed</span>
                  </button>
                  <button
                    className={`investment_toggle_btn ${activeLayout === 'OPEN' ? 'active' : ''}`}
                    onClick={() => handleActive('OPEN')}
                  >
                    <span>Open</span>
                  </button>
                  <button
                    className={`investment_toggle_btn ${activeLayout === 'PLEDGE' ? 'active' : ''}`}
                    onClick={() => handleActive('PLEDGE')}
                  >
                    <span>Pledge</span>
                  </button>
                  <button
                    className={`investment_toggle_btn ${activeLayout === 'APPLY' ? 'active' : ''}`}
                    onClick={() => handleActive('APPLY')}
                  >
                    <span>Apply</span>
                  </button>
                  <button
                    className={`investment_toggle_btn ${activeLayout === 'MY_INVESTMENTS' ? 'active' : ''}`}
                    onClick={() => handleActive('MY_INVESTMENTS')}
                  >
                    <span>My Investments</span>
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

                <div className="card_container">{cardData.length == 0 ?
                  <EmptyData />
                  :
                  <>
                    {cardData.map((data, index) => {
                      return (
                        <div className='card_wrap' key={index} onClick={() => handleCardClick(data, index)}>
                          <div className="card">
                            <div className="card_image">
                              <img src={data.investorImg} alt="" />
                            </div>
                            <div className="card_body">
                              <div className="name">{data.investmentName}</div>
                              <div className="tabs">
                                {data.investments.map((tag, index) => {
                                  return (
                                    <div className={``} key={index}>
                                      <div className='investment_tag'>
                                        <>{tag.head}:{tag.data}</>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              <div className="tabs">
                                {data.tags.map((data, index) => {
                                  return (
                                    <div className={``} key={index}>
                                      <div className='meta_tag'>
                                        <>{data}</>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              {data.karmaNeeded !== undefined && (
                                <div className="karma_needed">
                                  Karma needed: {data.karmaNeeded}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </>
                }
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
              <h2>Investment Details</h2>
            </div>
          </div>
          <div className="investments_page_data">
            <h2 className={`floating_form_title ${isPhase2 ? 'pledge_mode' : 'invest_mode'}`}>
              {isPhase2 ? 'Pledge' : 'Invest'}
            </h2>
            <div className="page_data">
              <div className="investment_page_body">
                <div className="investment_details_content">
                  <div
                    ref={detailsLeftRef}
                    className="details_left"
                    onScroll={syncScroll}
                  >
                    <div className="investment-header">
                      <button className="back_arrow" onClick={handleBackToList}>
                        <BackArrow />
                      </button>
                      <h1 className="title">🌙 SHOWA : The Community Revolution</h1>
                      <div className="description">
                        <p className="highlight-text">
                          Join the community-driven movement behind Showa American Story, transforming from a banned game to a revolutionary token ecosystem with real utility and Steam revenue sharing.
                        </p>
                      </div>
                    </div>

                    <div className="section vision-section">
                      <h2 className="section-title">💫 Our Vision</h2>
                      <p className="section-intro">We're building a revolutionary 3-stage pump strategy that combines memecoins, utility, and real-world assets:</p>
                      
                      <div className="stage-details">
                        <div className="stage-block">
                          <h3 className="stage-title">Stage 1: Memecoin Launch</h3>
                          <div className="stage-date">Dec.19-23</div>
                          <p className="stage-description">The passionate community and fans behind Showa American Story initiated this token movement after the game was removed by TGA for being too "violent" - a true story that sparked our revolution.</p>
                        </div>

                        <div className="stage-block">
                          <h3 className="stage-title">Stage 2: Utility Integration</h3>
                          <div className="stage-date">Dec.24-Jan.15</div>
                          <p className="stage-description">Oneness Labs will integrate $SHOWA token into TheGame.fun platform - a price discovery platform for trading in-game items. Backed by our 200K community, 4K NFT holders, and 100+ major buyers.</p>
                        </div>

                        <div className="stage-block">
                          <h3 className="stage-title">Stage 3: RWA Integration</h3>
                          <div className="stage-date">Jan.15-Mar/April</div>
                          <p className="stage-description">The Showa Dev team will officially adopt $SHOWA, allocating 10% of the game's lifetime Steam revenue to the token while building the community together.</p>
                        </div>

                        <div className="stage-block">
                          <h3 className="stage-title">Final Stage: Steam Launch</h3>
                          <p className="stage-description highlight-text">The ultimate catalyst: Showa's release on Steam, targeting 5M copies and injecting $30M cash into $SHOWA ecosystem.</p>
                        </div>
                      </div>
                    </div>

                    <div className="section details-section">
                      <h2 className="section-title">🎮 Project Details</h2>
                      <div className="details-grid">
                        <div className="detail-item">Gaming, Community Token, Revenue Sharing</div>
                        <div className="detail-item">Backed by Real Game Revenue</div>
                        <div className="detail-item">Multiple Growth Catalysts</div>
                        <div className="detail-item">Strong Community Foundation</div>
                      </div>
                    </div>

                    <div className="section features-section">
                      <h2 className="section-title">🚀 Why SHOWA?</h2>
                      <div className="features-grid">
                        <div className="feature-item">
                          <span className="feature-highlight">Real Utility:</span> Integration with TheGame.fun platform
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">Revenue Sharing:</span> 10% of lifetime Steam revenue
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">Strong Community:</span> 200K members and growing
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">Multiple Growth Stages:</span> Planned catalysts for sustainable growth
                        </div>
                      </div>
                    </div>

                    <div className="section backers-section">
                      <h2 className="section-title">👑 Backed by</h2>
                      <div className="backers-grid">
                        <div className="backer-item">Oneness Labs</div>
                        <div className="backer-item">TheGame.fun Platform</div>
                        <div className="backer-item">4K+ NFT Holders</div>
                        <div className="backer-item">100+ Major Buyers</div>
                        <div className="backer-item">200K Community Members</div>
                      </div>
                    </div>

                    <div className="section security-section">
                      <h2 className="section-title">🔒 Security & Ownership</h2>
                      <div className="security-grid">
                        <div className="security-item">Community-Driven Development</div>
                        <div className="security-item">Transparent Revenue Sharing Model</div>
                        <div className="security-item">Multiple Utility Integrations</div>
                        <div className="security-item">Sustainable Growth Strategy</div>
                      </div>
                    </div>

                    <div className="section movement-section">
                      <h2 className="section-title">🌙 Join the SHOWA Revolution</h2>
                      <p className="movement-text">
                        Be part of a unique journey from banned game to revolutionary token ecosystem. Together, we're building something unprecedented in the gaming space! 
                      </p>
                      <div className="stars">✨ The Future of Gaming Communities Starts Here ✨</div>
                    </div>
                  </div>
                  <div
                    ref={detailsRightRef}
                    className="details_right"
                    onScroll={syncScroll}
                  >
                    <div className="form_container">
                      {!isPhase2 ? (
                        <InvestmentForm />
                      ) : (
                        <PledgeForm
                          onSubmit={async (pledgeData) => {
                            try {
                              console.log('Pledge submitted:', pledgeData);
                              toast.success('Pledge submitted successfully');
                            } catch (error) {
                              console.error('Error submitting pledge:', error);
                              toast.error('Failed to submit pledge');
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Investment
