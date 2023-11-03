import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storages } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
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
      const productPrice = parseFloat(productData.productPrice);
      const productStock = parseFloat(productData.productStock);

      const product = {
        id: doc.id,
        productName: productData.productName,
        productStock: productStock,
        productImage: productData.productImage,
        productPrice: productPrice,
        uploadDate: productData.uploadDate,
        lastUpdate: productData.lastUpdate,
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
  productStock,
  productImage,
  productPrice
) => {
  try {
    const productsCollectionRef = collection(db, "products");

    const productData = {
      productName: productName,
      productStock: productStock,
      productImage: productImage,
      productPrice: productPrice,
      uploadDate: serverTimestamp(),
    };

    const docRef = await addDoc(productsCollectionRef, productData);
    console.log("Product added with ID:", docRef.id);
    productData.id = docRef.id;
    return productData;
  } catch (error) {
    console.error("Error adding product: ", error);
    return null;
  }
};

export const addProductsWithImage = async (
  productName,
  productStock,
  productImage,
  productPrice
) => {
  try {
    const imageURL = await uploadImageToStorage(productImage);

    if (imageURL) {
      const productID = await addProduct(
        productName,
        productStock,
        imageURL,
        productPrice
      );

      return productID;
    }
  } catch (error) {
    console.error("Error adding product with image: ", error);
  }
};

export const checkProductExists = async (productName) => {
  try {
    const productsCollectionRef = collection(db, "products");
    const productQuery = query(
      productsCollectionRef,
      where("productName", "==", productName)
    );
    const querySnapshot = await getDocs(productQuery);

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking product existence: ", error);
    return false;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
    console.log("Product deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting product: ", error);
    return false;
  }
};
