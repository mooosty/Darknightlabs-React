import "./tagsInput.scss"
import { useState } from 'react';
import PropTypes from 'prop-types';

function TagInput({ tags, setTags }) {
    const [input, setInput] = useState('');


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault();
            setTags([...tags, input.trim()]);
            setInput('');
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            e.preventDefault();
            setTags(tags?.slice(0, -1));
        }
    };


    return (
        <div className='tag_input_container'>
            <div className='tags_list'>
                {Array.isArray(tags) && tags.map((tag, index) => (
                    <span key={index} className='tag'>
                        {tag}
                    </span>
                ))}

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type and press enter"
                    name='tags'
                />
            </div>


        </div>
    );
}

TagInput.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTags: PropTypes.func.isRequired
};

export default TagInput;
