export const validateProject = (values) => {
  const errors = {};
  
  // Project Name Validation
  if (!values.name) {
    errors.name = 'Project name is required';
  } else if (values.name.length < 3) {
    errors.name = 'Project name must be at least 3 characters';
  } else if (values.name.length > 50) {
    errors.name = 'Project name cannot exceed 50 characters';
  } else if (!/^[a-zA-Z0-9\s-]*$/.test(values.name)) {
    errors.name = 'Project name can only contain letters, numbers, spaces and hyphens';
  }

  // Project Description Validation
  if (!values.description) {
    errors.description = 'Project description is required';
  } else if (values.description.length < 10) {
    errors.description = 'Project description must be at least 10 characters';
  } else if (values.description.length > 1000) {
    errors.description = 'Project description cannot exceed 1000 characters';
  }

  // Project Image Validation
  if (!values.image) {
    errors.image = 'Project image is required';
  } else if (values.image instanceof File) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxWidth = 600;
    const maxHeight = 400;

    if (!allowedTypes.includes(values.image.type)) {
      errors.image = 'Only JPG, JPEG, PNG and SVG files are allowed';
    } else if (values.image.size > maxSize) {
      errors.image = 'Image size cannot exceed 5MB';
    } else {
      // Check image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(values.image);
      
      return new Promise((resolve) => {
        img.onload = () => {
          URL.revokeObjectURL(img.src);
          if (img.width > maxWidth || img.height > maxHeight) {
            errors.image = `Image dimensions cannot exceed ${maxWidth}x${maxHeight} pixels`;
          }
          resolve(errors);
        };
      });
    }
  }

  // Project Website Validation (Optional)
  if (values.website) {
    try {
      new URL(values.website);
      if (!values.website.startsWith('http://') && !values.website.startsWith('https://')) {
        errors.website = 'Website URL must start with http:// or https://';
      }
    } catch {
      errors.website = 'Please enter a valid website URL';
    }
  }

  return errors;
}; 