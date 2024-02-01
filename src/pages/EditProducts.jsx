import { Form, useActionData, useLocation, useNavigation, useOutletContext, useParams } from 'react-router-dom';
import { editProduct } from '../../firebase';
import { useState, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import imageCompression from 'browser-image-compression';
import { Navigate } from 'react-router-dom';
export async function loader({ request, params }){
    // const product = await getProduct(params.id)
    // return product
    return null;
}

export async function action( { request }){
    const formData = await request.formData()
    var imageUrl = ""
    let productData = {
        id: formData.get("id"),
        brand: formData.get("brand"),
        model: formData.get("model"),
        desc: formData.get("desc"),
        lastModified: new Date().toLocaleString().replace(',','')
    }
    if(formData.get("blobFile")?.size != 0)
    {
        productData = {
            ...productData,
            img: formData.get("blobFile")
        }
    }
    try {
        imageUrl = await editProduct(productData)
    }
    catch(error){
        throw new Error(error);
    }
    return {image_url: imageUrl}
}

HTMLCanvasElement.prototype.toObjectURL = async function(
    mimeType = "image/jpeg",
    quality = 0.85
  ) {
    return new Promise((resolve, reject) => {
        this.toBlob(
            (blob) => {
                if (!blob) {
                reject("Error creating blob");
                return;
                }
                resolve(blob)
            },
            mimeType,
            quality
        );
    });
};

export default function EditProduct() {
    const actionData = useActionData()
    const params = useParams()
    var products = useOutletContext()
    const fileTypes = [".jpg", ".png", "gif"];
    // if(!products){
    //     return <Navigate to="/" />
    // }
    let product
    for(var i=0; i<products.length; i++){
        if(products[i].id === params.id){
            product = products[i]
        }
    }
    console.log(product)
    if(typeof product === "undefined"){
        throw new Response("Not Found", { status: 404 })
    }
    const location = useLocation()
    const navigation = useNavigation()
    const [formData, setFormData] = useState({
        id: "",
        brand: "",
        model: "",
        desc: ""
    });

    useEffect(() => {
        setFormData(prevProduct => {
            const newProduct = {
                id: product.id,
                brand: product.brand,
                model: product.model,
                desc: product.desc        
            }
            prevProduct = newProduct
            return prevProduct
        })
    }, [params.id])
 
    const [images, setImages] = useState(["", "", "", ""])
    const [disabled, setDisabled] = useState(false)
    const [preview, setPreview] = useState(["", "", "", ""])
    const [submitDisable, setSubmitDisable] = useState(false)
    const [imgSrc, setImgSrc] = useState("")

    const inputs = images.map((val, id) => {
        return <div className="input-group mb-3" key={id}>
            <input type="file"
                className="form-control"
                accept={fileTypes}
                name={`prod_img`}
                id={`prod_img_${id}`}
                onChange={(e) => {
                    setImages(prevImages => {
                        const newArr = [...prevImages]
                        newArr[id] = e.target.files[0]
                        return newArr
                    })
                    if(submitDisable === false && images.filter(val => val).length >= 0)
                        setSubmitDisable(true)
                }}
                disabled={disabled}
            />
            <button 
                className="btn btn-outline-danger" 
                type="button" 
                onClick={(e) => {
                    const input = document.getElementById(`prod_img_${id}`)
                    input.value = ""
                    setImages(prevImages => {
                        const newArr = [...prevImages]
                        newArr[id] = ""
                        return newArr
                    })
                    if(submitDisable === false && images.filter(val => val).length >= 0)
                        setSubmitDisable(true)
                }}
                disabled={images[id] === "" || disabled}
            >Reset</button>
        </div>
    })

    useEffect(() => {
        console.log(submitDisable, disabled)
        const imagesURL = images.map((img) => {
            if (img !== "" && typeof img === "object")
                return URL.createObjectURL(img)
            else
                return ""
        })

        if(images.filter(val => val).length <= 0) {
            console.log("HERE")
            setImgSrc("")
            document.getElementById("blobFile").value = ""
        }

        setPreview(imagesURL)

        const revokeURLs = images.forEach((img) => URL.revokeObjectURL(img))
        return () => revokeURLs
    }, [images])

    useEffect(() => {
        if(imgSrc === ""){
            document.getElementById("blobFile").value === ""
        }
    },[imgSrc])

    async function handlePreviewClick(){
        const previews = preview.filter(val => val)
        console.time("PREVIEW")
        await getFiles2(previews)
        console.timeEnd("PREVIEW")
        setDisabled(false)
    }

    const disabledToggle = navigation.state === "submitting" || disabled || submitDisable

    async function getFiles2(images) {
        setDisabled(true)
        var width = 0, height = 0; var count = 0;
        const loadImages = (blob) => new Promise(async (resolve, reject) => {
            var image = new Image();
            image.src = blob;
            image.onload = function () {
                const cnv = document.createElement('canvas')
                const ctx = cnv.getContext('2d')
                width = Math.max(width, image.width)
                height += image.height
                cnv.width = image.width
                cnv.height = image.height
                ctx.drawImage(this,
                    cnv.width / 2 - image.width / 2,
                    image.height / image.width
                )
                cnv.toBlob(res => {
                    const url = URL.createObjectURL(res)
                    count++;
                })
                resolve({
                    cnv: cnv, width: image.width, height: image.height
                })
            }
            image.onerror = (err) => {
                reject(err)
            }
        })
        const imagePromises = images.map(async (img) => new Promise(async (rs, rj) => {
            try {
                const image = await loadImages(img)
                rs(image)
            }
            catch (err) {
                rj(err)
            }
        }))
        try {
            var imgHeight = 0;
            const imagePromisesConf = await Promise.all(imagePromises)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext("2d");
            canvas.height = height;
            canvas.width = width;
            imagePromisesConf.forEach(async (img) => {
                var imgWidth = img.width;
                ctx.drawImage(img.cnv, canvas.width / 2 - imgWidth / 2, imgHeight)
                imgHeight += img.height
            })
            let blob = await canvas.toObjectURL("image/jpeg", 1);
            const options = {
                maxSizeMB: 2,
                useWebWorker: true,
            }
            const compressedFile = await imageCompression(blob, options);
            const date = new Date()
            let file = new File([compressedFile], "temp_img.jpeg", { type: "image/jpeg", lastModified: date })
            let container = new DataTransfer()
            container.items.add(file)
            document.getElementById("blobFile").files = container.files;
            const url = URL.createObjectURL(compressedFile)
            setImgSrc(url)
            URL.revokeObjectURL(compressedFile)
            setDisabled(false)
            setSubmitDisable(false)
            return compressedFile
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
    // useEffect(() => {
    //     setFormData(prev => ({
    //         id: product.id,
    //         brand: product.brand,
    //         model: product.model,
    //         desc: product.desc,
    //     })
    //     )
    // }, [location])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='row'>
            <div className='col text-center'>
                <h3 className='text-center text-uppercase'>Edit Product</h3>
                <Form
                    method="post"
                    className="products--form p-3"
                    encType="multipart/form-data"
                >
                    <input
                        type="hidden"
                        name="id"
                        value={product.id}
                        onChange={handleChange}
                    />
                    <div className='mb-1'>
                        <div className="input-group mb-1">
                            <span className="input-group-text" id="brand--name">Brand Name</span>
                            <input
                                className="form-control product--input"
                                type="text"
                                name="brand"
                                placeholder="Brand Name..."
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-text d-flex align-items-start px-1">Required. Name of the brand.</div>
                    </div>
                    <div className="mb-1">
                        <div className="input-group mb-1">
                            <span className="input-group-text" id="model--name">Model Name</span>
                            <input
                                className="form-control product--input"
                                type="text"
                                name="model"
                                placeholder="Model Name..."
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-text d-flex align-items-start px-1">Required. Name of the model.</div>
                    </div>
                    <div className="mb-1">                    
                        <div className="input-group mb-1">
                            <span className="input-group-text" id="description--name">Description</span>
                            <input
                                className="form-control product--input"
                                type="text"
                                name="desc"
                                placeholder="Description..."
                                value={formData.desc}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-text d-flex align-items-start px-1">Optional. Description of the product.</div>
                    </div>
                    {inputs &&
                        <div className="mb-1">
                            <div className='d-flex row mb-2'>
                                <div className='d-flex gap-2 col-shrink-1 align-items-center'><>UPLOAD IMAGES</>
                                </div>
                            </div>
                            {inputs}
                            <div className="form-text d-flex align-items-start px-1">Required. Multiple images can be added.</div>
                            <div className="input-group mb-3">
                                <input 
                                    type="file" 
                                    name="blobFile" 
                                    id="blobFile" 
                                    accept={fileTypes} 
                                    style={{pointerEvents: "none"}} 
                                    className='form-control'
                                    required={images?.filter(val => val).length > 0}
                                />                                    
                            </div>
                        </div>
                    }
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className='btn btn-outline-secondary submit--button'
                            onClick={() => handlePreviewClick()}
                            disabled={preview.filter(val => val).length <= 0 || disabled || navigation.state === "submitting"}
                        >
                            {
                                preview.filter(val => val).length <= 0 ? "Add images to preview..." : "Display Preview"
                            }
                        </button>
                        <button
                            disabled={navigation.state === "submitting" || submitDisable || disabled}
                            className='submit--button btn btn-outline-primary'
                        >
                            {navigation.state === "submitting"
                                ? "Editing Product..."
                                : "Edit Product"
                            }
                        </button>
                    </div>
                </Form>
            </div>
            <div className='preview--container col text-center'>
                <h4>PREVIEW</h4>
                {
                    // imgPreview.some(value => value !== "") &&
                    <div className="images--preview">
                        <div id="preview">{imgSrc && <img src={imgSrc} style={{ maxWidth: "100%" }}></img>}</div>
                    </div>
                }
            </div>
        </div>
    )
}