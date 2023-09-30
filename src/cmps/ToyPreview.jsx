import { Link } from "react-router-dom";
import { inStock } from '../store/actions/toy.actions'

export function ToyPreview({ toy }) {
    const { name, price, _id } = toy || {}
    const robohashUrl = `https://robohash.org/${toy._id}?set=set4&size=150x150`
    return (
        <article className="toy-Preview">

            <h4>{name}</h4>
            <img src={robohashUrl}></img>
            <p>Price: <span>${price.toLocaleString()}</span></p>
            <h4>InStock: {inStock(toy)}</h4>
            <hr />
            {/* <Link to={`/toy/${_id}`}>Details</Link> */}
            <Link className="details-btn" to={`/toy/${_id}`}>Details</Link>

        </article>
    )

}