import { Form, useActionData, useNavigation, useOutletContext } from 'react-router-dom';
import { deleteProduct } from '../../firebase';
import { useState } from 'react';
export async function loader({ request, params }){
    // const product = await getProduct(params.id)
    // return product
    return null;
}

export async function action({ request }){
    const formData = await request.formData()
    const brand = formData.get("brands")
    try {
        const deletedPromise = await deleteProduct({ brand: brand })
        if(deletedPromise){
            return 200;
        }
        else {
        }
    }
    catch(err){
        throw new Error(err.message);
    }
    finally {
        return null;
    }
}

function getBrands(products) {
    let brandArray = [...new Set(products.map((product) => {
        return product.brand
    }))].filter(e => e)
    const brandSelect = brandArray.map((brand) => {
        return <option key={brand} value={brand}>{brand}</option>
    })
    return (
        <>{brandSelect}</>
    )
}

export default function DeleteProducts() {
    const products = useOutletContext()
    const response = useActionData();
    const navigation = useNavigation();
    const [formData, setFormData] = useState("");
    const brands = getBrands(products);
    function handleChange(e){
        setFormData(prevData => {
            prevData = e.target.value
            return prevData
        })
    }
    return (
        <div className='product'>
            <h3 className='text-center'>Bulk Delete Products</h3>
            <div className="product--container">
                <Form
                    method="post"
                    className="products--form"
                    encType="multipart/form-data"
                    replace
                    onSubmit={() => {
                        return confirm('Are you sure you want to delete data of this brand?');
                    }}
                >
                    <div className='mb-1'>
                        <div className="input-group mb-1">
                            <span className="input-group-text" id="brand--name">Brand</span>
                            <select className='form-control product--input' name="brands" id="brands" onChange={(e) => handleChange(e)} value={formData}>
                                <option value="">- Select -</option>
                                    {brands}
                            </select>
                        </div>
                        <div className="form-text d-flex align-items-start px-1" id="basic-addon4">Brand to delete Bulk data.</div>
                    </div>
                    <button
                        disabled={navigation.state === "submitting"}
                        className='submit--button btn btn-outline-primary'
                    >
                        {navigation.state === "submitting"
                            ? "Deleting Product..."
                            : "Delete Product"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}