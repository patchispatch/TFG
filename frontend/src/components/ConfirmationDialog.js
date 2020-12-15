import React from 'react'
import Modal from './Modal'

function ConfirmationDialog(props) {
    return (
        <Modal isVisible={props.isVisible} hideModal={props.hideModal}>
            <p>{props.message}</p>
            <button onClick={props.onConfirm}>{props.confirmButtonText}</button>
            <button onClick={props.hideModal}>{props.cancelButtonText}</button>
        </Modal>
    )
}

export default ConfirmationDialog
