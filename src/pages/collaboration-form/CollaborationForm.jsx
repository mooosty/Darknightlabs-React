import React, { useState } from 'react';
import './collaborationForm.scss';

const CollaborationForm = () => {
  const [formData, setFormData] = useState({
    discordUsername: '',
    telegramUsername: '',
    personalTwitter: '',
    projectName: '',
    projectDescription: '',
    hasBuilders: '',
    projectTwitter: '',
    discordInvite: '',
    website: '',
    blockchain: '',
    marketplaceLink: '',
    notableCollabs: '',
    wantWhitelist: 'Yes',
    collaborationTypes: {
      likeRtRaffle: false,
      twitterSpaces: false,
      twitterGiveaway: false,
      projectThread: false,
      whaleKolThread: false,
      communityRaid: false,
      airdropValue: false,
      other: false,
    },
    discordRequestSent: false,
    averageEntries: '',
    desiredWhitelistSpots: '',
    amaAttendees: '',
    additionalNotes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      collaborationTypes: {
        ...prev.collaborationTypes,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="collaboration-form">
      <div className="form-header">
        <h1 className="form-title">GeezOnApe - Collab Form</h1>
        <div className="form-description">
          <p>THIS FORM IS TO BE FILLED OUT BY PROJECT OWNERS/TEAM MEMBERS ONLY!</p>
          <p>◾️ Please fill out this form if you'd like to collab with GeezOnApe!</p>
          <p>◾️ If you represent multiple projects, please fill out this form once for each project.</p>
          <p>◾️ The team will get back to you ASAP if interested (give it 24h on average). Thank you!</p>
        </div>
        <div className="form-links">
          <p>Links:</p>
          <a href="https://x.com/GeezOnApe" target="_blank" rel="noopener noreferrer">
            https://x.com/GeezOnApe
          </a>
          <br />
          <a href="mailto:laoumir.mostefa@gmail.com">
            laoumir.mostefa@gmail.com
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="discordUsername">Discord Username *</label>
          <input
            required
            id="discordUsername"
            name="discordUsername"
            value={formData.discordUsername}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telegramUsername">Telegram Username *</label>
          <input
            required
            id="telegramUsername"
            name="telegramUsername"
            value={formData.telegramUsername}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="personalTwitter">Personal Twitter Page *</label>
          <input
            required
            id="personalTwitter"
            name="personalTwitter"
            value={formData.personalTwitter}
            onChange={handleChange}
          />
          <div className="helper-text">Example: https://x.com/darknighthimslf</div>
        </div>

        <div className="form-group">
          <label htmlFor="projectName">Project Name *</label>
          <input
            required
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectDescription">Tell us about your project *</label>
          <textarea
            required
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            rows={4}
          />
          <div className="helper-text">Include utility, founders, backing...</div>
        </div>

        <div className="form-group">
          <label htmlFor="hasBuilders">Do you have builders or aspiring builders in your community? *</label>
          <textarea
            required
            id="hasBuilders"
            name="hasBuilders"
            value={formData.hasBuilders}
            onChange={handleChange}
            rows={3}
          />
          <div className="helper-text">Can be founders, artists, devs, VCs, content creator ... any type of builder</div>
        </div>

        <div className="form-group">
          <label htmlFor="projectTwitter">Project Twitter Link *</label>
          <input
            required
            id="projectTwitter"
            name="projectTwitter"
            value={formData.projectTwitter}
            onChange={handleChange}
          />
          <div className="helper-text">Example: https://x.com/GeezOnApe</div>
        </div>

        <div className="form-group">
          <label htmlFor="discordInvite">Discord Invite Link *</label>
          <input
            required
            id="discordInvite"
            name="discordInvite"
            value={formData.discordInvite}
            onChange={handleChange}
          />
          <div className="helper-text">If not relevant, write N/A</div>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website *</label>
          <input
            required
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
          <div className="helper-text">If not relevant, write N/A</div>
        </div>

        <div className="form-group">
          <label htmlFor="blockchain">Blockchain *</label>
          <input
            required
            id="blockchain"
            name="blockchain"
            value={formData.blockchain}
            onChange={handleChange}
          />
          <div className="helper-text">ETH, SOL, BTC...</div>
        </div>

        <div className="form-group">
          <label htmlFor="marketplaceLink">Opensea / Magic Eden Link *</label>
          <input
            required
            id="marketplaceLink"
            name="marketplaceLink"
            value={formData.marketplaceLink}
            onChange={handleChange}
          />
          <div className="helper-text">If not minted yet, write: Not launched yet</div>
        </div>

        <div className="form-group">
          <label htmlFor="notableCollabs">Notable Collaborations / Partnerships *</label>
          <textarea
            required
            id="notableCollabs"
            name="notableCollabs"
            value={formData.notableCollabs}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Are you looking to get whitelist spots for your community? *</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="whitelistYes"
                name="wantWhitelist"
                value="Yes"
                checked={formData.wantWhitelist === 'Yes'}
                onChange={handleChange}
              />
              <label htmlFor="whitelistYes">Yes</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="whitelistOther"
                name="wantWhitelist"
                value="Other"
                checked={formData.wantWhitelist === 'Other'}
                onChange={handleChange}
              />
              <label htmlFor="whitelistOther">Other</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>What can you do for our project? *</label>
          <div className="checkbox-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="likeRtRaffle"
                name="likeRtRaffle"
                checked={formData.collaborationTypes.likeRtRaffle}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="likeRtRaffle">🟪 Host a Like/RT raffle</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="twitterSpaces"
                name="twitterSpaces"
                checked={formData.collaborationTypes.twitterSpaces}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="twitterSpaces">🟨 Hosting a Twitter Spaces / AMA</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="twitterGiveaway"
                name="twitterGiveaway"
                checked={formData.collaborationTypes.twitterGiveaway}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="twitterGiveaway">🟦 Twitter giveaway post</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="projectThread"
                name="projectThread"
                checked={formData.collaborationTypes.projectThread}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="projectThread">📝 Tweet a thread about our project from your project's account and / or founder's account</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="whaleKolThread"
                name="whaleKolThread"
                checked={formData.collaborationTypes.whaleKolThread}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="whaleKolThread">🟫 Have your whales / KOLs tweet a thread</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="communityRaid"
                name="communityRaid"
                checked={formData.collaborationTypes.communityRaid}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="communityRaid">🟥 Have your community raid our tweet</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="airdropValue"
                name="airdropValue"
                checked={formData.collaborationTypes.airdropValue}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="airdropValue">🟩 Offer airdrop / free value / discounts to the GeezOnApe community</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="other"
                name="other"
                checked={formData.collaborationTypes.other}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>

        <div className="discord-info">
          <div className="discord-title">Please send a friend request on Discord to:</div>
          <div className="discord-usernames">
            ◾️collabcyborg.darknightlabs<br />
            Also to:<br />
            anna.darknightlabs.alt<br />
            fugue.darknightlabs<br />
            darknighthimself
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="discordRequestSent"
              name="discordRequestSent"
              checked={formData.discordRequestSent}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                discordRequestSent: e.target.checked
              }))}
            />
            <label htmlFor="discordRequestSent">I just sent a friend request to all 4 accounts above! *</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="averageEntries">Average Entries per Collab *</label>
          <input
            required
            id="averageEntries"
            name="averageEntries"
            value={formData.averageEntries}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="desiredWhitelistSpots">Desired Whitelist Spots *</label>
          <input
            required
            id="desiredWhitelistSpots"
            name="desiredWhitelistSpots"
            value={formData.desiredWhitelistSpots}
            onChange={handleChange}
          />
          <div className="helper-text">It doesn't mean we will necessarily give you that amount, it just gives us an indication on your ideal number of spots</div>
        </div>

        <div className="form-group">
          <label htmlFor="amaAttendees">Attendees on AMAs / Twitter Spaces *</label>
          <input
            required
            id="amaAttendees"
            name="amaAttendees"
            value={formData.amaAttendees}
            onChange={handleChange}
          />
          <div className="helper-text">If relevant</div>
        </div>

        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={4}
          />
          <div className="helper-text">Anything you want to add?</div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaborationForm; 