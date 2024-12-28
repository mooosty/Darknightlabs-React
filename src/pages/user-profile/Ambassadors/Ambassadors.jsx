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
    const [selectedNiches, setSelectedNiches] = useState([]);
    const [selectedAudiences, setSelectedAudiences] = useState([]);
    const [selectedSocials, setSelectedSocials] = useState([]);

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
                setSelectedNiches([...selectedNiches, newCustomField]);
                break;
            case 'audience':
                setCustomAudienceTypes([...customAudienceTypes, newCustomField]);
                setSelectedAudiences([...selectedAudiences, newCustomField]);
                break;
            case 'socials':
                setCustomSocials([...customSocials, newCustomField]);
                setSelectedSocials([...selectedSocials, `custom-social-${customSocials.length}`]);
                break;
        }
        setNewCustomField('');
    };

    const handleKeyPress = (e, section) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomField(section);
        }
    };

    const handleDeleteCustom = (type, item) => {
        switch(type) {
            case 'niches':
                setCustomNiches(customNiches.filter(n => n !== item));
                setSelectedNiches(selectedNiches.filter(n => n !== item));
                break;
            case 'audience':
                setCustomAudienceTypes(customAudienceTypes.filter(t => t !== item));
                setSelectedAudiences(selectedAudiences.filter(t => t !== item));
                break;
            case 'socials':
                const index = customSocials.indexOf(item);
                setCustomSocials(customSocials.filter(s => s !== item));
                setSelectedSocials(selectedSocials.filter(s => s !== `custom-social-${index}`));
                break;
        }
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
                                            <div 
                                                key={index} 
                                                className={`option default ${selectedNiches.includes(niche) ? 'selected' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newSelected = selectedNiches.includes(niche)
                                                        ? selectedNiches.filter(n => n !== niche)
                                                        : [...selectedNiches, niche];
                                                    setSelectedNiches(newSelected);
                                                }}
                                            >
                                                <label>{niche}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="custom_options">
                                        {customNiches.map((niche, index) => (
                                            <div 
                                                key={`custom-${index}`} 
                                                className={`option custom ${selectedNiches.includes(niche) ? 'selected' : ''}`}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newSelected = selectedNiches.includes(niche)
                                                            ? selectedNiches.filter(n => n !== niche)
                                                            : [...selectedNiches, niche];
                                                        setSelectedNiches(newSelected);
                                                    }}
                                                >
                                                    <label>{niche}</label>
                                                </div>
                                                <span 
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteCustom('niches', niche);
                                                    }}
                                                >
                                                    ×
                                                </span>
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
                                        onKeyPress={(e) => handleKeyPress(e, 'niches')}
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
                                            <div 
                                                key={index} 
                                                className={`option default ${selectedAudiences.includes(type) ? 'selected' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newSelected = selectedAudiences.includes(type)
                                                        ? selectedAudiences.filter(t => t !== type)
                                                        : [...selectedAudiences, type];
                                                    setSelectedAudiences(newSelected);
                                                }}
                                            >
                                                <label>{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="custom_options">
                                        {customAudienceTypes.map((type, index) => (
                                            <div 
                                                key={`custom-${index}`} 
                                                className={`option custom ${selectedAudiences.includes(type) ? 'selected' : ''}`}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newSelected = selectedAudiences.includes(type)
                                                            ? selectedAudiences.filter(t => t !== type)
                                                            : [...selectedAudiences, type];
                                                        setSelectedAudiences(newSelected);
                                                    }}
                                                >
                                                    <label>{type}</label>
                                                </div>
                                                <span 
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteCustom('audience', type);
                                                    }}
                                                >
                                                    ×
                                                </span>
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
                                        onKeyPress={(e) => handleKeyPress(e, 'audience')}
                                    />
                                    <button onClick={() => handleAddCustomField('audience')}>Add</button>
                                </div>
                            </div>

                            {/* Main Socials Section */}
                            <div className="section socials_section">
                                <h3>Main Socials</h3>
                                <div className="socials_container">
                                    {defaultSocials.map((social) => (
                                        <div 
                                            key={social.id} 
                                            className={`social_input_group ${selectedSocials.includes(social.id) ? 'selected' : ''}`}
                                        >
                                            <div 
                                                className="social_label"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newSelected = selectedSocials.includes(social.id)
                                                        ? selectedSocials.filter(s => s !== social.id)
                                                        : [...selectedSocials, social.id];
                                                    setSelectedSocials(newSelected);
                                                }}
                                            >
                                                <label>{social.name}</label>
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
                                        <div 
                                            key={`custom-${index}`} 
                                            className={`social_input_group custom ${selectedSocials.includes(`custom-social-${index}`) ? 'selected' : ''}`}
                                        >
                                            <div className="social_label_wrapper">
                                                <div 
                                                    className="social_label"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newSelected = selectedSocials.includes(`custom-social-${index}`)
                                                            ? selectedSocials.filter(s => s !== `custom-social-${index}`)
                                                            : [...selectedSocials, `custom-social-${index}`];
                                                        setSelectedSocials(newSelected);
                                                    }}
                                                >
                                                    <label>{social}</label>
                                                </div>
                                                <span 
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteCustom('socials', social);
                                                    }}
                                                >
                                                    ×
                                                </span>
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
                                        onKeyPress={(e) => handleKeyPress(e, 'socials')}
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