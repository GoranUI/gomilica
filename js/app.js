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

const twitterUsernameField = document.getElementById('twitterUsername');
const twitterURLField = document.getElementById('twitterURL');
const twitterImgField = document.getElementById('twitterImg');
const instagramUrlField = document.getElementById('instagramUrl');
const websiteUrlField = document.getElementById('websiteUrl');

const slugField = document.getElementById('slug');
const tagField = document.getElementById('filter-tag');

const gearItem1Field = document.getElementById('gear1');
const gearItem2Field = document.getElementById('gear2');
const gearItem3Field = document.getElementById('gear3');
const gearItem4Field = document.getElementById('gear4');
const gearItem5Field = document.getElementById('gear5');

const imgLink1Field = document.getElementById('imgLink1');
const imgLink2Field = document.getElementById('imgLink2');
const imgLink3Field = document.getElementById('imgLink3');
const imgLink4Field = document.getElementById('imgLink4');
const imgLink5Field = document.getElementById('imgLink5');
const imgLink6Field = document.getElementById('imgLink6');
const imgLink7Field = document.getElementById('imgLink7');
const imgLink8Field = document.getElementById('imgLink8');
const imgLink9Field = document.getElementById('imgLink9');
const imgLink10Field = document.getElementById('imgLink10');
const imgLink11Field = document.getElementById('imgLink11');
const imgLink12Field = document.getElementById('imgLink12');





saveButton.addEventListener('click', (event) => {
  event.preventDefault();

  const titleValue = titleField.value;
  const aboutValue = aboutField.value;

  const tagValue = tagField.value;
  const slugValue = slugField.value;

  const twitterUsernameValue =  twitterUsernameField.value;
  const twitterURLValue =  twitterURLField.value;
  const twitterImgValue =  twitterImgField.value;
  const instagramUrlValue =  instagramUrlField.value;
  const websiteUrlValue =  websiteUrlField.value;

  const gear1Value = gearItem1Field.value;
  const gear2Value = gearItem2Field.value;
  const gear3Value = gearItem3Field.value;
  const gear4Value = gearItem4Field.value;
  const gear5Value = gearItem5Field.value;


  const imgLink1Value = imgLink1Field.value;
  const imgLink2Value = imgLink2Field.value;
  const imgLink3Value = imgLink3Field.value;
  const imgLink4Value = imgLink4Field.value;
  const imgLink5Value = imgLink5Field.value;
  const imgLink6Value = imgLink6Field.value;
  const imgLink7Value = imgLink7Field.value;
  const imgLink8Value = imgLink8Field.value;
  const imgLink9Value = imgLink9Field.value;
  const imgLink10Value = imgLink10Field.value;
  const imgLink11Value = imgLink11Field.value;
  const imgLink12Value = imgLink12Field.value;


  const collectionValue = document.getElementById('collections').value;

  const { db, ref, set, push } = firebase;

  push(ref(db, collectionValue), {
    title: titleValue,
    about: aboutValue,

    slug: slugValue,
    tag: tagValue,

    img1Link: imgLink1Value,
    twitterUsername: twitterUsernameValue,
    twitterURL: twitterURLValue,
    twitterImg: twitterImgValue,
    instagramUrl: instagramUrlValue,
    websiteUrl: websiteUrlValue,

    gear1: gear1Value,
    gear2: gear2Value,
    gear3: gear3Value,
    gear4: gear4Value,
    gear5: gear5Value,

    image1: imgLink1Value,
    image2: imgLink2Value,
    image3: imgLink3Value,
    image4: imgLink4Value,
    image5: imgLink5Value,
    image6: imgLink6Value,
    image7: imgLink7Value,
    image8: imgLink8Value,
    image9: imgLink9Value,
    image10: imgLink10Value,
    image11: imgLink11Value,
    image12: imgLink12Value,



  }).then(() => {
    titleField.value = '';
    aboutField.value = '';

    slugField.value = '';
    tagField.value = '';

    twitterUsernameField.value = '';
    twitterImgField.value = '';
    twitterURLField.value = '';
    instagramUrlField.value = '';
    websiteUrlField.value = '';

    gearItem1Field.value = '';
    gearItem2Field.value = '';
    gearItem3Field.value = '';
    gearItem4Field.value = '';
    gearItem5Field.value = '';

    imgLink1Field.value = '';
    imgLink2Field.value = '';
    imgLink3Field.value = '';
    imgLink4Field.value = '';
    imgLink5Field.value = '';
    imgLink6Field.value = '';
    imgLink7Field.value = '';
    imgLink8Field.value = '';
    imgLink9Field.value = '';
    imgLink10Field.value = '';
    imgLink11Field.value = '';
    imgLink12Field.value = '';
    
  }).catch((error) => {
    console.error(error);
  });

  
});



function loadPosts() {
  const { db, ref, onValue } = firebase;
  const collections = ['workspaces', 'user-interfaces' ,'branding', 'dopefolios'];
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';

for (const collectionValue of collections) {
  onValue(ref(db, collectionValue), (snapshot) => {
    

    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();

      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      

      const postTitle = document.createElement('h2');
      postTitle.textContent = post.title;
      postTitle.classList.add('card-title');

      const postAbout = document.createElement('p');
      postAbout.textContent = post.about;
      postAbout.classList.add('card-about');

      const postSlug = document.createElement('p');
      postSlug.textContent = post.slug;
      postSlug.classList.add('card-slug');

      const postTag = document.createElement('p');
      postTag.textContent = post.tag;
      postTag.classList.add('card-tag');

      const postTwitterUsername = document.createElement('p');
      postTwitterUsername.textContent = post.twitterUsername;
      postTwitterUsername.classList.add('card-tw-username');

      const postTwitterImg = document.createElement('p');
      postTwitterImg.textContent = post.twitterImg;
      postTwitterImg.classList.add('card-tw-img');

      const postTwitterURL = document.createElement('p');
      postTwitterURL.textContent = post.twitterURL;
      postTwitterURL.classList.add('card-tw-url');

      const postInstagramURL = document.createElement('p');
      postInstagramURL.textContent = post.instagramUrl;
      postInstagramURL.classList.add('card-ig-url');

      const postWebsiteUrl = document.createElement('p');
      postWebsiteUrl.textContent = post.websiteUrl;
      postWebsiteUrl.classList.add('card-web-url');

      const postGearItem1 = document.createElement('p');
      postGearItem1.textContent = post.gearItem1;
      postGearItem1.classList.add('card-gear');

      const postGearItem2 = document.createElement('p');
      postGearItem2.textContent = post.gearItem2;
      postGearItem2.classList.add('card-gear');

      const postGearItem3 = document.createElement('p');
      postGearItem3.textContent = post.gearItem3;
      postGearItem3.classList.add('card-gear');

      const postGearItem4 = document.createElement('p');
      postGearItem4.textContent = post.gearItem4;
      postGearItem4.classList.add('card-gear');

      const postGearItem5 = document.createElement('p');
      postGearItem5.textContent = post.gearItem5;
      postGearItem5.classList.add('card-gear');

      const postImgLink1 = document.createElement('p');
      postImgLink1.textContent = post.imgLink1;
      postImgLink1.classList.add('card-img');
      
      const postImgLink2 = document.createElement('p');
      postImgLink2.textContent = post.imgLink2;
      postImgLink2.classList.add('card-img');

      const postImgLink3 = document.createElement('p');
      postImgLink3.textContent = post.imgLink3;
      postImgLink3.classList.add('card-img');

      const postImgLink4 = document.createElement('p');
      postImgLink4.textContent = post.imgLink4;
      postImgLink4.classList.add('card-img');

      const postImgLink5 = document.createElement('p');
      postImgLink5.textContent = post.imgLink5;
      postImgLink5.classList.add('card-img');

      const postImgLink6 = document.createElement('p');
      postImgLink6.textContent = post.imgLink6;
      postImgLink6.classList.add('card-img');
      
      const postImgLink7 = document.createElement('p');
      postImgLink7.textContent = post.imgLink7;
      postImgLink7.classList.add('card-img');

      const postImgLink8 = document.createElement('p');
      postImgLink8.textContent = post.imgLink8;
      postImgLink8.classList.add('card-img');

      const postImgLink9 = document.createElement('p');
      postImgLink9.textContent = post.imgLink9;
      postImgLink9.classList.add('card-img');
      
      const postImgLink10 = document.createElement('p');
      postImgLink10.textContent = post.imgLink10;
      postImgLink10.classList.add('card-img');
      
      const postImgLink11 = document.createElement('p');
      postImgLink11.textContent = post.imgLink11;
      postImgLink11.classList.add('card-img');
      
      const postImgLink12 = document.createElement('p');
      postImgLink12.textContent = post.imgLink12;
      postImgLink12.classList.add('card-img');


      postCard.appendChild(postTitle);
      postCard.appendChild(postAbout);
      postCard.appendChild(postSlug);
      postCard.appendChild(postTag);

      postCard.appendChild(postTwitterImg);
      postCard.appendChild(postTwitterURL);
      postCard.appendChild(postWebsiteUrl);
      postCard.appendChild(postInstagramURL);

      postCard.appendChild(postGearItem1);
      postCard.appendChild(postGearItem2);
      postCard.appendChild(postGearItem3);
      postCard.appendChild(postGearItem4);
      postCard.appendChild(postGearItem5);

      postCard.appendChild(postImgLink1);
      postCard.appendChild(postImgLink2);
      postCard.appendChild(postImgLink3);
      postCard.appendChild(postImgLink4);
      postCard.appendChild(postImgLink5);
      postCard.appendChild(postImgLink6);
      postCard.appendChild(postImgLink7);
      postCard.appendChild(postImgLink8);
      postCard.appendChild(postImgLink9);
      postCard.appendChild(postImgLink10);
      postCard.appendChild(postImgLink11);
      postCard.appendChild(postImgLink12);

    postsContainer.appendChild(postCard);

    });
  });
}
 
}

window.onload = async () => {
  await initFirebase();
  loadPosts();
};