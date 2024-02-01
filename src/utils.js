import { redirect } from "react-router-dom"
import { toPng, toBlob } from 'html-to-image';
import { saveAs } from "file-saver";
import JSZip from "jszip";

export function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedIn")

    if (!isLoggedIn) {
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
    else{

    }
    return null;
}

export async function LoggedIn(request){
    const isLoggedIn = localStorage.getItem("loggedIn");
    if(isLoggedIn){
        throw redirect('/');
    }
    return isLoggedIn
}

export async function getImage(){
    const div = document.getElementsByClassName('uploaded-images')
    const png = await toPng(div)
    return png
}

export async function download(products){
    const zip = new JSZip()
    let date = new Date()
    const dateFormatted = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    const downloader = products ? await Promise.all(products.map(async (product) => {
        const div = document.getElementById(product.id)
        return toBlob(div, {backgroundColor: "white", canvasWidth: "350", canvasHeight: "375", quality: "1"}).then(function(blob) {
            let name = `${product.brand}-${product.model}.png`
            zip.file(name, blob)
            // saveAs(blob, `${product.title}.png`)
        })
    })): ""
    zip.generateAsync({
        type: "blob",
        compression: "DEFLATE"
    }).then(function(content){
        let fileName = products.length === 1 ? `QR CODE - ${products[0].brand} - ${products[0].model}` : `QR CODES - ${dateFormatted}` 
        saveAs(content, fileName)
    })
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}