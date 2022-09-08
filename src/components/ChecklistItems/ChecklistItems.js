import './ChecklistItems.scss';

function ChecklistItems({setItems, items, item}) {

    // removes item from list
    const deleteHandler = () => {
        setItems(items.filter((selectedItem) => selectedItem.id !== item.id));
    };

    // crosses out item from list
    const completeHandler = () => {
        setItems(items.map(selectedItem => {
            if (selectedItem.id === item.id) {
                return {
                    ...selectedItem, packed: !selectedItem.packed
                }
            } return selectedItem;
        }));
    };

    return (
        <>
            <li className={`${item.packed ? 'checklist__items--strike' : 'checklist__items'}`}>
                {item.itemName}
                <div className='checklist__items-button-container'>
                    <div className='checklist__items-button--green' onClick={completeHandler}/>
                    <div className='checklist__items-button--red' onClick={deleteHandler}/>
                </div>
            </li>
        </>
    );
};

export default ChecklistItems;