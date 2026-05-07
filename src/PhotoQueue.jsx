import {useState, useRef} from "react";
import ReactDOM from 'react-dom';
import {useSortable} from '@dnd-kit/react/sortable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


function PhotoIcon({id, filename, url, caption, date, index, onRemove}){
    const {ref} = useSortable({id, index});

    const visibleCaption = caption.length > 10 ? caption.slice(0, 10)+"..." : caption;
    return (
        <li 
        ref={ref}
        className='photo-container' 
        key={url}>
            <button className='photo-remove-button'onClick={onRemove} onMouseDown={e => e.stopPropagation()}>
                <FontAwesomeIcon icon="fa-solid fa-x" color='red'/>
            </button>
            <img src={url} alt={filename} width={100} height={100}/>
            <label className='photo-caption' title={caption}>{visibleCaption}</label>
            <p className='photo-date'>{date}</p>
        </li>
    )
}

function PhotoQueue({photos, setPhotos}){
    const removePhoto = (id) => {
        setPhotos(prev => prev.filter(photo => photo.id !== id));
    };

    return (
        <div id="queue-container">
            {photos.map((photo, index) => 
            <PhotoIcon  key={photo.id} 
                        {...photo} 
                        index={index}
                        onRemove={() => removePhoto(photo.id)}/>
            )}
        </div>
    )
}

export default PhotoQueue;