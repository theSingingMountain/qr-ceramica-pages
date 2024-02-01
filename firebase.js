// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  where,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  limit
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import shortUUID from "short-uuid";

// Your web app's Firebase configuration
const env = import.meta.env
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)

const storage = getStorage();
const productsCollectionRef = collection(db, "products")

export async function addProduct(brand, model, desc, img, createdAt, lastModified) {
  const uuid = shortUUID.generate()
  const ext = img.name.split(".").pop()
  const fileName = `${brand}-${model}.${ext}`;
  const file = img;
  if(img.type.split("/")[0] === "image")
  {
    const storageRef = ref(storage, `images/${uuid}/${fileName}`);
    try {
      const uploadTask = await uploadBytes(storageRef, img);
      const imgRef = ref(storage, uploadTask.ref);
      const src = getDownloadURL(imgRef).then((url)=> {
        setDoc(doc(db, "products", uuid), {
          brand: brand,
          model: model,
          desc: desc,
          image_location: url,
          created_at: createdAt,
          last_modified: lastModified
        }, { merge: true }).catch((error) => error.message)
      }).catch((error) => error.message)
    }
    catch(error){
      throw new Error(error.message)
    }  
  }
  else
  {
    throw new Error("IMAGE FILES ACCEPTED, PLEASE UPLOAD IMAGE FILES");
  }
}

export async function getProduct(brand, model) {
  console.log(brand, model)
  const q = query(collection(db, "products"), where('brand', '==', brand), where('model', '==', model), limit(1))
  try {
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    var docURL = ""
    const url = querySnapshot.forEach((doc) => 
      {
        docURL = doc.data().image_location
      }
    )
    return docURL
  }catch(err){
    return err.message
  }
}

export async function deleteProduct({id, brand}){
  const batch = writeBatch(db);
  const q = query(collection(db, "products"), where('brand', '==', brand));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((data) => {
    // doc.data() is never undefined for query doc snapshots
    batch.delete(doc(db, "products", data.id))
  });

  await batch.commit();
}

export async function editProduct(productData){
  let productDetails = {
    brand: productData.brand,
    model: productData.model,
    desc: productData.desc,
    last_modified: productData.lastModified
  }
  let img, name
  if(productData.img)
  {
    img = productData.img
    const ext = img.name.split(".").pop()
    name = `${productData.brand}-${productData.model}.${ext}`;
  }
  let uuid = productData.id;
  var img_location = ""
  if(img?.size > 0){
    if(img.type.split("/")[0] === "image")
    {
      const storageRef = ref(storage, `images/${uuid}/${name}`);
      try {
        const uploadTask = await uploadBytes(storageRef, img);
        const imgRef = ref(storage, uploadTask.ref);
        const imgUrl = getDownloadURL(imgRef).then((url)=> {
          productDetails = {
            ...productDetails,
            image_location: url
          }
          setDoc(doc(db, "products", uuid), productDetails, { merge: true }).catch((error) => {throw new Error("IMG NOT FOUND")})
          return url
        }).catch((error) => {throw new Error("IMG NOT FOUND 4")})
        return productDetails
      }
      catch(error){
        throw new Error("IMG NOT FOUND 2")
      }
    }
    else
    {
      throw new Error("IMAGE FILES ACCEPTED. PLEASE ADD IMAGE")
    }
  }
  else
  {
    setDoc(doc(db, "products", uuid), productDetails, { merge: true }).catch((error) => {throw new Error("IMG NOT FOUND 3")})
    return productDetails
  }
}

// export async function getProduct(id) {
//   const prodRef = doc(db, "products", id)
//   const unsubscribe = onSnapshot(prodRef, (querySnapshot) => {
//     const dataArr = {
//       ...querySnapshot.data(),
//       id: querySnapshot.id
//     }
//     return dataArr
//   })
//   unsubscribe()
// }

export default app;
