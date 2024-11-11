import { useState } from 'react';
import "./tagsInput.scss"
import PropTypes from 'prop-types';

function TagInput({ tags, setTags }) {
    const [input, setInput] = useState(''); // State to hold current input

    // Handle key press event for 'Enter' and 'Backspace' keys
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault(); // Prevent form submission if inside a form
            setTags([...tags, input.trim()]); // Add the new tag to the tags list
            setInput(''); // Reset the input field
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            e.preventDefault();
            setTags(tags?.slice(0, -1)); // Remove the last tag if input is empty
        }
    };


    return (
        <div>
            <div className='tags_list'>
                {Array.isArray(tags) && tags.map((tag, index) => (
                    <span key={index} className='tag'>
                        {tag}
                    </span>
                ))}
            </div>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress} // Detect 'Enter' key press
                placeholder="Type and press enter"
                name='tags'
            />
        </div>
    );
}

TagInput.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired, // Enforce array of strings
    setTags: PropTypes.func.isRequired                    // Enforce function
};

export default TagInput;
