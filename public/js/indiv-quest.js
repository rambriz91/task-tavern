const acceptBtn = document.querySelector('.accept-btn');
const exitBtn = document.querySelector('.exit-btn');
const questId = document.querySelector('#questId');

const exitBtnHandler = async () => {
  document.location.replace('/');
};

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

exitBtn.addEventListener('click', exitBtnHandler);
acceptBtn.addEventListener('click', acceptBtnHandler);