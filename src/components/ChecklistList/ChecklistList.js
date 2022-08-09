import ChecklistItems from "../ChecklistItems/ChecklistItems";
import './ChecklistList.scss';

function ChecklistList({items, setItems}) {


    return (
        <>
            <ul className="checklist__list">
                {items.map(item => (
                    <ChecklistItems key={item.id} setItems={setItems} items={items} item={item}/>
                ))}
            </ul>
        </>

    );
}

export default ChecklistList;