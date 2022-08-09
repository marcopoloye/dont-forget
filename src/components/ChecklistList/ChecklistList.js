import ChecklistItems from "../ChecklistItems/ChecklistItems";

function ChecklistList({items, setItems}) {


    return (
        <div>
            <ul>
                {items.map(item => (
                    <ChecklistItems key={item.id} setItems={setItems} items={items} item={item}/>
                ))}
            </ul>
        </div>

    );
}

export default ChecklistList;