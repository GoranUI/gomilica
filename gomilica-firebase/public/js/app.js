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


// Get a reference to the database service
const database = firebase.database();

// Get elements from the DOM
const form = document.querySelector("form");
const table = document.querySelector("tbody");
const exportBtn = document.querySelector("#btnExport");

// Save data to the database
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting

  // Get form data
  const title = form.elements["title"].value;
  const about = form.elements["about"].value;
  const link = form.elements["Link"].value;
  const tag = form.elements["tag"].value;

  // Create a new data object to save to the database
  const newData = {
    title: title,
    about: about,
    link: link,
    tag: tag,
  };

  // Push the new data to the database
  database.ref("data").push(newData);

  // Reset the form
  form.reset();
});

// Display data in the table
database.ref("data").on("value", (snapshot) => {
  // Clear the table
  table.innerHTML = "";

  // Loop through the data and add it to the table
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    const row = table.insertRow();
    row.insertCell().textContent = childData.title;
    row.insertCell().textContent = childData.about;
    row.insertCell().textContent = childData.link;
    row.insertCell().textContent = childData.tag;
  });
});

// Export data as CSV
exportBtn.addEventListener("click", () => {
  let csv = "Title, About, Link, Tag\n";

  database
    .ref("data")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        csv += `"${childData.title}", "${childData.about}", "${childData.link}", "${childData.tag}"\n`;
      });

      // Download the CSV file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
});