import {useState, useRef} from "react";
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


function PhotoIcon({id, filename, url, caption, date, onRemove, onSwap}){
    const handleStop = (e, data) => {
        const distance = Math.sqrt(data.lastX ** 2 + data.lastY ** 2);
        onSwap(id, nodeRef.current, distance);
    }

    const nodeRef = useRef(null);
    const visibleCaption = caption.length > 10 ? caption.slice(0, 10)+"..." : caption;
    return (
        <Draggable
        nodeRef={nodeRef}
        defaultPosition={{x: 0, y: 0}}
        position={{x: 0, y: 0}} // snap back to main position
        onStop={handleStop}>
            <div 
            id={`photo-${id}`}
            ref={nodeRef}
            className='photo-container' 
            key={url}>
                <button className='photo-remove-button'onClick={onRemove} onMouseDown={e => e.stopPropagation()}>
                    <FontAwesomeIcon icon="fa-solid fa-x" color='red'/>
                </button>
                <img src={url} alt={filename} width={100} height={100}/>
                <label className='photo-caption' title={caption}>{visibleCaption}</label>
                <p className='photo-date'>{date}</p>
            </div>
        </Draggable>
    )
}

function PhotoQueue({photos, setPhotos}){
    const removePhoto = (id) => {
        setPhotos(prev => prev.filter(photo => photo.id !== id));
    };
    const swapPhoto = (id1, id2) => {
        setPhotos(prev => {
            const newPhotos = [...prev];
            const index1 = newPhotos.findIndex(photo => photo.id === id1);
            const index2 = newPhotos.findIndex(photo => photo.id === id2);
            if (index1 !== -1 && index2 !== -1) {
                [newPhotos[index1], newPhotos[index2]] = [newPhotos[index2], newPhotos[index1]];
            }
            return newPhotos;
        });
    };
    const swapBasedOnDistance = (draggedID, draggedElement, draggedDistance) => {
        const draggedRect = draggedElement.getBoundingClientRect();
        const draggedCenterX = draggedRect.left + draggedRect.width / 2;
        const draggedCenterY = draggedRect.top + draggedRect. height / 2;

        let minDistance = draggedDistance;
        let closestPhotoID = draggedID;
        photos.forEach((photo) => {
            if(photo.id === draggedID) return;
            const photoElement = document.getElementById(`photo-${photo.id}`);
            if (photoElement) {
                const rect = photoElement.getBoundingClientRect();
                const centerx = rect.left + rect.width / 2;
                const centery = rect.top + rect.height / 2;
                const distance = Math.sqrt((draggedCenterX - centerx) ** 2 + (draggedCenterY - centery) ** 2);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestPhotoID = photo.id;
                }
            }
        })
        swapPhoto(draggedID, closestPhotoID);
    }

    let items = []
    photos.forEach(function(photo){
        items.push(
        <PhotoIcon 
        key={photo.id} 
        {...photo} 
        onRemove={() => removePhoto(photo.id)}
        onSwap={swapBasedOnDistance}
        />
    )
    })

    return (
        <div id="queue-container">
            {items}
        </div>
    )
}

export default PhotoQueue;