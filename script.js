// Ambil element yang diperlukan
const form = document.getElementById("age-form");
const birthdateInput = document.getElementById("birthdate");
const resultDiv = document.getElementById("result");

// Inisialisasi Flatpickr
flatpickr(birthdateInput, {
  dateFormat: "d/m/Y",
  maxDate: "today",
  defaultDate: null,
});

// Fungsi untuk hitung usia dengan Luxon
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = birthdateInput.value;
  if (!inputValue) {
    resultDiv.textContent = "Please enter your birth date.";
    return;
  }

  // Format dari flatpickr: d/m/Y
  const [day, month, year] = inputValue.split("/");
  const birthDate = luxon.DateTime.fromObject({
    day: parseInt(day),
    month: parseInt(month),
    year: parseInt(year),
  });

  const now = luxon.DateTime.now();

  if (birthDate > now) {
    resultDiv.textContent = "Birth date cannot be in the future.";
    return;
  }

  const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();
  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  resultDiv.innerHTML = `
    <strong>Your Age:</strong><br>
    ${years} years, ${months} months, and ${days} days
  `;
});
