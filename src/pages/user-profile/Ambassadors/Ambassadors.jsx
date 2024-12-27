import PropTypes from 'prop-types';
import { useState } from 'react';
import './ambassadors.scss'

const Ambassadors = ({ handleActive, active }) => {
    const [customNiches, setCustomNiches] = useState([]);
    const [customAudienceTypes, setCustomAudienceTypes] = useState([]);
    const [customSocials, setCustomSocials] = useState([]);
    const [newCustomField, setNewCustomField] = useState('');
    const [activeSection, setActiveSection] = useState('');
    const [socialHandles, setSocialHandles] = useState({
        twitter: '',
        youtube: '',
        discord: '',
        instagram: '',
        twitch: ''
    });

    const defaultNiches = [
        "Gaming/Metaverse/GameFi",
        "AI",
        "RWA",
        "DePin",
        "DeFi",
        "Infrastructure",
        "L1/L2/L3",
        "Data",
        "IP"
    ];

    const defaultAudienceTypes = [
        "Traders",
        "Holders",
        "Whales",
        "Founders",
        "Degen"
    ];

    const defaultSocials = [
        { id: 'twitter', name: 'Twitter', placeholder: '@username' },
        { id: 'youtube', name: 'YouTube', placeholder: 'Channel URL' },
        { id: 'discord', name: 'Discord', placeholder: 'Server invite or username#0000' },
        { id: 'instagram', name: 'Instagram', placeholder: '@username' },
        { id: 'twitch', name: 'Twitch', placeholder: 'Channel name' }
    ];

    const handleSocialChange = (socialId, value) => {
        setSocialHandles(prev => ({
            ...prev,
            [socialId]: value
        }));
    };

    const handleAddCustomField = (section) => {
        if (!newCustomField.trim()) return;
        
        switch(section) {
            case 'niches':
                setCustomNiches([...customNiches, newCustomField]);
                break;
            case 'audience':
                setCustomAudienceTypes([...customAudienceTypes, newCustomField]);
                break;
            case 'socials':
                setCustomSocials([...customSocials, newCustomField]);
                break;
        }
        setNewCustomField('');
    };

    return (
        <>
            <div className="ambassadors_content_header">
                <div className="ambassadors_content_left">
                    <h2>Profile</h2>
                </div>
                <div className="ambassadors_content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="ambassadors_page_data">
                <div className="page_data">
                    <div className="header_button">
                        <div
                            className={`buttons ${active === "INFORMATION" ? "active" : ""}`}
                            onClick={() => handleActive("INFORMATION")}
                        >
                            PERSONAL INFORMATION
                        </div>
                        <div
                            className={`buttons ${active === "INVOLVEMENT" ? "active" : ""}`}
                            onClick={() => handleActive("INVOLVEMENT")}
                        >
                            PROJECT INVOLVEMENT
                        </div>
                        <div
                            className={`buttons ${active === "AMBASSADORS" ? "active" : ""}`}
                            onClick={() => handleActive("AMBASSADORS")}
                        >
                            AMBASSADOR
                        </div>
                    </div>

                    <div className="ambassadors_content_box">
                        <div className="ambassador_sections">
                            {/* Niches Section */}
                            <div className="section">
                                <h3>Niches</h3>
                                <div className="options_container">
                                    <div className="default_options">
                                        {defaultNiches.map((niche, index) => (
                                            <div key={index} className="option default">
                                                <input type="checkbox" id={`niche-${index}`} />
                                                <label htmlFor={`niche-${index}`}>{niche}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="custom_options">
                                        {customNiches.map((niche, index) => (
                                            <div key={`custom-${index}`} className="option custom">
                                                <input type="checkbox" id={`custom-niche-${index}`} />
                                                <label htmlFor={`custom-niche-${index}`}>{niche}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="add_custom_field">
                                    <input
                                        type="text"
                                        placeholder="Add custom niche"
                                        value={activeSection === 'niches' ? newCustomField : ''}
                                        onChange={(e) => {
                                            setActiveSection('niches');
                                            setNewCustomField(e.target.value);
                                        }}
                                    />
                                    <button onClick={() => handleAddCustomField('niches')}>Add</button>
                                </div>
                            </div>

                            {/* Audience Type Section */}
                            <div className="section">
                                <h3>Audience Type</h3>
                                <div className="options_container">
                                    <div className="default_options">
                                        {defaultAudienceTypes.map((type, index) => (
                                            <div key={index} className="option default">
                                                <input type="checkbox" id={`audience-${index}`} />
                                                <label htmlFor={`audience-${index}`}>{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="custom_options">
                                        {customAudienceTypes.map((type, index) => (
                                            <div key={`custom-${index}`} className="option custom">
                                                <input type="checkbox" id={`custom-audience-${index}`} />
                                                <label htmlFor={`custom-audience-${index}`}>{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="add_custom_field">
                                    <input
                                        type="text"
                                        placeholder="Add custom audience type"
                                        value={activeSection === 'audience' ? newCustomField : ''}
                                        onChange={(e) => {
                                            setActiveSection('audience');
                                            setNewCustomField(e.target.value);
                                        }}
                                    />
                                    <button onClick={() => handleAddCustomField('audience')}>Add</button>
                                </div>
                            </div>

                            {/* Main Socials Section */}
                            <div className="section socials_section">
                                <h3>Main Socials</h3>
                                <div className="socials_container">
                                    {defaultSocials.map((social) => (
                                        <div key={social.id} className="social_input_group">
                                            <div className="social_label">
                                                <input 
                                                    type="checkbox" 
                                                    id={`social-${social.id}`}
                                                    className="social_checkbox"
                                                />
                                                <label htmlFor={`social-${social.id}`}>{social.name}</label>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder={social.placeholder}
                                                value={socialHandles[social.id]}
                                                onChange={(e) => handleSocialChange(social.id, e.target.value)}
                                                className="social_handle_input"
                                            />
                                        </div>
                                    ))}
                                    
                                    {customSocials.map((social, index) => (
                                        <div key={`custom-${index}`} className="social_input_group custom">
                                            <div className="social_label">
                                                <input 
                                                    type="checkbox" 
                                                    id={`custom-social-${index}`}
                                                    className="social_checkbox"
                                                />
                                                <label htmlFor={`custom-social-${index}`}>{social}</label>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter handle/URL"
                                                className="social_handle_input"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="add_custom_field">
                                    <input
                                        type="text"
                                        placeholder="Add custom social platform"
                                        value={activeSection === 'socials' ? newCustomField : ''}
                                        onChange={(e) => {
                                            setActiveSection('socials');
                                            setNewCustomField(e.target.value);
                                        }}
                                    />
                                    <button onClick={() => handleAddCustomField('socials')}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Ambassadors.propTypes = {
    handleActive: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired,
};

export default Ambassadors