document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('uploadForm').addEventListener('change', function(e) {
        e.preventDefault();
      
        var formData = new FormData();
        var files = document.getElementById('multiple_files').files;
      
        for (var i = 0; i < files.length; i++) {
          formData.append('files[]', files[i]);
        }
      console.log({formData: formData});
        fetch('/upload-multiple-files', {
          method: 'POST',
          body: formData
        })
        .then(response => response.text())
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
