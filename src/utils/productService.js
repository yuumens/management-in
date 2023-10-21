import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storages } from "./firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase-config";

export const fetchProducts = async () => {
  try {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, orderBy("productName"));

    const querySnapshot = await getDocs(q);

    const products = [];
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      const productPrice = parseFloat(productData.productPrice); // Konversi ke tipe data number
      const product = {
        id: doc.id,
        productName: productData.productName,
        productCategory: productData.productCategory,
        productImage: productData.productImage, // Pastikan productImage adalah URL gambar
        productPrice: productPrice, // Menggunakan productPrice yang sudah dikonversi
      };
      products.push(product);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

export const uploadImageToStorage = async (imageFile) => {
  try {
    const storageRef = ref(storages, "productImages/" + imageFile.name);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error add Image: ", error);
  }
};

export const addProduct = async (
  productName,
  productCategory,
  productImage,
  productPrice
) => {
  try {
    const productsCollectionRef = collection(db, "products"); // Menggunakan referensi yang sudah ada

    const productData = {
      productName: productName,
      productCategory: productCategory,
      productImage: productImage, // Ini bisa berupa URL gambar jika sudah diunggah ke Firebase Storage
      productPrice: productPrice,
    };

    const docRef = await addDoc(productsCollectionRef, productData); // Menambahkan data produk ke koleksi "products"
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    return null;
  }
};

export const addProductsWithImage = async (
  productName,
  productCategory,
  productImage,
  productPrice
) => {
  try {
    // Mengunggah gambar ke Firebase Storage
    const imageURL = await uploadImageToStorage(productImage);

    if (imageURL) {
      // Menambahkan produk ke Firebase Realtime Database
      const productID = await addProduct(
        productName,
        productCategory,
        imageURL,
        productPrice
      );

      return productID;
    }
  } catch (error) {
    console.error("Error adding product with image: ", error);
  }
};
