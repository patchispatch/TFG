import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'

function Modal(props){
    return props.isVisible
    ? createPortal(
        <div className="modal-container">
            <div className="modal">
                <button className="close-button" onClick={props.hideModal}>
                    &times;
                </button>
                {props.children}
            </div>
        </div>,
        document.body
    )
    : null
}

export default Modal
