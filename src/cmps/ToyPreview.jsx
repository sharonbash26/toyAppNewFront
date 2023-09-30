import { Link } from "react-router-dom";
import { inStock} from '../store/actions/toy.actions'

export function ToyPreview({toy}){
    const {name, price, id} = toy || {}

    return(
        <article className="toy-Preview">
            
            <h4>{name}</h4>
            <p>Price: <span>${price.toLocaleString()}</span></p>
            <h4>InStock: {inStock(toy)}</h4>
            <hr />
            {/* <Link to={`/toy/${id}`}>Details</Link> */}
            <Link className="details-btn" to={`/toy/${id}`}>Details</Link>

        </article>
    )

}