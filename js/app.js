let firebase = {};

const initFirebase = async () => {
  const baseUrl = 'https://www.gstatic.com/firebasejs/9.19.1';

  const [{ initializeApp }, { getDatabase, ref, set, push, onValue }] = await Promise.all([
    import(`${baseUrl}/firebase-app.js`),
    import(`${baseUrl}/firebase-database.js`),
  ]);

  const firebaseConfig = {
    apiKey: 'AIzaSyAXOC6q7YvNKVpxg1nqpwZpbynhR_-qoss',
    authDomain: 'gomilica-tool.firebaseapp.com',
    databaseURL: 'https://gomilica-tool-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'gomilica-tool',
    storageBucket: 'gomilica-tool.appspot.com',
    messagingSenderId: '1068900019845',
    appId: '1:1068900019845:web:57d1e8de030023e5fe43ec',
    measurementId: 'G-Z9MPHEQZ6E',
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  firebase = { db, ref, set, push, onValue };
};

const saveButton = document.getElementById('btnSave');
const titleField = document.getElementById('title');
const aboutField = document.getElementById('about');
const linkField = document.getElementById('Link');
const tagField = document.getElementById('tag');
const imgLinkField = document.getElementById('imgLink');

saveButton.addEventListener('click', (event) => {
  event.preventDefault();

  const titleValue = titleField.value;
  const aboutValue = aboutField.value;
  const linkValue = linkField.value;
  const tagValue = tagField.value;
  const imgLinkValue = imgLinkField.value;

  const collectionValue = document.getElementById('collections').value;

  const { db, ref, set, push } = firebase;

  push(ref(db, collectionValue), {
    title: titleValue,
    about: aboutValue,
    link: linkValue,
    tag: tagValue,
    imgLink: imgLinkValue,

  }).then(() => {
    titleField.value = '';
    aboutField.value = '';
    linkField.value = '';
    tagField.value = '';
    imgLinkField.value = '';
  }).catch((error) => {
    console.error(error);
  });
});



function loadPosts() {
  const { db, ref, onValue } = firebase;


  onValue(ref(db, collectionValue), (snapshot) => {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();

      const postCard = document.createElement('div');
      postCard.classList.add('post-card');

      const postTitle = document.createElement('h3');
      postTitle.textContent = post.title;
      postTitle.classList.add('card-title');

      const postAbout = document.createElement('p');
      postAbout.textContent = post.about;
      postTitle.classList.add('card-about');

      const postLink = document.createElement('a');
      postLink.href = post.link;
      postLink.textContent = post.link;
      postTitle.classList.add('card-about');

      const postImg = document.createElement ('img');
      postImg.classList.add('card-img');
      postImg.src = post.imgLink;


      const postTag = document.createElement('div');
      postTag.classList.add('post-tag');
      postTag.textContent = post.tag;

      postCard.appendChild(postTitle);
      postCard.appendChild(postAbout);
      postCard.appendChild(postLink);
      postCard.appendChild(postTag);
      postCard.appendChild(postImg);

      postsContainer.appendChild(postCard);
    });
  });
}

window.onload = async () => {
  await initFirebase();
  loadPosts();
};