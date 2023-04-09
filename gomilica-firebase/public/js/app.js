import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXOC6q7YvNKVpxg1nqpwZpbynhR_-qoss",
  authDomain: "gomilica-tool.firebaseapp.com",
  projectId: "gomilica-tool",
  storageBucket: "gomilica-tool.appspot.com",
  messagingSenderId: "1068900019845",
  appId: "1:1068900019845:web:57d1e8de030023e5fe43ec",
  measurementId: "G-Z9MPHEQZ6E"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const db = firebase.firestore();

// Get references to the form and table elements
const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);

  // Create a new document in the "data" collection with the form data
  try {
    await db.collection("data").add({
      title: formData.get("title"),
      about: formData.get("about"),
      link: formData.get("link"),
      tag: formData.get("tag"),
    });

    // Clear the form
    form.reset();

    // Refresh the table
    await refreshTable();
  } catch (error) {
    console.error(error);
  }
});

// Handle table refresh
async function refreshTable() {
  // Clear the table
  tableBody.innerHTML = "";

  // Get all the documents in the "data" collection
  const snapshot = await db.collection("data").get();

  // Add each document to the table
  snapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.title}</td>
      <td>${data.about}</td>
      <td><a href="${data.link}">${data.link}</a></td>
      <td>${data.tag}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial table refresh
refreshTable();
