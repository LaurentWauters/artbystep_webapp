import { render } from '@testing-library/react';
import React, {useState} from 'react';

export default function GalleryTimeTable(props) {

    function calculateIfOpen(startTime, finishTime) {
        
    }

    const galleriesMap = props.route.galleries.map((x) => {
        const name = x.name ? 
        'name: ' + x.name : 
        'No Route';
        const startTime = x.startTime ?
        'open from: ' + x.startTime :
        'no hours available';
        const endTime = x.finishTime ?
        'closed from: ' + x.finishTime :
        'no hours available';
        const open = calculateIfOpen()

        return(
            <div>
                <p>{name}</p>
                <p>{startTime}</p>
                <p>{endTime}</p>
            </div>
        )
    })


    return (
        <div>
            <h1>Galleries</h1>
            {galleriesMap}
        </div>
    );
}