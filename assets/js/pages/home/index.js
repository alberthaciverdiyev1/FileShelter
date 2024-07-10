document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox]", {

    });

    const loader = `
  <div class="loader">
  <span class="load"></span>
  </div>
  `;
    //   <span class="loader-text">loading</span>

    const htmlView = (data) => {
        let h = '';
        data.forEach(file => {
            console.log({file});
            h += `
            <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-200 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white group">
              <div class="relative overflow-hidden bg-cover bg-no-repeat h-full">
                  <a href="/uploads/${file.path}"  data-fancybox="gallery" data-lg-size="1920-1080">
                       <img class="rounded-lg h-full w-full object-cover" src="/uploads/thumbnails/${file.path}" alt="${file.filename}" />
                        <p class="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded hidden group-hover:block">${file.filename}</p>
                  </a>
              </div>
            </div>
       `;
        });
        document.getElementById('file-list').innerHTML = h;
    }

    const loadFiles = () => {
        fetch('/get-files')
            .then(response => response.json())
            .then(d => {
                console.log(d);
                if (d.status === 200) {
                    htmlView(d.data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    loadFiles();

    document.getElementById('multiple_files').addEventListener('change', function (e) {
        var formData = new FormData();
        var files = e.target.files;
        document.getElementById('upload-button').innerHTML = loader;

        for (var i = 0; i < files.length; i++) { formData.append('files', files[i]); } fetch('/upload-multiple-files', {
            method: 'POST', body: formData
        }).then(response => response.json()).then(d => {
            if (d.status === 201) {
                document.getElementById('upload-button').innerHTML = "Upload";

            }
        }).catch(error => {
            console.error('Error:', error);
        });
    });
});