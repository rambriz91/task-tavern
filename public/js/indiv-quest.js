const acceptBtn = document.querySelector('.accept-btn');
const exitBtn = document.querySelector('.exit-btn');
const questId = document.querySelector('#questId');

//Allows user to accept quests from the tavern board after accessing the individual quest view.
const acceptBtnHandler = async () => {
  const response = await fetch(`/api/tavernpost/${questId.value}`, {
    method: 'PUT',
    body: JSON.stringify(),
    headers: { 'Content-type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
//exits user from individual view to tavern board
const exitBtnHandler = async () => {
  document.location.replace('/');
};

exitBtn.addEventListener('click', exitBtnHandler);
acceptBtn.addEventListener('click', acceptBtnHandler);
