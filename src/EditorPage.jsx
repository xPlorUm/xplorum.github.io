import './EditorPage.css';
import { useState } from "react";
import { DragDropProvider, useDroppable } from '@dnd-kit/react';

import PhotoQueue from './PhotoQueue';
import NavBar from './NavBar';
import PhotoObject from './App.jsx';


const INITIAL_FORM_STATE = {
    imgName: '',
    imgURL: '',
    caption: '',
    date: '',
    error: ''
};

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
    const { isDropTarget, ref } = useDroppable({ id: 'image-drop-zone' });

    const handleDrop = (ev) => {
        ev.preventDefault();
        const file = [...ev.dataTransfer.files].find((file) => file.type.startsWith("image/"));
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImgURL(url);
        setImgName(file.name);
    };

    const handleFileSelect = (ev) => {
        const file = ev.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImgURL(url);
        setImgName(file.name);
        ev.target.value = '';
    };

    const dragoverHandler = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    const dropZoneStyle = {
        border: '2px dashed #aaa',
        borderRadius: 12,
        padding: 24,
        textAlign: 'center',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
        backgroundColor: isDropTarget ? '#eef6ff' : 'transparent',
        borderColor: isDropTarget ? '#4d8cff' : '#aaa',
        cursor: 'pointer',
    };

    return(
        <DragDropProvider>
            <div ref={ref} id='drop-zone' style={dropZoneStyle} onDrop={handleDrop} onDragOver={dragoverHandler}>
                <input
                    type='file'
                    id='file-input'
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
                <label htmlFor='file-input' style={{ cursor: 'pointer' }}>
                    {!formData.imgURL && <p>{isDropTarget ? 'Drop here to upload your image' : 'Drag & drop an image here, or click to browse.'}</p>}
                    {formData.imgURL && <img src={formData.imgURL} alt={formData.imgName} className='drop-preview' width={100} height={100} />}
                </label>
            </div>
        </DragDropProvider>
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


function EditorPage({setPage, photos, setPhotos}){
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    return (
        <div className='container'>
            <NavBar setPage={setPage}/>
            <PhotoEntryPanel photos={photos} setPhotos={setPhotos}/>
            <PhotoQueue photos={photos} setPhotos={setPhotos}/>
        </div>
    )
}


export default EditorPage;