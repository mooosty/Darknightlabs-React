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
  const [counterOfferReason, setCounterOfferReason] = useState('');
  const [ticketSize, setTicketSize] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [transactionLink, setTransactionLink] = useState('');
  const [claimWallet, setClaimWallet] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [currentValue, setCurrentValue] = useState('');
  const [customValueType, setCustomValueType] = useState('');
  const [currentContribution, setCurrentContribution] = useState('');
  const [elaboration, setElaboration] = useState('');
  const [selectedValueTypes, setSelectedValueTypes] = useState([]);
  const [valueContributions, setValueContributions] = useState({});
  const [customValues, setCustomValues] = useState({});
  const [otherValueCount, setOtherValueCount] = useState(0);

  useEffect(() => {
    const fetchPledgeData = async () => {
      try {
        const response = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/${userId}/showa`);
        if (response.ok) {
          const responseData = await response.json();
          console.log('API Response:', responseData); // Debug log
          if (responseData.success === 1 && responseData.data) {
            // Parse counter_history if it's a string
            const data = {
              ...responseData.data,
              counter_history: typeof responseData.data.counter_history === 'string' 
                ? JSON.parse(responseData.data.counter_history)
                : responseData.data.counter_history
            };
            console.log('Parsed counter history:', data.counter_history); // Debug log
            setPledgeData(data);
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

    if (!counterOfferReason) {
      toast.error('Please provide a reason for your counter offer');
      return;
    }

    try {
      const response = await fetch(`https://winwinsocietyweb3.com/api/investment-pledge/user-counter/${userId}/showa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_counter_offer: counterOffer,
          counter_offer_reason: counterOfferReason
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
        setCounterOfferReason('');
      }
    } catch (error) {
      console.error('Error submitting counter offer:', error);
      toast.error('Failed to submit counter offer. Please try again.');
    }
  };

  const handleValueSelect = (value) => {
    setSelectedValueTypes(prev => {
      if (value === 'Other...') {
        // Add a new unique Other option
        const newOtherKey = `Other_${otherValueCount}`;
        setOtherValueCount(prev => prev + 1);
        return [...prev, newOtherKey];
      }

      if (prev.includes(value)) {
        // Remove value and its contribution
        const newValueContributions = { ...valueContributions };
        delete newValueContributions[value];
        setValueContributions(newValueContributions);
        
        if (value.startsWith('Other_')) {
          const newCustomValues = { ...customValues };
          delete newCustomValues[value];
          setCustomValues(newCustomValues);
        }
        
        return prev.filter(v => v !== value);
      } else {
        // Add value
        return [...prev, value];
      }
    });
  };

  const handleContributionChange = (value, contribution) => {
    setValueContributions(prev => ({
      ...prev,
      [value]: contribution
    }));
  };

  const handleCustomValueChange = (value, customValue) => {
    setCustomValues(prev => ({
      ...prev,
      [value]: customValue
    }));
  };

  const getSelectedValues = () => {
    return selectedValueTypes.map(type => ({
      type: type.startsWith('Other_') ? customValues[type] : type,
      contribution: valueContributions[type] || ''
    })).filter(value => 
      value.type && 
      (!value.type.startsWith('Other_') || customValues[value.type])
    );
  };

  useEffect(() => {
    setSelectedValues(getSelectedValues());
  }, [valueContributions, customValues, selectedValueTypes]);

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
    if (selectedValueTypes.length === 0) {
      toast.error('Please select at least one value you can bring');
      return;
    }
    if (!elaboration) {
      toast.error('Please elaborate on how you can contribute');
      return;
    }

    try {
      const formattedValues = selectedValues.map(value => 
        value.contribution ? `${value.type}: ${value.contribution}` : value.type
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <>
              <div className="accepted-offer-section">
                <h4 className="accepted-title">Congratulations! Your offer has been accepted</h4>
                <div className="final-amount">
                  Your accepted amount is: {pledgeData.final_offer} USDT
                </div>
              </div>
              
              <div className="counter-offer-section">
                <div className="counter-history">
                  <h4 className="history-title">Negotiation History</h4>
                  <div className="timeline">
                    {pledgeData.counter_history && Array.isArray(pledgeData.counter_history) && pledgeData.counter_history.map((entry, index) => (
                      <div key={index} className={`timeline-entry ${entry.by === 'admins' ? 'wws-entry' : 'user-entry'}`}>
                        <div className="timeline-content">
                          <div className="entry-header">
                            <span className="entry-by">{entry.by === 'admins' ? 'Win-Win Society' : 'You'}</span>
                            <span className="entry-time">{formatDate(entry.timestamp)}</span>
                          </div>
                          <div className="entry-amount">{entry.amount} USDT</div>
                          {(entry.reason || entry.counter_offer_reason) && (
                            <div className="entry-reason">
                              {entry.reason || entry.counter_offer_reason}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
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
              <div className="counter-history">
                <h4 className="history-title">Negotiation History</h4>
                <div className="timeline">
                  {pledgeData.counter_history && Array.isArray(pledgeData.counter_history) && pledgeData.counter_history.map((entry, index) => (
                    <div key={index} className={`timeline-entry ${entry.by === 'admins' ? 'wws-entry' : 'user-entry'}`}>
                      <div className="timeline-content">
                        <div className="entry-header">
                          <span className="entry-by">{entry.by === 'admins' ? 'Win-Win Society' : 'You'}</span>
                          <span className="entry-time">{formatDate(entry.timestamp)}</span>
                        </div>
                        <div className="entry-amount">{entry.amount} USDT</div>
                        {(entry.reason || entry.counter_offer_reason) && (
                          <div className="entry-reason">
                            {entry.reason || entry.counter_offer_reason}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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
                      <textarea
                        className="counter-reason-input"
                        value={counterOfferReason}
                        onChange={(e) => setCounterOfferReason(e.target.value)}
                        placeholder="Please explain why you want this amount"
                        rows={3}
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
          <div className="value-selection-group">
            {valueOptions.filter(option => option !== 'Other...').map((option) => (
              <div key={option} className="value-option-container">
                <button
                  type="button"
                  className={`value-select-button ${selectedValueTypes.includes(option) ? 'selected' : ''}`}
                  onClick={() => handleValueSelect(option)}
                >
                  {option}
                </button>
                
                {selectedValueTypes.includes(option) && (
                  <div className="value-input-container">
                    <textarea
                      className="form-input"
                      value={valueContributions[option] || ''}
                      onChange={(e) => handleContributionChange(option, e.target.value)}
                      placeholder={`Describe how you can contribute in ${option}... (optional)`}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Custom "Other" values */}
            {selectedValueTypes
              .filter(type => type.startsWith('Other_'))
              .map((otherKey) => (
                <div key={otherKey} className="value-option-container">
                  <div className="other-value-header">
                    <input
                      type="text"
                      className="form-input other-value-input"
                      value={customValues[otherKey] || ''}
                      onChange={(e) => handleCustomValueChange(otherKey, e.target.value)}
                      placeholder="Enter your value type..."
                    />
                    <button
                      type="button"
                      className="remove-other-button"
                      onClick={() => handleValueSelect(otherKey)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="value-input-container">
                    <textarea
                      className="form-input"
                      value={valueContributions[otherKey] || ''}
                      onChange={(e) => handleContributionChange(otherKey, e.target.value)}
                      placeholder="Describe how you can contribute in this area... (optional)"
                    />
                  </div>
                </div>
              ))}

            {/* Add Other button */}
            <button
              type="button"
              className="add-other-button"
              onClick={() => handleValueSelect('Other...')}
            >
              + Add Other Value
            </button>
          </div>
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