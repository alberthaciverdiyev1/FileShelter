document.addEventListener("DOMContentLoaded", function (e) {
    const tableHtml = (data) => {
        console.log({data});
        
        let h = '';
        data.map((v, i) => {
            h += `
                <tr class="bg-gray-100 border-b text-black">
                    <th scope="row" class="px-3 py-3 font-medium whitespace-nowrap text-center">
                        ${i + 1}
                    </th>
                    <td class="px-2 py-2 sm:px-4 sm:py-2">
                        <input type="text" id="topic-data"
                            class="block p-1 sm:p-2 ps-2 sm:ps-10 text-xs sm:text-sm text-black border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50"
                            value="${v.foreignWord}"
                            placeholder="Write Something">
                    </td>
                    <td class="px-2 py-2 sm:px-4 sm:py-2">
                        <input type="text" id="topic-data"
                            class="block p-1 sm:p-2 ps-2 sm:ps-10 text-xs sm:text-sm text-black border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50"
                            value="${v.translatedWord}"
                            placeholder="Write Something">
                    </td>
                    <td class="px-2 py-2 sm:px-4 sm:py-2">
                        <textarea type="text" id="topic-data"
                            class="block p-1 sm:p-2 ps-2 sm:ps-10 text-xs sm:text-sm text-black border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50">
                            ${v.description}
\                            </textarea>

                    </td>
                    <td class="px-2 py-2 sm:px-4 sm:py-2">
                        <a href="#" class="font-medium text-yellow-600 hover:underline">Edit</a>
                        <a href="#" class="font-medium text-red-600 hover:underline">Delete</a>
                    </td>
                </tr>`;
        });

        document.getElementById('topics-table-body').innerHTML = h;
    }


    const getDictionary = async () => {
        try {
            const response = await fetch('/dictionary-list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log({ data });
            tableHtml(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    getDictionary();

    document.getElementById('add-word').addEventListener('click', async function () {
        let data = {
            foreignWord: document.getElementById('foreign-word').value,
            translatedWord: document.getElementById('translated-word').value,
            description: document.getElementById('description').value
        }

        if (data.foreignWord && data.translatedWord) {
            document.getElementById('foreign-word').value = "";
            document.getElementById('translated-word').value = "";
            document.getElementById('description').value = "";

            const response = await fetch('/add-word', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data })
            });

            const responseData = await response.json();
            if (response.status === 201) {
                Swal.fire({
                    title: 'Successfully added',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });

                getDictionary();
            } else {
                console.error('Error:', response.status, responseData.message);
            }
        }
    });


});