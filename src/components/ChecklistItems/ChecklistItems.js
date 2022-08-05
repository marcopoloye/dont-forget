import axios from 'axios';
import './ChecklistItems.scss'

function ChecklistItems({text, setItems, items, item}) {

    const deleteHandler = () => {
        setItems(items.filter((el) => el.id !== item.id));
    }

    const completeHandler = () => {
        setItems(items.map(selectedItem => {
            if (selectedItem.id === item.id) {
                return {
                    ...selectedItem, checked: !selectedItem.checked
                }
            } return selectedItem
        }))
    }

    return (
        <div>
            <li className={`${item.checked ? 'completed' : ''}`}>
                {text}
            </li>
            <button onClick={deleteHandler}>delete</button>
            <button onClick={completeHandler}>done</button>
        </div>
    );
}

export default ChecklistItems;