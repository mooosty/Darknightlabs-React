import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PledgeForm.scss';
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";

const valueOptions = [
  'Social Ambassadorship',
  'Network & Intros',
  'Investors & VCs',
  'Brand Partnerships',
  'Gaming Partnerships',
  'DeFi',
  'Launchpad',
  'Alpha calls / Traders groups',
  'Other...'
];

const PledgeForm = ({ onSubmit }) => {
  const { userId, name } = useSelector((state) => state.auth);
  
  // Move ALL state declarations to the top
  const [loading, setLoading] = useState(true);
  const [pledgeData, setPledgeData] = useState(null);
  const [showCounterOfferInput, setShowCounterOfferInput] = useState(false);
  const [counterOffer, setCounterOffer] = useState('');
  const [ticketSize, setTicketSize] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [transactionLink, setTransactionLink] = useState('');
  const [claimWallet, setClaimWallet] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [currentValue, setCurrentValue] = useState('');
  const [customValueType, setCustomValueType] = useState('');
  const [currentContribution, setCurrentContribution] = useState('');
  const [elaboration, setElaboration] = useState('');

  useEffect(() => {
    const fetchPledgeData = async () => {
      try {
        const response = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/${userId}/showa`);
        if (response.ok) {
          const responseData = await response.json();
          console.log('API Response:', responseData); // Debug log
          if (responseData.success === 1 && responseData.data) {
            setPledgeData(responseData.data);
          }
        }
      } catch (error) {
        console.error('Error fetching pledge data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPledgeData();
    }
  }, [userId]);

  const handleCounterOfferSubmit = async () => {
    if (!counterOffer) {
      toast.error('Please enter your counter offer');
      return;
    }

    try {
      const response = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/user-counter/${userId}/showa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_counter_offer: counterOffer
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit counter offer');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Counter offer submitted successfully');
        // Refresh pledge data
        const updatedResponse = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/${userId}/showa`);
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          if (updatedData.success === 1 && updatedData.data) {
            setPledgeData({
              ...updatedData.data,
              wws_reply: 0 // Force the pending state
            });
          }
        }
        setShowCounterOfferInput(false);
        setCounterOffer('');
      }
    } catch (error) {
      console.error('Error submitting counter offer:', error);
      toast.error('Failed to submit counter offer. Please try again.');
    }
  };

  const handleAddValue = () => {
    if ((currentValue === 'Other...' ? customValueType.trim() : currentValue) && currentContribution.trim()) {
      const newValue = {
        type: currentValue === 'Other...' ? customValueType.trim() : currentValue,
        contribution: currentContribution.trim()
      };
      setSelectedValues([...selectedValues, newValue]);
      setCurrentValue('');
      setCustomValueType('');
      setCurrentContribution('');
    }
  };

  const removeValue = (index) => {
    setSelectedValues(selectedValues.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!ticketSize) {
      toast.error('Please enter your ideal ticket size');
      return;
    }
    if (!transactionLink) {
      toast.error('Please provide your transaction link');
      return;
    }
    if (!claimWallet) {
      toast.error('Please provide your SOLANA claim wallet');
      return;
    }
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(claimWallet)) {
      toast.error('Please enter a valid SOLANA wallet address');
      return;
    }
    if (selectedValues.length === 0) {
      toast.error('Please select at least one value you can bring');
      return;
    }
    if (!elaboration) {
      toast.error('Please elaborate on how you can contribute');
      return;
    }

    try {
      const formattedValues = selectedValues.map(value => 
        `${value.type}: ${value.contribution}`
      ).join(', ');
      
      const response = await fetch('https://winwinsocietyweb3.com/api/submit-form-pledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          username: name,
          ticketSize,
          transactionLink,
          claimWallet,
          values: formattedValues,
          elaboration
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit pledge');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Pledge submitted successfully');
        onSubmit({
          ticketSize,
          transactionLink,
          claimWallet,
          values: formattedValues,
          elaboration
        });

        // Fetch updated pledge data
        const pledgeResponse = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/${userId}/showa`);
        if (pledgeResponse.ok) {
          const pledgeData = await pledgeResponse.json();
          if (pledgeData.success === 1 && pledgeData.data) {
            setPledgeData(pledgeData.data);
          }
        }

        // Clear form after successful submission
        setTicketSize('');
        setTransactionLink('');
        setClaimWallet('');
        setSelectedValues([]);
        setElaboration('');
      } else {
        throw new Error(data.error || 'Failed to submit pledge');
      }
    } catch (error) {
      console.error('Error submitting pledge:', error);
      toast.error('Failed to submit pledge. Please try again.');
    }
  };

  const handleAcceptOffer = async () => {
    try {
      const response = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/user-accept/${userId}/showa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept offer');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Offer accepted successfully');
        // Refresh pledge data
        const updatedResponse = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/${userId}/showa`);
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setPledgeData(updatedData.data);
        }
      }
    } catch (error) {
      console.error('Error accepting offer:', error);
      toast.error('Failed to accept offer. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (pledgeData && pledgeData.invested_amount) {
    return (
      <div className="pledge-form-card">
        <div className="pledge-form-content">
          <div className="submission-details">
            <h3 className="submission-title">Your Submission Details</h3>
            <div className="amount-display">
              <span className="label">You submitted:</span>
              <span className="amount">{pledgeData.invested_amount} USDT</span>
            </div>
          </div>
          
          {pledgeData.accepted === 1 ? (
            <div className="accepted-offer-section">
              <h4 className="accepted-title">Congratulations! Your offer has been accepted</h4>
              <div className="final-amount">
                Your accepted amount is: {pledgeData.final_offer} USDT
              </div>
            </div>
          ) : pledgeData.accepted === 0 && pledgeData.wws_reply === 0 ? (
            <div className="pending-section">
              <h4 className="pending-title">Thank you for your submission</h4>
              <p className="pending-message">
                The team will see if they can accommodate your request or counter back.
                Please check back later for updates.
              </p>
            </div>
          ) : (
            <div className="counter-offer-section">
              <div className="wws-counter">
                <h4 className="counter-title">The WinWin Society is Countering that offer with:</h4>
                <div className="counter-amount">
                  {pledgeData.wws_counter_offer === "0.00" ? (
                    <span className="no-counter">No counter offer yet</span>
                  ) : (
                    `${pledgeData.wws_counter_offer} USDT`
                  )}
                </div>
              </div>
              
              {pledgeData.wws_counter_offer !== "0.00" && (
                <>
                  {!showCounterOfferInput && (
                    <div className="action-section">
                      <p className="action-prompt">Would you like to accept or counter offer?</p>
                      <div className="button-group">
                        <button 
                          className="action-button accept"
                          onClick={handleAcceptOffer}
                        >
                          Accept Offer
                        </button>
                        <button 
                          className="action-button counter"
                          onClick={() => setShowCounterOfferInput(true)}
                        >
                          Make Counter Offer
                        </button>
                      </div>
                    </div>
                  )}

                  {showCounterOfferInput && (
                    <div className="counter-input-section">
                      <input
                        type="text"
                        className="counter-input"
                        value={counterOffer}
                        onChange={(e) => setCounterOffer(e.target.value)}
                        placeholder="Enter your counter offer in USDT"
                      />
                      <button 
                        className="submit-counter"
                        onClick={handleCounterOfferSubmit}
                      >
                        Submit Counter Offer
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original form JSX
  return (
    <div className="pledge-form-card">
      <div className="pledge-form-header">
        <h3 className="pledge-form-title"></h3>
      </div>
      <div className="pledge-form-content">
        <div className="form-group">
          <label className="form-label">How much do you want to invest?($USDT)</label>
          <input
            className="form-input"
            type="text"
            value={ticketSize}
            onChange={(e) => setTicketSize(e.target.value)}
            placeholder="Enter your ideal ticket size"
          />
          <p className="form-description">Put your ideal ticket size, the highest you'd like to put in. Although this allocation is very limited, we'll do our best to try and accomodate your needs</p>
          
          <div className="payment-info">
            <p>Please send the tokens you would like to pledge to the address below</p>
            <div className="wallet-details">
              <p><strong>COIN:</strong> $USDT</p>
              <p><strong>NETWORK:</strong> SOLANA</p>
              <p className="wallet-address">
                <strong>ADDRESS:</strong>
                <span className="copy-text" onClick={() => {
                  navigator.clipboard.writeText("Pending");
                  toast.success("Address copied!");
                }}>
                  Pending
                </span>
              </p>
            </div>
            <p className="warning">⚠️Limited allocation, will be attributed on a first-come first-serve basis. Those who contribute too late will be refunded.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Paste your blockchain explorer transaction link here</label>
            <input
              className="form-input"
              type="text"
              value={transactionLink}
              onChange={(e) => setTransactionLink(e.target.value)}
              placeholder="Enter your transaction link"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Post your SOLANA Claim wallet</label>
            <input
              className="form-input"
              type="text"
              value={claimWallet}
              onChange={(e) => setClaimWallet(e.target.value)}
              placeholder="Enter your SOLANA wallet address"
            />
            <p className="form-description">The wallet you'll be using to get your tokens. Please make sure it's the correct wallet!</p>
          </div>

          <div className="info-box">
            <div className="info-box-title">Project Priorities</div>
            <ul>
              <li>🎯 Awareness and attention</li>
              <li>🏛️ Cult building around Showa IP</li>
              <li>🤝 Partnerships with gaming ecosystems, brands, IPs</li>
            </ul>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">What value can you bring to $SHOWA as a strategic investor?</label>
          <div className="value-input-group">
            <select 
              className="form-select"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            >
              <option value="">Select value-adds</option>
              {valueOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {currentValue === 'Other...' && (
              <input
                className="form-input"
                type="text"
                value={customValueType}
                onChange={(e) => setCustomValueType(e.target.value)}
                placeholder="Enter your value type..."
              />
            )}
            <input
              className="form-input"
              type="text"
              value={currentContribution}
              onChange={(e) => setCurrentContribution(e.target.value)}
              placeholder="Describe how you can contribute in this area..."
            />
            <button 
              className="add-value-button"
              onClick={handleAddValue}
              type="button"
              disabled={(!currentValue || (currentValue === 'Other...' && !customValueType.trim()) || !currentContribution.trim())}
            >
              Add Value
            </button>
          </div>
          
          {selectedValues.length > 0 && (
            <div className="selected-values">
              {selectedValues.map((value, index) => (
                <div key={index} className="value-tag">
                  {value.type}
                  <div className="contribution-tooltip">
                    {value.contribution}
                  </div>
                  <button onClick={() => removeValue(index)} type="button">&times;</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Please elaborate</label>
          <textarea
            className="form-textarea"
            value={elaboration}
            onChange={(e) => setElaboration(e.target.value)}
            placeholder="Anything else you want us to know?"
            rows={4}
          />
        </div>

        <div className="form-actions">
          <button className="form-button primary" onClick={handleSubmit} type="button">
            Submit Pledge
          </button>
        </div>
      </div>
    </div>
  );
}

PledgeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PledgeForm; 