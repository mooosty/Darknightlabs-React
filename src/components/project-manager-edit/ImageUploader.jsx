import PropTypes from 'prop-types'
import { DeleteIcon, uploadIcon } from '../../utils/constants/images';

const ImageUploader = ({ image, setFieldValue }) => {

    const handleUploadImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const img = new Image();
            img.onload = function () {
                let base64Url = reader.result;
                setFieldValue('image', {
                    file: file,
                    base64Url: base64Url,
                })
            }
            img.src = reader.result;
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    }


    return (
        <div className="project_profile">
            {image?.base64Url && <>
                <div className="project_image">
                    <img src={image.base64Url} alt="Project" />
                </div>
                <div className="project_profile_btn">
                    <button className="btn-gray" onClick={() => {
                        let input = document.createElement('input');
                        input.type = 'file';
                        input.multiple = false
                        input.accept = '.jpg, .png, .svg, .jpeg';
                        input.onchange = () => {
                            let files = Array.from(input.files);
                            handleUploadImage(files[0]);
                        }
                        input.click()
                    }}>
                        <img src={uploadIcon} alt="" /> Replace photo</button>
                    <button className="btn-red" onClick={() => {
                        setFieldValue('image', null);
                    }}>
                        <DeleteIcon /> Delete</button>
                </div>
            </>}
            {!image?.base64Url && <>
                <div className="upload_profile">
                    <img src={uploadIcon} alt="" />
                    <input type="file" multiple={false} accept=".png, .jpeg, .svg, .jpg" onChange={(e) => {
                        handleUploadImage(e.target.files[0]);
                    }} />
                    <p className="upload_document_title">Click to upload</p>
                    <span className="drag_file">or drag and drop</span>
                    <div className="file_type">SVG, PNG, JPG (max. 800x400px)</div>
                </div>
            </>}
        </div>
    )
}

ImageUploader.propTypes = {
    image: PropTypes.object,
    setFieldValue: PropTypes.func,
    handleUploadImage: PropTypes.func
}

export default ImageUploader