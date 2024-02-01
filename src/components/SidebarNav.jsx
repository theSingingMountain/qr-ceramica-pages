import { useEffect } from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';

export default function SidebarNav({ products }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchFilter = searchParams.get("search")

    // useEffect(() => {
    //     document.documentElement.style.setProperty('--nav-height', document.getElementById("navbar--height").offsetHeight);
    //     document.documentElement.style.setProperty('--searchbar-height', document.getElementById("searchbar").offsetHeight);
    // }, []);

    function handleSearchChange(e){
        let value = e.target.value
        let key = "search"
        console.log(e.target.value)
        setSearchParams(prevParams => {
            if(value === null || value === ""){
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }
    console.log(searchParams)
    const displayedProducts = searchFilter ? products?.filter(product => {
        if(product.brand.toLowerCase().includes(searchFilter.toLowerCase()) || product.model.toLowerCase().includes(searchFilter.toLowerCase())){
            return products
        }
    }) : products
    console.log(displayedProducts)
    const productData = (products?.length > 0 && displayedProducts?.length > 0) ? displayedProducts.map((product) => {
        return (
            <NavLink to={`/edit/${product.id}`} key={product.id} className={`list-group-item list-group-item-action ${({ isActive }) => isActive ? "active" : ""}`} aria-current="true">
                <div className="d-flex gap-5 w-100 justify-content-between">
                    <h5 className="mb-1 trim list--title">{product.brand}-{product.model}</h5>
                    <small className="trim list--date">{product.created_at}</small>
                </div>
                <p className="mb-1 trim list--desc">{product.desc}</p>
            </NavLink>
        )
    }):
    (
        <Link to="/" className="list-group-item list-group-item-action" aria-current="true">
            <div className={`d-flex gap-auto w-100 justify-content-between`}>
                <h5 className="mb-1 trim list--title">{displayedProducts?.length === 0 && searchParams.get("search") !== "" ? "0 Products Found" : typeof products === "undefined" ? "Loading, please wait..." : "No Products Added"}</h5>
            </div>
            {
                typeof products !== "undefined" && <p className="mb-1 trim list--desc">Click to Add Product</p>
            }
        </Link>
    )

    return (
        <div className='list-group'>
            <div className="d-flex flex-row" id="searchbar">
                <input
                    className="form-control me-1 flex-grow-1"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchChange}
                />
                {/* <button 
                    className="btn btn-outline-success flex-shrink-0" 
                    onClick={handleSearchChange}
                >Search</button> */}
            </div>
            <div className='sidebar--cards'>
                { productData }
            </div>
       </div>
    )
}