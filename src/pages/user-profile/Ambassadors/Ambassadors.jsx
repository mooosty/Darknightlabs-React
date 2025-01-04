import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './ambassadors.scss'
import { CustomDropdown } from '../../../components';
import { ThreeDots } from '../../../utils/constants/images';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Ambassadors = ({ handleActive, active, uid }) => {
    const [customNiches, setCustomNiches] = useState([]);
    const [customAudienceTypes, setCustomAudienceTypes] = useState([]);
    const [customSocials, setCustomSocials] = useState([]);
    const [customLanguages, setCustomLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
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
    const [customExplanations, setCustomExplanations] = useState({
        niches: {},
        audience: {}
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isExistingAmbassador, setIsExistingAmbassador] = useState(false);
    const [socialAudiences, setSocialAudiences] = useState({
        twitter: '',
        youtube: '',
        discord: '',
        instagram: '',
        twitch: ''
    });

    const headerToggleButton = [
        {
            label: 'PERSONAL INFORMATION',
            key: 'INFORMATION',
            onClick: () => handleActive("INFORMATION")
        },
        {
            label: ' PROJECT INVOLVEMENT',
            key: 'INVOLVEMENT',
            onClick: () => handleActive("INVOLVEMENT")
        },
        {
            label: 'AMBASSADORS',
            key: 'AMBASSADORS',
            onClick: () => handleActive("AMBASSADORS")
        },
    ]

    const defaultLanguages = [
        "English",
        "French",
        "Spanish",
        "German",
        "Chinese",
        "Japanese",
        "Korean",
        "Russian",
        "Arabic",
        "Portuguese"
    ];

    useEffect(() => {
        if (uid) {
            checkAmbassadorExists();
        }
    }, [uid]);

    useEffect(() => {
        const fetchAmbassadorData = async () => {
            try {
                const response = await axios.get(`https://winwinsocietyweb3.com/api/ambassadors/uid/${uid}`);
                if (response.data) {
                    setIsExistingAmbassador(true);
                    const data = response.data;
                    
                    // Set niches
                    if (data.niches) {
                        const defaultNichesList = defaultNiches.filter(niche => data.niches[niche] === true);
                        const customNichesList = Object.entries(data.niches)
                            .filter(([key, value]) => !defaultNiches.includes(key) && key !== '_uid')
                            .map(([key]) => key);
                        
                        setCustomNiches(customNichesList);
                        setSelectedNiches([...defaultNichesList, ...customNichesList]);
                        setCustomExplanations(prev => ({
                            ...prev,
                            niches: Object.fromEntries(
                                Object.entries(data.niches)
                                    .filter(([key, value]) => typeof value === 'string' && value.length > 0)
                            )
                        }));
                    }

                    // Set audience types
                    if (data.audience_type) {
                        const defaultAudienceList = defaultAudienceTypes.filter(type => data.audience_type[type] === true);
                        const customAudienceList = Object.entries(data.audience_type)
                            .filter(([key, value]) => !defaultAudienceTypes.includes(key) && key !== '_uid')
                            .map(([key]) => key);
                        
                        setCustomAudienceTypes(customAudienceList);
                        setSelectedAudiences([...defaultAudienceList, ...customAudienceList]);
                        setCustomExplanations(prev => ({
                            ...prev,
                            audience: Object.fromEntries(
                                Object.entries(data.audience_type)
                                    .filter(([key, value]) => typeof value === 'string' && value.length > 0)
                            )
                        }));
                    }

                    // Set social handles and audiences
                    if (data.main_socials) {
                        const defaultSocialIds = defaultSocials.map(s => s.id);
                        const customSocialsList = Object.keys(data.main_socials)
                            .filter(key => !defaultSocialIds.includes(key));
                        
                        setCustomSocials(customSocialsList);
                        
                        // Separate handles and audience counts
                        const handles = {};
                        const audiences = {};
                        Object.entries(data.main_socials).forEach(([key, value]) => {
                            if (typeof value === 'object') {
                                handles[key] = value.handle || '';
                                audiences[key] = value.audience_count || '';
                            } else {
                                handles[key] = value;
                                audiences[key] = '';
                            }
                        });
                        
                        setSocialHandles(handles);
                        setSocialAudiences(audiences);
                        setSelectedSocials(Object.keys(data.main_socials));
                    }

                    // Set languages
                    if (data.languages) {
                        const defaultLanguagesList = defaultLanguages.filter(lang => data.languages[lang] === true);
                        const customLanguagesList = Object.entries(data.languages)
                            .filter(([key, value]) => !defaultLanguages.includes(key) && key !== '_uid')
                            .map(([key]) => key);
                        
                        setCustomLanguages(customLanguagesList);
                        setSelectedLanguages([...defaultLanguagesList, ...customLanguagesList]);
                    }
                }
            } catch (error) {
                setIsExistingAmbassador(false);
                console.error('Error checking ambassador data:', error);
            }
        };
        fetchAmbassadorData();
    }, [uid]);

    const checkAmbassadorExists = async () => {
        try {
            const response = await axios.get(`https://winwinsocietyweb3.com/api/ambassadors/uid/${uid}`);
            if (response.data) {
                setIsExistingAmbassador(true);
                const data = response.data;
                
                // Set niches
                if (data.niches) {
                    const defaultNichesList = defaultNiches.filter(niche => data.niches[niche] === true);
                    const customNichesList = Object.entries(data.niches)
                        .filter(([key, value]) => !defaultNiches.includes(key) && key !== '_uid')
                        .map(([key]) => key);
                    
                    setCustomNiches(customNichesList);
                    setSelectedNiches([...defaultNichesList, ...customNichesList]);
                    setCustomExplanations(prev => ({
                        ...prev,
                        niches: Object.fromEntries(
                            Object.entries(data.niches)
                                .filter(([key, value]) => typeof value === 'string' && value.length > 0)
                        )
                    }));
                }

                // Set audience types
                if (data.audience_type) {
                    const defaultAudienceList = defaultAudienceTypes.filter(type => data.audience_type[type] === true);
                    const customAudienceList = Object.entries(data.audience_type)
                        .filter(([key, value]) => !defaultAudienceTypes.includes(key) && key !== '_uid')
                        .map(([key]) => key);
                    
                    setCustomAudienceTypes(customAudienceList);
                    setSelectedAudiences([...defaultAudienceList, ...customAudienceList]);
                    setCustomExplanations(prev => ({
                        ...prev,
                        audience: Object.fromEntries(
                            Object.entries(data.audience_type)
                                .filter(([key, value]) => typeof value === 'string' && value.length > 0)
                        )
                    }));
                }

                // Set social handles and audiences
                if (data.main_socials) {
                    const defaultSocialIds = defaultSocials.map(s => s.id);
                    const customSocialsList = Object.keys(data.main_socials)
                        .filter(key => !defaultSocialIds.includes(key));
                    
                    setCustomSocials(customSocialsList);
                    
                    // Separate handles and audience counts
                    const handles = {};
                    const audiences = {};
                    Object.entries(data.main_socials).forEach(([key, value]) => {
                        if (typeof value === 'object') {
                            handles[key] = value.handle || '';
                            audiences[key] = value.audience_count || '';
                        } else {
                            handles[key] = value;
                            audiences[key] = '';
                        }
                    });
                    
                    setSocialHandles(handles);
                    setSocialAudiences(audiences);
                    setSelectedSocials(Object.keys(data.main_socials));
                }
            }
        } catch (error) {
            setIsExistingAmbassador(false);
            console.error('Error checking ambassador data:', error);
        }
    };

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);

        const payload = {
            niches: {},
            audience_type: {},
            main_socials: {},
            languages: {}
        };

        // Add _uid only for POST request
        if (!isExistingAmbassador) {
            payload._uid = uid;
        }

        // Prepare niches data
        defaultNiches.forEach(niche => {
            if (selectedNiches.includes(niche)) {
                payload.niches[niche] = true;
            }
        });
        // Add custom niches with explanations
        customNiches.forEach(niche => {
            if (selectedNiches.includes(niche)) {
                payload.niches[niche] = customExplanations.niches[niche] || '';
            }
        });

        // Prepare audience types data
        defaultAudienceTypes.forEach(type => {
            if (selectedAudiences.includes(type)) {
                payload.audience_type[type] = true;
            }
        });
        // Add custom audience types with explanations
        customAudienceTypes.forEach(type => {
            if (selectedAudiences.includes(type)) {
                payload.audience_type[type] = customExplanations.audience[type] || '';
            }
        });

        // Prepare socials data - include all social handles and audience counts that have values
        [...defaultSocials.map(social => social.id), ...customSocials].forEach(socialId => {
            const value = socialHandles[socialId];
            const audienceCount = socialAudiences[socialId];
            if (value && value.trim()) {
                payload.main_socials[socialId] = {
                    handle: value.trim(),
                    audience_count: audienceCount || ''
                };
            }
        });

        // Prepare languages data
        defaultLanguages.forEach(lang => {
            if (selectedLanguages.includes(lang)) {
                payload.languages[lang] = true;
            }
        });
        // Add custom languages
        customLanguages.forEach(lang => {
            if (selectedLanguages.includes(lang)) {
                payload.languages[lang] = true;
            }
        });

        console.log('Saving payload:', payload); // Debug log

        try {
            const url = `https://winwinsocietyweb3.com/api/ambassadors${isExistingAmbassador ? `/${uid}` : ''}`;
            const method = isExistingAmbassador ? 'put' : 'post';
            
            await axios[method](url, payload);
            toast.success('Thank you! Your ambassador information has been successfully received. We will review your application and get back to you soon.', {
                duration: 5000,
                position: 'top-center',
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #f5efdb',
                },
                iconTheme: {
                    primary: '#f5efdb',
                    secondary: '#1a1a1a',
                },
            });
        } catch (error) {
            console.error('Error saving ambassador data:', error);
            toast.error('Failed to save ambassador data. Please try again.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #ff4d4f',
                },
            });
        } finally {
            setIsSaving(false);
        }
    };

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
        { id: 'twitter', name: 'Twitter', placeholder: '@username', audiencePlaceholder: 'Number of followers' },
        { id: 'youtube', name: 'YouTube', placeholder: 'Channel URL', audiencePlaceholder: 'Number of subscribers' },
        { id: 'discord', name: 'Discord', placeholder: 'Server invite or username#0000', audiencePlaceholder: 'Number of members' },
        { id: 'instagram', name: 'Instagram', placeholder: '@username', audiencePlaceholder: 'Number of followers' },
        { id: 'twitch', name: 'Twitch', placeholder: 'Channel name', audiencePlaceholder: 'Number of followers' }
    ];

    const handleSocialChange = (socialId, value) => {
        setSocialHandles(prev => ({
            ...prev,
            [socialId]: value
        }));
    };

    const handleSocialAudienceChange = (socialId, value) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        setSocialAudiences(prev => ({
            ...prev,
            [socialId]: numericValue
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
                setSelectedSocials([...selectedSocials, newCustomField]);
                setSocialHandles(prev => ({
                    ...prev,
                    [newCustomField]: ''  // Initialize the handle for the new social platform
                }));
                break;
            case 'languages':
                setCustomLanguages([...customLanguages, newCustomField]);
                setSelectedLanguages([...selectedLanguages, newCustomField]);
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

    const handleDeleteCustom = (section, value) => {
        switch(section) {
            case 'niches':
                setCustomNiches(customNiches.filter(niche => niche !== value));
                setSelectedNiches(selectedNiches.filter(niche => niche !== value));
                setCustomExplanations(prev => {
                    const { [value]: removed, ...rest } = prev.niches;
                    return { ...prev, niches: rest };
                });
                break;
            case 'audience':
                setCustomAudienceTypes(customAudienceTypes.filter(type => type !== value));
                setSelectedAudiences(selectedAudiences.filter(type => type !== value));
                setCustomExplanations(prev => {
                    const { [value]: removed, ...rest } = prev.audience;
                    return { ...prev, audience: rest };
                });
                break;
            case 'socials':
                setCustomSocials(customSocials.filter(social => social !== value));
                setSelectedSocials(selectedSocials.filter(social => social !== value));
                break;
            case 'languages':
                setCustomLanguages(prev => prev.filter(lang => lang !== value));
                setSelectedLanguages(prev => prev.filter(lang => lang !== value));
                break;
        }
    };

    return (
        <div className='ambassadors_content_wrapper'>
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
                        <div className="header_toggle_button">
                            {headerToggleButton.map((data) => {
                                return (
                                    <div
                                        key={data.key}
                                        className={`buttons ${active === data.key ? "active" : ""}`}
                                        onClick={data.onClick}
                                    >
                                        {data.label}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="header_toggle_dropDown">
                            <CustomDropdown
                                toggleButton={
                                    <ThreeDots />
                                }
                                items={headerToggleButton}
                            />
                        </div>
                    </div>

                    <div className="ambassadors_content_box">
                        <div className="ambassador_sections">
                            {/* Languages Section */}
                            <div className="section">
                                <h3>Content Languages</h3>
                                <div className="options_container">
                                    <div className="default_options">
                                        {defaultLanguages.map((language, index) => (
                                            <div 
                                                key={index} 
                                                className={`option default ${selectedLanguages.includes(language) ? 'selected' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newSelected = selectedLanguages.includes(language)
                                                        ? selectedLanguages.filter(l => l !== language)
                                                        : [...selectedLanguages, language];
                                                    setSelectedLanguages(newSelected);
                                                }}
                                            >
                                                <label>{language}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="custom_options">
                                        {customLanguages.map((language, index) => (
                                            <div 
                                                key={`custom-${index}`} 
                                                className={`option custom ${selectedLanguages.includes(language) ? 'selected' : ''}`}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newSelected = selectedLanguages.includes(language)
                                                            ? selectedLanguages.filter(l => l !== language)
                                                            : [...selectedLanguages, language];
                                                        setSelectedLanguages(newSelected);
                                                    }}
                                                >
                                                    <label>{language}</label>
                                                </div>
                                                <span 
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteCustom('languages', language);
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
                                        placeholder="Add custom language"
                                        value={activeSection === 'languages' ? newCustomField : ''}
                                        onChange={(e) => {
                                            setActiveSection('languages');
                                            setNewCustomField(e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && newCustomField.trim()) {
                                                e.preventDefault();
                                                handleAddCustomField('languages');
                                            }
                                        }}
                                    />
                                    <button onClick={() => handleAddCustomField('languages')}>Add</button>
                                </div>
                            </div>

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
                                                title={customExplanations.niches[niche] || ''}
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
                                                {customExplanations.niches[niche] && (
                                                    <div className="tooltip">{customExplanations.niches[niche]}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="add_custom_field">
                                    <div className="input_group">
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
                                        <textarea
                                            placeholder="Explain briefly your custom niche (optional)"
                                            value={customExplanations.niches[newCustomField] || ''}
                                            onChange={(e) => setCustomExplanations(prev => ({
                                                ...prev,
                                                niches: {
                                                    ...prev.niches,
                                                    [newCustomField]: e.target.value
                                                }
                                            }))}
                                            className="explanation_field"
                                        />
                                    </div>
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
                                                title={customExplanations.audience[type] || ''}
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
                                                {customExplanations.audience[type] && (
                                                    <div className="tooltip">{customExplanations.audience[type]}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="add_custom_field">
                                    <div className="input_group">
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
                                        <textarea
                                            placeholder="Explain briefly your custom audience type (optional)"
                                            value={customExplanations.audience[newCustomField] || ''}
                                            onChange={(e) => setCustomExplanations(prev => ({
                                                ...prev,
                                                audience: {
                                                    ...prev.audience,
                                                    [newCustomField]: e.target.value
                                                }
                                            }))}
                                            className="explanation_field"
                                        />
                                    </div>
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
                                            <div className="social_inputs">
                                                <input
                                                    type="text"
                                                    placeholder={social.placeholder}
                                                    value={socialHandles[social.id] || ''}
                                                    onChange={(e) => handleSocialChange(social.id, e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={social.audiencePlaceholder}
                                                    value={socialAudiences[social.id] || ''}
                                                    onChange={(e) => handleSocialAudienceChange(social.id, e.target.value)}
                                                    className="audience_input"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {customSocials.map((socialId) => (
                                        <div 
                                            key={socialId} 
                                            className={`social_input_group custom ${selectedSocials.includes(socialId) ? 'selected' : ''}`}
                                        >
                                            <div 
                                                className="social_label"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newSelected = selectedSocials.includes(socialId)
                                                        ? selectedSocials.filter(s => s !== socialId)
                                                        : [...selectedSocials, socialId];
                                                    setSelectedSocials(newSelected);
                                                }}
                                            >
                                                <label>{socialId}</label>
                                                <span 
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteCustom('socials', socialId);
                                                    }}
                                                >
                                                    ×
                                                </span>
                                            </div>
                                            <div className="social_inputs">
                                                <input
                                                    type="text"
                                                    placeholder="Social media handle/URL"
                                                    value={socialHandles[socialId] || ''}
                                                    onChange={(e) => handleSocialChange(socialId, e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Number of followers/subscribers"
                                                    value={socialAudiences[socialId] || ''}
                                                    onChange={(e) => handleSocialAudienceChange(socialId, e.target.value)}
                                                    className="audience_input"
                                                />
                                            </div>
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

                            {/* Save Button */}
                            <div className="save_section">
                                <button 
                                    className="save_button" 
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Ambassadors.propTypes = {
    handleActive: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired,
};

export default Ambassadors