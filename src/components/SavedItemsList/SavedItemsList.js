import SavedItems from "../SavedItems/SavedItems";

function SavedItemsList({savedItems, setSavedItems}) {

    return (
        <>
            <ul>
                {savedItems.map(savedItem => (
                    <SavedItems key={savedItem.id} setSavedItems={setSavedItems} savedItems={savedItems} savedItem={savedItem}/>
                ))}
            </ul>
        </>
    );
}

export default SavedItemsList;