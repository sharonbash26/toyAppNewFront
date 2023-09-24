import { ToyPreview } from "./ToyPreview"
export function ToyList({toys,onRemoveToy,onEditToy,addToCart}){
    return(
        <ul className="toy-list">
        {toys.map(toy =>    
            <li className="toy-preview" key={toy.id}>
                <ToyPreview toy={toy} />
                <div>
                    <button onClick={() => onRemoveToy(toy.id)}>x</button>
                    <button onClick={() => onEditToy(toy)}>Edit</button>
                </div>
                <button className="buy" onClick={() => addToCart(toy)}>Add to Cart</button>
            </li>
        )}
    </ul>
    )
}