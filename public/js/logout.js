const logout = async () => {
  // Make a POST request to destroy the session on the back end
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successfully logged out, redirect to the login page
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};
//Navbar buttons
const postQuest = async () => {
  document.location.replace('/postquest');
};

const activeQuests = async () => {
  document.location.replace('/activequests');
};

const viewProfile = async () => {
  document.location.replace('/profile');
};

document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#post-btn').addEventListener('click', postQuest);
document.querySelector('#active-btn').addEventListener('click', activeQuests);
document.querySelector('#profile-btn').addEventListener('click', viewProfile);
