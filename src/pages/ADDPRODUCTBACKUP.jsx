import { Form, useActionData, useNavigation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { toBlob, toCanvas, toPng } from 'html-to-image'
import { requireAuth } from '../utils'
import pdfMake from "pdfmake";

export async function loader({ request }) {
    requireAuth(request)
    return null
}

export async function action({ request }) {
    const formData = await request.formData();
    const brand = formData.get("prod_brand");
    const model = formData.get("prod_model");
    const desc = formData.get("prod_desc");
    // const imgs = formData.getAll("prod_img");
    const createdAt = new Date().toLocaleString().replace(',', '');
    const lastModified = new Date().toLocaleString().replace(',', '');
    const img = getBlob()
    return img
    // var count = 0;
    // const imgPromises = Array.from(imgs).map((file, index) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         var cnv = document.createElement('canvas')
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = async () => {
    //             try {
    //                 const image = new Image();
    //                 image.onload = async () => {
    //                     image.width = image.naturalWidth
    //                     image.height = image.naturalHeight
    //                     resolve(image)
    //                 }
    //                 image.src = fileReader.result;
    //             }
    //             catch(err) {
    //                 reject(err)
    //             }
    //         }
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         }
    //     })
    // })
    // Promise.all(imgPromises).then((res) => {
    //     imageMerging(res)
    // })
    // function imageMerging(imagesArray){
    //     const div = document.createElement('div')
    //     imagesArray.map((img) => div.appendChild(img))
    // }
    return null;
}

async function getFiles(images) {
    const Jimp = window.Jimp

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const jimpImages = images.map((img) => new Promise(async (resolve, reject) => {
        try {
            const dataUrl = await toBase64(img)
            const jimpImage = await Jimp.read(dataUrl)
            width = Math.max(width, jimpImage.bitmap.width)
            height += jimpImage.bitmap.height;
            resolve(jimpImage)
        }
        catch(err){
            reject(err)
        }
    }))
    try {
        var width = 0, height = 0
        var imgHeight = 0
        const imagePromises = await Promise.all(jimpImages)
        const image = await new Jimp(width, height)
        const finalImage = imagePromises.map((img) => {
            image.blit(img, 0, imgHeight)
            imgHeight += img.bitmap.height
        })
        const base64Screenshot = await new Promise((resolve, reject) => {
            image.getBuffer(Jimp.MIME_PNG,function (err, buffer) {
                if (err) {
                return reject(err);
                }
                return resolve(buffer.toString('base64'));
            })
        });
    }
    catch(err){
    }
}

function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}

function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

export default function AddProduct() {
    const navigation = useNavigation()
    const actionData = useActionData()
    const fileTypes = [".jpg", ".png", "gif"];
    const [images, setImages] = useState(["","","",""])
    const [done, setDone] = useState(false)
    const [preview, setPreview] = useState(["","","",""])
    const [img, setImg] = useState("")
    const myRef = useRef(null)
    const imgRef = useRef([])
    if(actionData && done === false){
        window.saveAs(actionData, 'temp_image.png')
    }
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
                    }}
                    required={id === 0 && true}
                />
        </div>
    })

    useEffect(() => {
        const imagesURL = images.map((img) => {
            if(img !== "" && typeof img === "object")
            return URL.createObjectURL(img)
            else
            return ""
        })

        setPreview(imagesURL)
        
        const revokeURLs = images.forEach((img) => URL.revokeObjectURL(img))
        return () => revokeURLs
    }, [images])
    
    
    function depArray(images) {
        return images.map((img) => {
            if(img !== "")
                return img?.name
            else
                return ""
        })
    }
    const imgPreview = preview?.filter((val) => val !== typeof img).map((prev, id) => {
        if(prev !== null && prev !== ""){
            const val = <img key={`preview_${id}`} ref={ref => imgRef.current[id] = ref} src={prev} style={{maxWidth: "100%"} }/>
            return val;
        }
        else {
            return "";
        }
    })
    if(imgPreview.some(value => value !== "")){
        window.scrollTo(0, myRef.current.offsetTop)
    }
    return (
        <>
            <div className="product--container">
                <div>
                    <h3 className='text-center text-uppercase'>Add Product<button type="button" onClick={async () => await getFiles(images?.filter(val => val))}>IMAGES</button></h3>
                    <Form
                        method="post"
                        className="products--form p-3"
                        encType="multipart/form-data"
                        replace
                    >
                        <div className="mb-1">
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="brand--name">Brand Name</span>
                                <input
                                    className="form-control product--input"
                                    type="text"
                                    name="prod_brand"
                                    placeholder="Brand Name..."
                                    onKeyDown={(e) => {
                                        const value = e.target.value
                                        if (value.length === 0 && e.code === 'Space')
                                            e.preventDefault();
                                    }}
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
                                    name="prod_model"
                                    placeholder="Model Name..."
                                    onKeyDown={(e) => {
                                        const value = e.target.value
                                        if (value.length === 0 && e.code === 'Space')
                                            e.preventDefault();
                                    }}
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
                                    name="prod_desc"
                                    onKeyDown={(e) => {
                                        const value = e.target.value
                                        if (value.length === 0 && e.code === 'Space')
                                            e.preventDefault();
                                    }}
                                    placeholder="Description..."
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
                            </div>
                        }
                        <button
                            disabled={navigation.state === "submitting"}
                            className='submit--button btn btn-outline-primary'
                            type="submit"
                            ref={myRef}
                        >
                            {navigation.state === "submitting"
                                ? "Adding Product..."
                                : "Add Product"
                            }
                        </button>
                    </Form>
                </div>
                <div className='preview--container'>
                    <h4>PREVIEW</h4>
                    {
                    imgPreview.some(value => value !== "") &&
                    <div className="images--preview">
                        <div id="preview">{imgPreview && imgPreview}</div>
                    </div>
                    }
                </div>
                {/* <div className='image--display'>
                    <h3>IMAGE</h3>
                </div> */}
            </div>
        </>
    )
}

async function getFiles(images) {
    var width = 0, height = 0;

    const jimpImages = images.map((img) => new Promise(async (rs, rj) => {
        try {
            const blob = await compressImage(img, { quality: 0.2, type: img.type })
            const dataUrl = URL.createObjectURL(blob)
            console.log(dataUrl)
            const jimpImage = Jimp.read(dataUrl).then((img) => {
                img.resize(Math.min(500, img.bitmap.width), Jimp.AUTO, Jimp.RESIZE_BICUBIC)
                width = Math.max(width, img.bitmap.width)
                height += img.bitmap.height;
                return img
            })
            rs(jimpImage)
        }
        catch(err){
            rj(err)                
        }
    }))
    // const jimpImages = images.map((img) => new Promise(async (resolve, reject) => {
    //     try {
    //         const dataUrl = await compressImage(img, { quality: 1, type: file.type})
    //         console.log(dataUrl)
    //         const jimpImage = Jimp.read(dataUrl).then((img) => {
    //             img.resize(Math.min(1000, img.bitmap.width), Jimp.AUTO, Jimp.RESIZE_BICUBIC)
    //             width = Math.max(width, img.bitmap.width)
    //             height += img.bitmap.height;
    //         })
    //         resolve(jimpImage)
    //     }
    //     catch (err) {
    //         reject(err)
    //     }
    // }))
    try {
        var imgHeight = 0
        const imagePromises = await Promise.all(jimpImages)
        const image = await new Jimp(width, height)
        await image.rgba(false).background(0xFFFFFFFF)
        const finalImage = imagePromises.map((img) => {
            let imgWidth = img.bitmap.width
            let img1w, img2w, diff
            img1w = width / 2; img2w = imgWidth / 2; diff = img2w - img1w;
            image.blit(img, 0 - diff, imgHeight)
            imgHeight += img.bitmap.height
        })
        const base64Screenshot = await new Promise((resolve, reject) => {
            image.getBuffer(Jimp.MIME_PNG, function (err, buffer) {
                if (err) {
                    return reject(err);
                }
                return resolve(buffer.toString('base64'));
            })
        });
        setImgSrc(base64Screenshot)
    }
    catch (err) {
    }
}