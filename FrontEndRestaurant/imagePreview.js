 // Select the file input and image preview elements
 const imageUpload = document.getElementById('imageUpload');
 const imagePreview = document.getElementById('imagePreview');
 const previewImage = imagePreview.querySelector('.imageDisplay');
 const previewDefaultText = imagePreview.querySelector('.defaultText');

 // Listen for the file input change event
 imageUpload.addEventListener('change', function() {
     const file = this.files[0];
     console.log('File selected:', file);

     if (file) {
         const reader = new FileReader();

         reader.addEventListener("load", function() {
             console.log('File loaded:', this.result);
             previewDefaultText.style.display = "none";
             previewImage.style.display = "block";
             previewImage.setAttribute("src", this.result);
         });

         reader.readAsDataURL(file);
     } else {
         console.log('No file selected');
         previewDefaultText.style.display = null;
         previewImage.style.display = "none";
         previewImage.setAttribute("src", "");
     }
 });