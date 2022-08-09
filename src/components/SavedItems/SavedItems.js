function SavedItems({setSavedItems, savedItems, savedItem}) {
    const deleteHandler = () => {
        setSavedItems(savedItems.filter((el) => el.id !== savedItem.id));
    }

    const completeHandler = () => {
        setSavedItems(savedItems.map(selectedItem => {
            if (selectedItem.id === savedItem.id) {
                return {
                    ...selectedItem, packed: !selectedItem.packed
                }
            } return selectedItem
        }))
    }

    return (
        <div>
            <li className={`${savedItem.packed ? 'completed' : ''}`}>
                {savedItem.itemName}
            </li>
            <button className='button' onClick={deleteHandler}>delete</button>
            <button className='button' onClick={completeHandler}>done</button>
        </div>
    );
}

export default SavedItems;