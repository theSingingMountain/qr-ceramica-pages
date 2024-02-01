import { Form, useActionData, useNavigation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { toBlob, toCanvas, toPng } from 'html-to-image'
import { requireAuth } from '../utils'
import pdfMake from "pdfmake";
import { useScript } from '../useScript';
import imageCompression from 'browser-image-compression';
import { useSubmit } from 'react-router-dom';
export async function loader({ request }) {
    requireAuth(request)
    return null
}

export async function action({ request }) {
    const formData = await request.formData();
    const brand = formData.get("prod_brand");
    const model = formData.get("prod_model");
    const desc = formData.get("prod_desc");
    const imgFile = formData.get("blobFile");
    console.log("IMAGE FILE!!", imgFile)
    // const imgs = formData.getAll("prod_img");
    const createdAt = new Date().toLocaleString().replace(',', '');
    const lastModified = new Date().toLocaleString().replace(',', '');
    return null;
}

function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}

function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
}

export default function AddProduct() {
    const { Jimp } = useScript('https://cdn.jsdelivr.net/gh/oliver-moran/jimp@v0.2.27/browser/lib/jimp.min.js', 'Jimp')
    const navigation = useNavigation()
    const actionData = useActionData()
    const handleSubmit = useSubmit()
    const fileTypes = [".jpg", ".png", "gif"];
    const [images, setImages] = useState(["", "", "", ""])
    const [disabled, setDisabled] = useState(false)
    const [preview, setPreview] = useState(["", "", "", ""])
    const [imgSrc, setImgSrc] = useState("")
    const myRef = useRef(null)
    const imgRef = useRef([])
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
                disabled={disabled}
            />
            <button className="btn btn-outline-danger" type="button" onClick={(e) => {
                const input = document.getElementById(`prod_img_${id}`)
                input.value = ""
                setImages(prevImages => {
                    const newArr = [...prevImages]
                    newArr[id] = ""
                    console.log(newArr)
                    return newArr
                })
                if(images.filter(val => val).length <= 0) {
                    console.log("HELLO!")
                    setImgSrc("")
                }
            }}>Reset</button>
        </div>
    })

    console.log("PREVIEW", preview)
    useEffect(() => {
        const imagesURL = images.map((img) => {
            if (img !== "" && typeof img === "object")
                return URL.createObjectURL(img)
            else
                return ""
        })

        setPreview(imagesURL)

        const revokeURLs = images.forEach((img) => URL.revokeObjectURL(img))
        return () => revokeURLs
    }, [images])

    // useEffect(() => {
    // }, [preview])

    async function getFiles2(images) {
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
                    console.log(count, url)
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
            console.log(imagePromisesConf, width, height)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext("2d");
            canvas.height = height;
            canvas.width = width;
            imagePromisesConf.forEach(async (img) => {
                var imgWidth = img.width;
                ctx.drawImage(img.cnv, canvas.width / 2 - imgWidth / 2, imgHeight)
                imgHeight += img.height
            })
            canvas.toBlob(async res => {
                console.log(res)
                const options = {
                    maxSizeMB: 2,
                    useWebWorker: true,
                }
                const compressedFile = await imageCompression(res, options);
                let file = new File([compressedFile], "temp_img.jpg", { type: "image/jpg", lastModified: new Date().getTime() })
                let container = new DataTransfer()
                container.items.add(file)
                document.getElementById("blobFile").files = container.files;
                console.log(document.getElementById("blobFile").files)
                const url = URL.createObjectURL(compressedFile)
                console.log("URL", url)
                setImgSrc(url)
                URL.revokeObjectURL(compressedFile)
            },
                "image/jpg", 1
            )
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    function depArray(images) {
        return images.map((img) => {
            if (img !== "")
                return img?.name
            else
                return ""
        })
    }

    async function handlePreviewClick(){
        const previews = preview.filter(val => val)
        await getFiles2(previews)
        setDisabled(false)
    }
    // const imgPreview = preview?.filter((val) => val !== typeof img).map((prev, id) => {
    //     if (prev !== null && prev !== "") {
    //         const val = <img key={`preview_${id}`} ref={ref => imgRef.current[id] = ref} src={prev} style={{ maxWidth: "100%" }} />
    //         return val;
    //     }
    //     else {
    //         return "";
    //     }
    // })
    // if (imgPreview.some(value => value !== "")) {
    //     window.scrollTo(0, myRef.current.offsetTop)
    // }
    // const handleFormSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log(imgSrc)
    //     fetch(imgSrc).then(res => res.blob()).then(blob => {
    //         console.log(blob)
    //         let file = new File([blob], "temp_img.jpg", { type: "image/jpg", lastModified:new Date().getTime()})
    //         let container = new DataTransfer()    
    //         container.items.add(file)
    //         document.getElementById("blobFile").files = container.files;
    //         handleSubmit(e.currentTarget)
    //         }).catch(err => err)
    // }
    return (
        <>
            <div className="product--container">
                <div>
                    <h3 className='text-center text-uppercase'>Add Product</h3>
                    <Form
                        method="post"
                        className="products--form p-3"
                        encType="multipart/form-data"
                        // onSubmit={handleFormSubmit}
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
                                <input type="file" name="blobFile" id="blobFile" accept={fileTypes} disabled />
                            </div>
                        }
                        <div>
                            <button
                                type="button"
                                className='btn btn-outline-secondary'
                                onClick={() => handlePreviewClick()}
                                disabled={preview.filter(val => val).length <= 0}
                            >
                                {
                                    preview.filter(val => val).length <= 0 ? "Add images to preview..." : "Display Preview"
                                }
                            </button>
                            <button
                                disabled={navigation.state === "submitting" || disabled}
                                className='submit--button btn btn-outline-primary'
                                type="submit"
                                ref={myRef}
                            >
                                {navigation.state === "submitting"
                                    ? "Adding Product..."
                                    : "Add Product"
                                }
                            </button>
                        </div>
                    </Form>
                </div>
                <div className='preview--container'>
                    <h4>PREVIEW</h4>
                    {
                        // imgPreview.some(value => value !== "") &&
                        <div className="images--preview">
                            <div id="preview">{imgSrc && <img src={imgSrc} style={{ maxWidth: "100%" }}></img>}</div>
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