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
  'Alpha calls / Traders groups'
];

const PledgeForm = ({ onSubmit }) => {
  const [ticketSize, setTicketSize] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [customValue, setCustomValue] = useState('');
  const [elaboration, setElaboration] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && customValue.trim()) {
      if (!selectedValues.includes(customValue.trim())) {
        setSelectedValues([...selectedValues, customValue.trim()]);
      }
      setCustomValue('');
    }
  };

  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const removeValue = (value) => {
    setSelectedValues(selectedValues.filter(v => v !== value));
  };

  const handleSubmit = () => {
    if (!ticketSize) {
      toast.error('Please enter your ideal ticket size');
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

    onSubmit({
      ticketSize,
      values: selectedValues,
      elaboration
    });
  };

  return (
    <div className="pledge-form-card">
      <div className="pledge-form-header">
        <h3 className="pledge-form-title">Pledge</h3>
      </div>
      <div className="pledge-form-content">
        <div className="form-group">
          <label className="form-label">How much do you wanna invest?</label>
          <input
            className="form-input"
            type="text"
            value={ticketSize}
            onChange={(e) => setTicketSize(e.target.value)}
            placeholder="Enter your ideal ticket size"
          />
          <p className="form-description">Put your ideal ticket size, the highest you'd like to put in. Although this allocation is very limited, we'll do our best to try and accomodate your needs</p>
        </div>

        <div className="form-group">
          <label className="form-label">What value can you bring to $SHOWA as a strategic investor?</label>
          <div className="value-buttons">
            {valueOptions.map((value) => (
              <button
                key={value}
                className={`value-button ${selectedValues.includes(value) ? 'selected' : ''}`}
                onClick={() => toggleValue(value)}
                type="button"
              >
                {value}
              </button>
            ))}
          </div>
          <div className="custom-value">
            <input
              className="form-input"
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add custom value (press Enter)"
            />
          </div>
          {selectedValues.length > 0 && (
            <div className="selected-values">
              {selectedValues.map((value) => (
                <span key={value} className="value-tag">
                  {value}
                  <button onClick={() => removeValue(value)} type="button">&times;</button>
                </span>
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