import React, { useState } from "react"
import { download } from "../utils"
import QRCode from "react-qr-code"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ButtonGroup from "./ButtonGroup";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

// export async function loader({ request }){
//     requireAuth(request)
//     const products = await getProducts();
//     return products;
// }

export async function action() {

}

// function handleClick() {
//     download(products)
// }

export default function Home({products}) {
  console.log(`${window.location.hostname}${window.location.protocol && `:${window.location.protocol}`}`)
  const [show, setShow] = useState(false)
  const productQR = products ? products.map((product) => {
    const value = `${window.location.hostname}/images?brand=${product.brand}&model=${product.model}`
      return (
        <div className="d-flex flex-column align-items-center text-center justify-content-center">
            <div className='d-flex flex-column justify-content-center align-items-center text-center mh-100' style={{width: "fit-content", padding: "5px"}} id={product.id}>
                <QRCode size={150} viewBox={`0 0 200 200`} value={value}/>
                <span style={{margin: "0", padding: "0", fontSize: "16px", fontWeight: "bold"}}>{product.brand} - {product.model}</span>
                <span style={{margin: "0", padding: "0", fontSize: "14px", fontWeight: "normal" }}>Scan this QR Code to learn more.</span>
            </div>
            <div className='pb-2'>
                <button className='btn btn-outline-primary' onClick={() => download([product])}>Click to Export this QR Code</button>
            </div>
        </div>
      )
  }) : ""

  return (
    <React.Fragment>
        <h3 className='text-center'>EXPORTS</h3>
          <Carousel arrows={false} renderButtonGroupOutside={true} responsive={responsive} customButtonGroup={<ButtonGroup/>}>
              {productQR}
          </Carousel>
        <button className='btn btn-outline-primary' onClick={() => download(products)}>Export All QR Codes</button>
    </React.Fragment>
  )
}
