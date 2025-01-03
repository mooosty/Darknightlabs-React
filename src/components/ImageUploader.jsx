const handleImageChange = async (file) => {
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            
            // Check dimensions
            if (img.width > 600 || img.height > 400) {
                toast.error('Image dimensions cannot exceed 600x400 pixels');
                return;
            }
            
            // Check file size
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size cannot exceed 5MB');
                return;
            }
            
            // If validation passes, set the image
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setFieldValue('image', {
                    file: file,
                    base64Url: reader.result
                });
            };
        };
    }
}; 