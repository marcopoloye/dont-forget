import ChecklistItems from "../ChecklistItems/ChecklistItems";

function ChecklistList({items, setItems}) {
    console.log({items})
    return (
        <div>
            <ul>
                {items.map(item => (
                    <ChecklistItems text={item.text} key={item.id} setItems={setItems} items={items} item={item}/>
                ))}
            </ul>
        </div>

    );
}

export default ChecklistList;