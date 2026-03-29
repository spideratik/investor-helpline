const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const data = new FormData();
  Object.keys(formData).forEach(key => {
    if (key === 'projectPhotos' && formData[key]) {
      for (let i = 0; i < formData[key].length; i++) {
        data.append('photos', formData[key][i]);
      }
    } else {
      data.append(key, formData[key]);
    }
  });

  try {
    // 1. Get the token from localStorage
    const token = localStorage.getItem('token');

    // 2. Send the request with the Authorization header
    await axios.post('http://localhost:5000/api/projects/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Essential for file uploads
        'Authorization': `Bearer ${token}`      // Essential for protected routes
      }
    });

    alert("🚀 Success! Project submitted for verification.");
    window.location.href = "/"; 
  } catch (err) {
    // 3. More detailed error alert
    const errorMsg = err.response?.data?.message || "Submission failed. Are you logged in as a Developer?";
    alert(errorMsg);
    console.error("Submission Error:", err);
  } finally {
    setIsSubmitting(false);
  }
};