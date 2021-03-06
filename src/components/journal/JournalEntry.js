import React from 'react'
import { FaCalendar } from "react-icons/fa";
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {

    // console.log(id, date, title, body, url);
    const dispatch = useDispatch();
    
    const handleActiveNote = () => {
        dispatch(activeNote(id, {
            date,
            title,
            body,
            url
        }));
    }

    const noteDate = moment();
    return (
        <div className='journal__entry form-inline animate__animated animate__fadeIn' onClick={ handleActiveNote }>
            {
                url &&
                <div className='journal__entry-picture'
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    { title }
                </p>
                <p className='journal__entry-content'>
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <FaCalendar className='calendar-icon' />
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>           
        </div>
    )
}
