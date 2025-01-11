import "./tagsInput.scss"
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultTags = [
  { label: 'Gaming', value: 'gaming' },
  { label: 'AI', value: 'ai' },
  { label: 'RWA', value: 'rwa' },
  { label: 'DePin', value: 'depin' },
  { label: 'DeFi', value: 'defi' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'L1/L2/L3', value: 'l1l2l3' },
  { label: 'Data', value: 'data' },
  { label: 'IP', value: 'ip' },
  { label: 'Web2 Brand entering Web3', value: 'web2-brand-entering-web3' },
  { label: 'Exchange', value: 'exchange' },
  { label: 'Market Maker', value: 'market-maker' }
];

function TagInput({ tags, setTags }) {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState(defaultTags);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault();
            addTag(input.trim());
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            e.preventDefault();
            setTags(tags?.slice(0, -1));
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        
        if (value.trim()) {
            const filtered = defaultTags.filter(tag => 
                tag.label.toLowerCase().includes(value.toLowerCase()) &&
                !tags.includes(tag.label)
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions(defaultTags.filter(tag => !tags.includes(tag.label)));
            setShowSuggestions(false);
        }
    };

    const addTag = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setInput('');
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        addTag(suggestion.label);
    };

    const handleInputFocus = () => {
        const remainingSuggestions = defaultTags.filter(tag => !tags.includes(tag.label));
        setFilteredSuggestions(remainingSuggestions);
        setShowSuggestions(true);
    };

    return (
        <div className='tag_input_container' ref={wrapperRef}>
            <div className='tags_list'>
                {Array.isArray(tags) && tags.map((tag, index) => (
                    <span key={index} className='tag'>
                        {tag}
                    </span>
                ))}

                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    onFocus={handleInputFocus}
                    placeholder="Type and press Enteror select a tag"
                    name='tags'
                />
            </div>

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="tag_suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="tag_suggestion"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

TagInput.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTags: PropTypes.func.isRequired
};

export default TagInput;
