document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('multiple_files').addEventListener('change', function(e) {
      var formData = new FormData();
      var files = e.target.files;

      for (var i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
      }

      // FormData içeriğini kontrol etme
      for (var pair of formData.entries()) {
          console.log({pair});
      }
      // console.log(formData.entries());
      fetch('/upload-multiple-files', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log('Response:', data);
          // İşlem tamamlandığında yapılacak işlemler
      })
      .catch(error => {
          console.error('Error:', error);
          // Hata durumunda yapılacak işlemler
      });
  });
});