
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toys.service"
import { utilService } from "../services/util.service.js"


const toyLabels = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter, recording }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        // onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter">
            {/* <div>Recording:{recording}</div> */}
            <section className="second-nav">

                <form >
                    <label htmlFor="name">
                        <img className="search-icon" src="src/assets/imgs/searchIcon.png" alt="Search Icon" />
                    </label>
                    <input type="text"
                        id="name"
                        name="name"
                        placeholder="Search toy name"
                        value={filterByToEdit.name}
                        onChange={handleChange}

                    />

                    <div className="filter-group">
                        <label htmlFor="inStock">Filter By:</label>
                        <select value={filterByToEdit.inStock} name="inStock" id="inStock" onChange={handleChange}>
                            <option value="">All</option>
                            <option value="true">In Stock</
                            option>
                            <option value="false">Out Of Stock</option>
                        </select>
                    </div>


                    <div className="filter-group">
                        <h4>Filter By</h4>
                        <label htmlFor="toys"></label>
                        <select multiple value={filterByToEdit.labels} name="labels" id="labels" onChange={handleChange}>
                            <option value="">All</option>
                            <>
                                {toyLabels.map(label => (
                                    <option key={label} value={label}>{label}</option>
                                ))}
                            </>
                        </select>
                    </div>

                </form>
            </section>
        </section>
    )
}