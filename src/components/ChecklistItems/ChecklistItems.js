import './ChecklistItems.scss';
import '../../styles/partials/_globals.scss';

function ChecklistItems({setItems, items, item}) {

    const deleteHandler = () => {
        setItems(items.filter((selectedItem) => selectedItem.id !== item.id));
    }

    const completeHandler = () => {
        setItems(items.map(selectedItem => {
            if (selectedItem.id === item.id) {
                return {
                    ...selectedItem, packed: !selectedItem.packed
                }
            } return selectedItem
        }))
    }

    return (
        <div>
            <li className={`${item.packed ? 'completed' : ''}`}>
                {item.itemName}
            </li>
            <button className='button' onClick={deleteHandler}>delete</button>
            <button className='button' onClick={completeHandler}>done</button>
        </div>
    );
}

export default ChecklistItems;