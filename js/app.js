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
  });

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

  let index = 1;
  let posts = [];

for (const collectionValue of collections) {
  onValue(ref(db, collectionValue), (snapshot) => {

    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();
      posts.push(post);

      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      
      const postSelectDiv = document.createElement('div');
      postSelectDiv.classList.add('select-div');

      const postSelect = document.createElement('input');
      postSelect.setAttribute("type", "checkbox");
      postSelect.id = 'export-checkbox-' + index++;
      postSelect.classList.add('mark-for-export');

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

      const postTwitterContainer = document.createElement('div');
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
      postInstagramURL.innerHTML = '';

      const postWebsiteUrlImage = document.createElement('a');
      postWebsiteUrlImage.href = post.websiteUrl;
      postWebsiteUrlImage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="webicon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>';

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

      const postImgLink1 = document.createElement('img');
      postImgLink1.src = post.imgLink1;
      postImgLink1.classList.add('card-img');
      
      const postImgLink2 = document.createElement('img');
      postImgLink2.src = post.imgLink2;
      postImgLink2.classList.add('card-img');

      const postImgLink3 = document.createElement('img');
      postImgLink3.src = post.imgLink3;
      postImgLink3.classList.add('card-img');

      const postImgLink4 = document.createElement('img');
      postImgLink4.src = post.imgLink4;
      postImgLink4.classList.add('card-img');

      const postImgLink5 = document.createElement('img');
      postImgLink5.src = post.imgLink5;
      postImgLink5.classList.add('card-img');

      const postImgLink6 = document.createElement('img');
      postImgLink6.src = post.imgLink6;
      postImgLink6.classList.add('card-img');
      
      const postImgLink7 = document.createElement('img');
      postImgLink7.src = post.imgLink7;
      postImgLink7.classList.add('card-img');

      const postImgLink8 = document.createElement('img');
      postImgLink8.src = post.imgLink8;
      postImgLink8.classList.add('card-img');

      const postImgLink9 = document.createElement('img');
      postImgLink9.src = post.imgLink9;
      postImgLink9.classList.add('card-img');
      
      const postImgLink10 = document.createElement('img');
      postImgLink10.src = post.imgLink10;
      postImgLink10.classList.add('card-img');
      
      const postImgLink11 = document.createElement('img');
      postImgLink11.src = post.imgLink11;
      postImgLink11.classList.add('card-img');
      
      const postImgLink12 = document.createElement('img');
      postImgLink12.src = post.imgLink12;
      postImgLink12.classList.add('card-img');

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
      postCard.appendChild(postTwitterContainer);

      postSocialsContainer.appendChild(postWebsiteUrlImage);
      postSocialsContainer.appendChild(postInstagramURL);
      postCard.appendChild(postSocialsContainer);

      postGearDiv.appendChild(postGearItem1);
      postGearDiv.appendChild(postGearItem2);
      postGearDiv.appendChild(postGearItem3);
      postGearDiv.appendChild(postGearItem4);
      postGearDiv.appendChild(postGearItem5);
      postCard.appendChild(postGearDiv);

      postExpandDiv.appendChild(postExpand);
      postCard.appendChild(postExpandDiv);
      
      postsContainer.appendChild(postCard);


      //checkbox expand start

      const checkboxes = document.querySelectorAll('.expand-checkbox');

      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', event => {
          const parentElement = checkbox.parentElement.parentElement;
          if (checkbox.checked) {
            parentElement.style.height = '400px';
          } else {
            parentElement.style.height = '72px';
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

      let data = 'title,about\n'; //nabroj item field id sa framera
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
  return [post.title, post.about].join(',') + '\n'; // u taj niz dodam tim redom item fieldove
}




window.onload = async () => {
  await initFirebase();
  loadPosts();
};