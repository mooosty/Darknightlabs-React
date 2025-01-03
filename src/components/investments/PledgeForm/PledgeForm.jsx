import { useState } from 'react';
import PropTypes from 'prop-types';
import './PledgeForm.scss';
import { toast } from 'react-toastify';

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
  const [ticketSize, setTicketSize] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [transactionLink, setTransactionLink] = useState('');
  const [claimWallet, setClaimWallet] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [currentValue, setCurrentValue] = useState('');
  const [customValueType, setCustomValueType] = useState('');
  const [currentContribution, setCurrentContribution] = useState('');
  const [elaboration, setElaboration] = useState('');

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
    if (!investedAmount) {
      toast.error('Please enter the amount you invested');
      return;
    }
    if (!transactionLink) {
      toast.error('Please provide your transaction link');
      return;
    }
    if (!claimWallet) {
      toast.error('Please provide your BASE claim wallet');
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(claimWallet)) {
      toast.error('Please enter a valid BASE wallet address');
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
          ticketSize,
          investedAmount,
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
          investedAmount,
          transactionLink,
          claimWallet,
          values: formattedValues,
          elaboration
        });

        // Clear form after successful submission
        setTicketSize('');
        setInvestedAmount('');
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
            <p>Please choose the amount you wanna invest in SHOWA - max amount is $500 per person - then send the funds to the wallet below</p>
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
            <label className="form-label">Type below the amount you invested</label>
            <input
              className="form-input"
              type="text"
              value={investedAmount}
              onChange={(e) => setInvestedAmount(e.target.value)}
              placeholder="Enter the amount you invested"
            />
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
            <label className="form-label">Post your BASE Claim wallet</label>
            <input
              className="form-input"
              type="text"
              value={claimWallet}
              onChange={(e) => setClaimWallet(e.target.value)}
              placeholder="Enter your BASE wallet address"
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
              <option value="">Select a value</option>
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
            placeholder="Share how you can contribute to $SHOWA in as much detail as possible"
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