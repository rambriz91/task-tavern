const returnBtn = document.querySelector('#return-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const questIdEl = document.querySelector('#questId');

//Allows user to cancel specified quest via a DELETE request
const cancelBtnHandler = async () => {
  const questId = questIdEl.value;
  const response = await fetch(`/api/tavernpost/delete/${questId}`, {
    method: 'DELETE',
    body: JSON.stringify(),
    headers: { 'Content-type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/activequests');
  }
};

const returnBtnHandler = async () => {
  document.location.replace('/activequests');
};

returnBtn.addEventListener('click', returnBtnHandler);
cancelBtn.addEventListener('click', cancelBtnHandler);
