// 
//  Image Container Expand Script
const showMoreBtn = document.querySelector('#show-more-btn');
const showLessBtn = document.querySelector('#show-less-btn');

showMoreBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const container = document.querySelector('.container-big');
    container.style.maxHeight = 'none';
    showMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'block';
});

showLessBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const container = document.querySelector('.container-big');
    container.style.maxHeight = '748px';
    showMoreBtn.style.display = 'block';
    showLessBtn.style.display = 'none';
});


// 
//  Modal Script

const modal = document.getElementById('modal');
const btnModal = document.getElementById('btnModal');
const btnSave = document.getElementById('btnSave');
const backBtn = document.getElementById('backBtn');

btnModal.addEventListener('click', () => {
    modal.style.display = 'flex';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target === backBtn) {
    modal.style.display = 'none';
    }
});

// 
// Random Message Script

const messages = [
    "From brother Goran, with love galore,\nEnjoy using our data tool, forevermore.",
    "Data tool in hand, you're ready to rule,\nThanks to brother Goran, you're never a fool.",
    "Here's a tool to use like a pro,\nFrom brother Goran, with love in tow.",
    "Our data tool's the best in the land,\nThanks to brother Goran's helping hand.",
    "Use our data tool, it's oh so cool,\nThanks to brother Goran, it's your secret tool.",
    "Brother Goran's Data tool  \nto keep this project cool.",
    "Safe Data, nothing to betray, \nbrother Goran sending love your way.",
    "From Brother Goran with love, \nthis Data Tool is sent from above."
];


const logosub = document.querySelector('.logosub');
logosub.innerText = `- ${messages[Math.floor(Math.random() * messages.length)]}`;


// 

// Twitte Fields Script

const twitterUsername = document.querySelector('#twitterUsername');
const twitterURL = document.querySelector('#twitterURL');

twitterUsername.addEventListener('input', () => {
  // Remove "@" from the Twitter username
  const username = twitterUsername.value.replace('@', '');

  
  // Set the value of the Twitter URL field
  twitterURL.value = `https://twitter.com/${username}`;
});

const saveButton = document.getElementById('btnSave');
const textStack = document.querySelector('.text-stack');
const buttonStack = document.querySelector('.button-stack');

saveButton.addEventListener('click', () => {
  // perform action to hide button-stack
  buttonStack.style.display = 'none';
  
  // perform action to display checkmark animation
  textStack.innerHTML = `
    <h2>Congratulations!</h2>
    <p>Your form has been submitted successfully &#x2714;</p>
  `;
});
