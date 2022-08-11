import './DeleteListModal.scss';

function DeleteListModal({destination, closeModal, deleteList}) {

    const handleCloseModal = () => {
        closeModal();
    };

    const handleDeleteList = () => {
        deleteList();
    };

    return (
        <div className='modal__background'>
            <div className='modal__container'>
                <div className='modal__button-container'>
                    <button className='modal__button-close' onClick={handleCloseModal}>X</button>
                </div>
                <h3 className='modal__title'>
                    Delete list for {destination}
                </h3>
                <p className='modal__body'>
                    Please confirm that you would like to delete this list.
                </p>
                <div className='modal__footer'>
                    <button className='modal__button-footer button' onClick={handleCloseModal}>Cancel</button>
                    <button className='modal__button-footer button' onClick={handleDeleteList} id='delete-button'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteListModal;