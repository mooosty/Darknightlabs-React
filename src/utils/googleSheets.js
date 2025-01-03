const API_URL = 'https://winwinsocietyweb3.com/api/submit-form';

export async function appendToSheet(formData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Failed to submit form');
        }

        return data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
} 