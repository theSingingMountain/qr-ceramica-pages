import React, { useEffect } from "react"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { getProduct } from "../../firebase"

export async function loader({ request }){
    const searchParams = new URL(request.url).searchParams
    const brandParam = searchParams.get("brand")
    const modelParam = searchParams.get("model")
    if(brandParam && modelParam){
        try {
            const url = await getProduct(brandParam, modelParam)
            console.log(url)
            return url
        }catch(err){
            throw new Error(err.message)
        }    
    }
    else
        return null
}

export default function ImagesDisplay({brandProp, modelProp}) {
    const loaderData = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const brandParam = searchParams.get("brand")
    const modelParam = searchParams.get("model")
    useEffect(() => {
        document.getElementsByTagName('html')[0].style.overflowY = "scroll"
    })
    return (
        <img src={loaderData}
        alt="new" 
        style={{maxWidth: "100%"}}
        />    
    )
}