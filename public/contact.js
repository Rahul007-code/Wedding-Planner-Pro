document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = {
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    wedding_date: this.wedding_date.value,
    service: this.service.value,
    message: this.message.value
  };

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
  } catch (err) {
    alert('Failed to submit form');
    console.error(err);
  }
});
