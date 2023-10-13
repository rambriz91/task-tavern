const cancelBtn = document.querySelector('#post-quest-cancel');

const cancelBtnHandler = async () => {
  document.location.replace('/');
};

const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value.trim();
  const description = document.querySelector('#dsc-input').value.trim();
  const reward = document.querySelector('#rwd-input').value.trim();
  const quest_type = document.querySelector('#qst-type').value.trim();

  if (title && description && reward && quest_type) {
    const response = await fetch('/api/tavernpost', {
      method: 'POST',
      body: JSON.stringify({ title, description, reward, quest_type }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('#post-quest-form')
  .addEventListener('submit', postFormHandler);

cancelBtn.addEventListener('click', cancelBtnHandler);
