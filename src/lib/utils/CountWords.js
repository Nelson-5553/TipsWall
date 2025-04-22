const textarea = document.getElementById('content');
const charCount = document.getElementById('charCount');
const maxChars = 500; // Cambia este valor al máximo de caracteres que desees permitir

textarea.addEventListener('input', () => {
  const remaining = maxChars - textarea.value.length;
  charCount.textContent = remaining;
});