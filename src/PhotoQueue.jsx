import {useState, useRef} from "react";
import ReactDOM from 'react-dom';
import {DragDropProvider} from '@dnd-kit/react';
import {useSortable, isSortable} from '@dnd-kit/react/sortable';
import {move} from '@dnd-kit/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


function PhotoIcon({id, filename, url, caption, date, index, onRemove}){
    const sortable = useSortable({id, index});

    const visibleCaption = caption.length > 10 ? caption.slice(0, 10) + "..." : caption;
    return (
        <li 
        ref={sortable.ref}
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
    const handleDragEnd = (event, manager) => {
        const {operation, canceled} = event;
        const {source} = operation;
        if (canceled){
            return;
        }

        if(isSortable(source)){
            const {initialIndex, index} = source;
            console.log(index, initialIndex);
            if(index !== initialIndex){
                setPhotos((items) => {
                    const newItems = [...items];
                    const [removed] = newItems.splice(initialIndex, 1); // remove 1 at initial index, no replace
                    newItems.splice(index, 0, removed); // reinsert at new index the removed one
                    return newItems;
                })
            }
        }
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div id="queue-container">
                {photos.map((photo, index) => 
                <PhotoIcon  key={photo.id} 
                            {...photo} 
                            index={index}
                            onRemove={() => removePhoto(photo.id)}/>
                )}
            </div>
        </DragDropProvider>
    )
}

export default PhotoQueue;