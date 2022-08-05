import axios from 'axios';
import './ChecklistItems.scss'

function ChecklistItems({itemName, setItems, items, item}) {

    const deleteHandler = () => {
        setItems(items.filter((el) => el.id !== item.id));
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
                {itemName}
            </li>
            <button onClick={deleteHandler}>delete</button>
            <button onClick={completeHandler}>done</button>
        </div>
    );
}

export default ChecklistItems;