import './EditorPage.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


class PhotoObject{
    constructor(id, filename, caption, url, date){
        this.id = id;
        this.filename = filename;
        this.caption = caption;
        this.url = url;
        this.date = date;
    }

}

function isValidDateFormat(date){
    if (!/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(date)) {
        return false;
    }
    const [day, month, year] = date.split('.').map(Number);
    const parsed = new Date(year, month - 1, day);
    return (
        parsed.getFullYear() === year &&
        parsed.getMonth() === month - 1 &&
        parsed.getDate() === day
    );
}

function ImageDropZone({ formData, setFormData}){
    const setImgURL = (value) => setFormData(prev => ({ ...prev, imgURL: value }));
    const setImgName = (value) => setFormData(prev => ({ ...prev, imgName: value }));

    const handleDrop = (ev) => {
        ev.preventDefault();
        const file = [...ev.dataTransfer.files].find((file) => file.type.startsWith("image/"));
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImgURL(url);
        setImgName(file.name);
    };

    // only selects the first file yet
    const handleFileSelect = (ev) => {
        const file = ev.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImgURL(url);
        setImgName(file.name);
        ev.target.value = '';
    };
    
    const dragoverHandler = (e) => {
        const fileItems = [...e.dataTransfer.items].filter(
            (item) => item.kind === "file",
        );
        if (fileItems.length > 0) {
            e.preventDefault();
            if (fileItems.some((item) => item.type.startsWith("image/"))) {
                e.dataTransfer.dropEffect = "copy";
            } else {
                e.dataTransfer.dropEffect = "none";
            }
        }
    }
    return(
        <>
        <h3>Add Images</h3>
        <label id='drop-zone' onDrop={handleDrop} onDragOver={dragoverHandler}>
            <input type='file' id='file-input' multiple accept="image/*" onChange={handleFileSelect}/>
            {!formData.imgURL && <p>Drag & Drop your Image</p>}
            {formData.imgURL && <img src={formData.imgURL} alt={formData.imgName} className='drop-preview' width={100} height={100} />}
        </label>
        </>
    )
}


function CaptionForm({formData, setFormData}){
    const setCaption = (value) => setFormData(prev => ({ ...prev, caption: value }));
    const setDate = (value) => setFormData(prev => ({ ...prev, date: value }));
    return (
        <form>
            <label>Date</label>
            <input type="text" id='date' placeholder='dd.mm.yyyy' value={formData.date}
                    onChange={(e) => setDate(e.target.value)}/>
            <div className='caption-container'>
                <label>Caption</label>
                <input  type="text" id='caption' 
                        placeholder='Enter your caption' value={formData.caption}
                        onChange={(e) => setCaption(e.target.value)}/>
            </div>
        </form>
    )
}
const INITIAL_FORM_STATE = {
    imgName: '',
    imgURL: '',
    caption: '',
    date: '',
    error: ''
};

function PhotoEntryPanel(
    {   photos, 
        setPhotos}){
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const setCaption = (value) => setFormData(prev => ({ ...prev, caption: value}));
    const setError = (value) => setFormData(prev => ({ ...prev, error: value}));
    
    
    const createPhotoObject = (e) => {
        e.preventDefault();
        if (!formData.imgURL) {
            setError('Please add an image.');
            return;
        }
        if (!formData.caption || formData.caption.length > 50) {
            setError('Caption must be 1-50 characters.');
            return;
        }
        if (!isValidDateFormat(formData.date)) {
            setError('Date must be in dd.mm.yyyy format or is not valid otherwise.');
            return;
        }
        setPhotos((e) => [...e, new PhotoObject(Date.now(), formData.imgName, formData.caption, formData.imgURL, formData.date)]);
        setFormData(INITIAL_FORM_STATE);
    }

    return(
        <div id='photo-entry-container'>
            <h2>Photo Album Creator</h2>
            <ImageDropZone formData={formData} setFormData={setFormData}/>
            <CaptionForm formData={formData} setFormData={setFormData}/>
            {formData.error && <p className='form-error'>{formData.error}</p>}
            <button onClick={createPhotoObject}>Add Photo</button>
        </div>
    )
}

function NavBar(){
    return (
        <nav className='nav-container'>
            <table>
                <tbody>
                    <tr>
                        <th><button className='nav-item'>Add Images</button></th>
                        <th><button className='nav-item'>Layout</button></th>
                        <th><button className='nav-item'>Design</button></th>
                        <th><button className='nav-item'>Preview</button></th>
                    </tr>
                </tbody>
            </table>
        </nav>
    )
}

function PhotoIcon({id, filename, url, caption, date, onRemove}){
    const visibleCaption = caption.length > 10 ? caption.slice(0, 10)+"..." : caption;
    return (
        <div className='photo-container' key={url}>
            <button className='photo-remove-button'>
                <FontAwesomeIcon icon="fa-solid fa-x" color='red' onClick={onRemove}/>
            </button>
            <img src={url} alt={filename} width={100} height={100}/>
            <label className='photo-caption' title={caption}>{visibleCaption}</label>
            <p className='photo-date'>{date}</p>
        </div>
    )
}

function PhotoQueue({photos, onRemovePhoto}){
    let items = []
    photos.forEach(function(photo){
        items.push(
        <PhotoIcon 
        key={photo.id} 
        {...photo} 
        onRemove={() => onRemovePhoto(photo.id)}
        />
    )
    })

    return (
        <div id="queue-container">
            {items}
        </div>
    )
}


function EditorPage(){
    const [photos, setPhotos] = useState([]);
    const removePhoto = (id) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    };
    return (
        <div className='container'>
            <NavBar/>
            <PhotoEntryPanel photos={photos} setPhotos={setPhotos}/>
            <PhotoQueue photos={photos} onRemovePhoto={removePhoto}/>
        </div>
    )
}


export default EditorPage;