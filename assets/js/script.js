document.addEventListener('DOMContentLoaded', () => {
  const colorDisplay = document.getElementById('color-display');
  const errorMessage = document.getElementById('error-message');
  const colorForm = document.getElementById('color-form');

  colorForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const red = document.getElementById('red').value;
    const green = document.getElementById('green').value;
    const blue = document.getElementById('blue').value;

    try {
      const url = `https://color.serialif.com/rgb=${red},${green},${blue}`;
      console.log('Fetching color from URL:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log('API Response:', data);

      if (data.status === 'error') {
        showError(data.error.message);
      } else {
        const hex = data.base.hex;
        displayColor(hex);
      }
    } catch (error) {
      console.error('Error fetching color:', error);
      showError('An error occurred while fetching the color.');
    }
  });

  const displayColor = (color) => {
    colorDisplay.style.backgroundColor = color;
    colorDisplay.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  };

  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    colorDisplay.classList.add('hidden');
  };
});