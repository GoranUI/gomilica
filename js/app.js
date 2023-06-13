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

    imgLink1: imgLink1Value,
    imgLink2: imgLink2Value,
    imgLink3: imgLink3Value,
    imgLink4: imgLink4Value,
    imgLink5: imgLink5Value,
    imgLink6: imgLink6Value,
    imgLink7: imgLink7Value,
    imgLink8: imgLink8Value,
    imgLink9: imgLink9Value,
    imgLink10: imgLink10Value,
    imgLink11: imgLink11Value,
    imgLink12: imgLink12Value,



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
/*
  const saveButton = document.getElementById('btnSave');
  const textStack = document.querySelector('.text-stack');
  const buttonStack = document.querySelector('.button-stack');

  saveButton.addEventListener('click', () => {
  // perform action to hide button-stack
  buttonStack.style.display = 'none';
  
  // perform action to display checkmark animation
  textStack.innerHTML = `
    <h2>Congratulations!</h2>
    <p>Your form has been submitted successfully &#x2714;</p>`;
  }); */
});



function loadPosts() {
  const { db, ref, onValue } = firebase;
  const collections = ['workspaces', 'user-interfaces' ,'branding', 'dopefolios'];
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';

  let index = 1;
  let posts = [];

for (const collectionValue of collections) {
  onValue(ref(db, collectionValue), (snapshot) => {

    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();
      posts.push(post);

      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      postCard.classList.add(collectionValue);
      
      const postSelectDiv = document.createElement('div');
      postSelectDiv.classList.add('select-div');

      const postSelect = document.createElement('input');
      postSelect.setAttribute("type", "checkbox");
      postSelect.id = 'export-checkbox-' + index++;
      postSelect.classList.add('mark-for-export');

      const postCollectionDiv = document.createElement('div');
      postCollectionDiv.classList.add('collection-div');
      
      const postCollection = document.createElement('p');
      postCollection.textContent = collectionValue;
      postCollection.classList.add('card-collection');

      const postTitleDiv = document.createElement('div');
      postTitleDiv.classList.add('title-div');

      const postTitle = document.createElement('p');
      postTitle.textContent = post.title;
      postTitle.classList.add('card-title');

      const postAboutDiv = document.createElement('div');
      postAboutDiv.classList.add('about-div');
      
      const postAbout = document.createElement('p');
      postAbout.textContent = post.about;
      postAbout.classList.add('card-about');

      const postSlugDiv = document.createElement('div');
      postSlugDiv.classList.add('slug-div');

      const postSlug = document.createElement('p');
      postSlug.textContent = post.slug;
      postSlug.classList.add('card-slug');

      const postTagsDiv = document.createElement('div');
      postTagsDiv.classList.add('tags-div');

      const postTag = document.createElement('p');
      postTag.textContent = post.tag;
      postTag.classList.add('card-tag');

      const postTwitterContainerDiv = document.createElement('div');
      postTwitterContainerDiv.classList.add('tw-div');

      const postTwitterContainer = document.createElement('a');
      postTwitterContainer.href = post.twitterURL;
      postTwitterContainer.classList.add('card-tw-container');

      const postTwitterUsername = document.createElement('p');
      postTwitterUsername.textContent = post.twitterUsername;
      postTwitterUsername.classList.add('card-tw-username');

      const postTwitterImg = document.createElement('img');
      postTwitterImg.src = post.twitterImg;
      postTwitterImg.classList.add('card-tw-img');

      const postTwitterURL = document.createElement('p');
      postTwitterURL.textContent = post.twitterURL;
      postTwitterURL.classList.add('card-tw-url');
    
      const postSocialsContainer = document.createElement('div');
      postSocialsContainer.classList.add('card-social-container');

      const postInstagramURL = document.createElement('a');
      postInstagramURL.href = post.instagramUrl;
      postInstagramURL.classList.add ('iglogo');
      postInstagramURL.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" class="webicon" /></svg>';

      const postWebsiteUrlImage = document.createElement('a');
      postWebsiteUrlImage.href = post.websiteUrl;
      postWebsiteUrlImage.classList.add ('globe');
      postWebsiteUrlImage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" class="webicon" /></svg>';

      const postGearDiv = document.createElement('div');
      postGearDiv.classList.add('gear-div');


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

      const postImageContainer = document.createElement('div');
      postImageContainer.classList.add('card-img-container');
      postImageContainer.id = 'card-img-id';

      const loadImage = src => {
        const img = document.createElement('img');

        if (!src) {
          img.style.display = 'none';
        } else {
          img.src = src;
          img.classList.add('card-img');
        }
        return img;
      };

      const postImgLink1 = loadImage(post.imgLink1);
      const postImgLink2 = loadImage(post.imgLink2);
      const postImgLink3 = loadImage(post.imgLink3);
      const postImgLink4 = loadImage(post.imgLink4);
      const postImgLink5 = loadImage(post.imgLink5);
      const postImgLink6 = loadImage(post.imgLink6);
      const postImgLink7 = loadImage(post.imgLink7);
      const postImgLink8 = loadImage(post.imgLink8);
      const postImgLink9 = loadImage(post.imgLink9);
      const postImgLink10 = loadImage(post.imgLink10);
      const postImgLink11 = loadImage(post.imgLink11);
      const postImgLink12 = loadImage(post.imgLink12);


      const postExpandDiv = document.createElement ('div');
      postExpandDiv.classList.add('expand-div');

      const postExpand = document.createElement ('input');
      postExpand.setAttribute("type", "checkbox");
      postExpand.id = 'expand-checkbox';
      postExpand.classList.add('expand-checkbox');


      postImageContainer.appendChild(postImgLink1);
      postImageContainer.appendChild(postImgLink2);
      postImageContainer.appendChild(postImgLink3);
      postImageContainer.appendChild(postImgLink4);
      postImageContainer.appendChild(postImgLink5);
      postImageContainer.appendChild(postImgLink6);
      postImageContainer.appendChild(postImgLink7);
      postImageContainer.appendChild(postImgLink8);
      postImageContainer.appendChild(postImgLink9);
      postImageContainer.appendChild(postImgLink10);
      postImageContainer.appendChild(postImgLink11);
      postImageContainer.appendChild(postImgLink12);


      postSelectDiv.appendChild(postSelect);
      postCard.appendChild(postSelectDiv);

      postCard.appendChild(postImageContainer);

      postCollectionDiv.appendChild(postCollection);
      postCard.appendChild(postCollectionDiv);

      postTitleDiv.appendChild(postTitle);
      postCard.appendChild(postTitleDiv);
      
      postAboutDiv.appendChild(postAbout);
      postCard.appendChild(postAboutDiv);

      postSlugDiv.appendChild(postSlug);
      postCard.appendChild(postSlugDiv);

      postTagsDiv.appendChild(postTag);
      postCard.appendChild(postTagsDiv);

      postTwitterContainer.appendChild(postTwitterImg);
      postTwitterContainer.appendChild(postTwitterURL);
      postTwitterContainer.appendChild(postTwitterUsername);
      postTwitterContainerDiv.appendChild(postTwitterContainer);
      postCard.appendChild(postTwitterContainerDiv);

      postSocialsContainer.appendChild(postWebsiteUrlImage);
      postSocialsContainer.appendChild(postInstagramURL);
      postCard.appendChild(postSocialsContainer);

      

      postExpandDiv.appendChild(postExpand);
      postCard.appendChild(postExpandDiv);

      postGearDiv.appendChild(postGearItem1);
      postGearDiv.appendChild(postGearItem2);
      postGearDiv.appendChild(postGearItem3);
      postGearDiv.appendChild(postGearItem4);
      postGearDiv.appendChild(postGearItem5);
      postCard.appendChild(postGearDiv);
      
      postsContainer.appendChild(postCard);


      //checkbox expand start

      const checkboxes = document.querySelectorAll('.expand-checkbox');

      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', event => {
          const cardImgCont = checkbox.parentElement.parentElement.querySelector('.card-img-container');
          const parentElement = checkbox.parentElement.parentElement;
          if (checkbox.checked) {
            parentElement.style.height = '260px';
            parentElement.style.alignItems = "flex-start";
            parentElement.style.paddingTop = '4px';
            cardImgCont.style.maxHeight = '240px';
          } else {
            parentElement.style.height = '72px';
            parentElement.style.alignItems = "center";
            parentElement.style.paddingTop = 'unset';
            cardImgCont.style.maxHeight = '64px';
          }
        });
      });
      
      //checkbox expand end


      const btnExport = document.getElementById('btnExport');
      btnExport.onclick = e => {
      const selectedIndices = [];

      const checkboxesExport = document.querySelectorAll('.mark-for-export');

      checkboxesExport.forEach(checkbox => {
        if (checkbox.checked) {
          const index = Number(checkbox.id.substring('export-checkbox-'.length)) - 1;
          selectedIndices.push(index);
        }
      });

      let data = 'Name / Title,About the person, Slug, Image 1, Image 2, Image 3, Image 4, Image 5, Image 6, Image 7, Image 8, TwitterID, Website, Twitter Profile URL, Twitter Image, Filter\n'; //nabroj item field id sa framera
      for (const index of selectedIndices)
        data += convertToCsv(posts[index]);
        const timestamp = formatDatetime(new Date());
        saveTextAsFile(data, 'gomilica-export-' +  timestamp + '.csv', 'text/plain');
};

    });
  });
}
 
}

function formatDatetime(d) {
  return d.getDate() +
    '-' + (d.getMonth() + 1) +
    '-' + d.getFullYear() +
    '-' + d.getHours() +
    '-' + d.getMinutes();
}

// Shamelessly stolen from:
// https://www.amitmerchant.com/create-and-download-text-files-using-javascript/

function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
  let textFileAsBlob = new Blob([textToWrite], { type: fileType });
  let downloadLink = document.createElement('a');
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = 'Download File';

  if (window.webkitURL != null) {
      downloadLink.href = window.webkitURL.createObjectURL(
          textFileAsBlob
      );
  } else {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function convertToCsv(post) {
  return [post.title, post.about, post.slug, post.imgLink1, post.imgLink2, post.imgLink3, post.imgLink4, post.imgLink5, post.imgLink6, post.imgLink7, post.imgLink8, post.twitterUsername, post.websiteUrl, post.twitterURL, post.twitterImg, post.tag].join(',') + '\n'; // u taj niz dodam tim redom item fieldove
}






window.onload = async () => {
  await initFirebase();
  loadPosts();
};