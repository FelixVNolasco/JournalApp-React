import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { startSaveNote, startUploading } from '../../actions/notes'
import { noAction } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );
    
    const noteDate = moment();
    

    const handleSaveNote = () => {        
        dispatch( startSaveNote(active) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }

    const handleNoAction = () => {
        dispatch(noAction());
    }

    return (
        <div className='notes__appbar'>
            <div className='date'>
                <span>{ noteDate.format('LL') }</span>
            </div>        
            <div className='actions'>
                <input 
                    id="fileSelector"
                    type="file"
                    name="file"
                    style={{ display: 'none' }}
                    onChange={ handleFileChange }
                />

                <button className='btn' onClick={ handlePictureClick } >Picture</button>
                <button className='btn' onClick={ handleSaveNote }>Save</button>
                <button className='btn' onClick={ handleNoAction }>Unselect</button>
            </div>            
        </div>
    )
}
