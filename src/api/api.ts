import { initializeApp } from "firebase/app";
import { FirebaseDataProvider } from "react-admin-firebase";
import { addDoc, collection as fbCollection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import 'firebase/firestore';
import { FieldValues } from 'react-hook-form';

const firebaseConfig = {
  apiKey: "AIzaSyBGzJSre5TMzYFQCYyzpoOwe7CeTcaXV_g",
  authDomain: "pharmastos-d69f2.firebaseapp.com",
  projectId: "pharmastos-d69f2",
  storageBucket: "pharmastos-d69f2.appspot.com",
  messagingSenderId: "50323748779",
  appId: "1:50323748779:web:ccb544709a6dc041f184ee"
};

const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);

export const firebaseDataProvider = FirebaseDataProvider(firebaseConfig, {});

export type BlogItemContentItemType = {
  name: string
  text: {
    ru: (string | { array: string[] })[]
    ua: (string | { array: string[] })[]
  }
}

export type BlogItemType = {
  id: string
  name: string
  img: string
  imgDescription: string
  content: {
    [key: string]: BlogItemContentItemType
  }
}

let currentItemId = window.location.hash.replace(/#\/\w+\//, '');

export const getDocument = async (collection: string) => {
  if (!currentItemId.includes('login')) {
    let docRef = doc(fs, collection, currentItemId);
    let docSnap = await getDoc(docRef);
    return docSnap.data();
  }
  return [];
};
export const updateDocument = (collection: string, updatedData: FieldValues) => {
  const docRef = doc(fs, collection, currentItemId);
  updateDoc(docRef, updatedData);
};
export const createDocument = async (collection: string, data: FieldValues) => {
  await addDoc(fbCollection(fs, collection), data);
};