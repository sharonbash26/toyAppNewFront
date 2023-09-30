import { ToyPreview } from "./ToyPreview"
export function ToyList({toys,onRemoveToy,onEditToy,addToCart}){
    return(
        <ul className="toy-list">
        {toys.map(toy =>    
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <div className="btn-container">
                    <button onClick={() => onRemoveToy(toy._id)}><img src="public/icon-remove.png"></img></button>
                    <button onClick={() => onEditToy(toy)}><img src="public/editingIcon.png"></img></button>
                
                <button className="buy" onClick={() => addToCart(toy)}>Add to Cart</button>
                </div>
            </li>
        )}
    </ul>
    )
}