import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'

function Modal(props){
    return props.isVisible
    ? createPortal(
        <div className="modal-container">
            <div className="modal">
                <div>
                    <h5>Modal</h5>
                    <span>
                        Why this modal has popped up
                    </span>
                </div>
                <button onClick={props.hideModal}>
                    Close
                </button>
            </div>
        </div>,
        document.body
    )
    : null
}

export default Modal
