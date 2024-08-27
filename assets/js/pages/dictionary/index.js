document.addEventListener("DOMContentLoaded", function (e) {
    const tableHtml = (data) => {
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
                            value="${v.topic}"
                            placeholder="Write Something">
                    </td>
                    <td class="px-2 py-2 sm:px-4 sm:py-2">
                        <input type="text" id="topic-data"
                            class="block p-1 sm:p-2 ps-2 sm:ps-10 text-xs sm:text-sm text-black border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50"
                            value="${v.user.username}"
                            placeholder="Write Something">
                    </td>
                    <td class="px-2 py-2 sm:px-4 sm:py-2">
                        <textarea type="text" id="topic-data"
                            class="block p-1 sm:p-2 ps-2 sm:ps-10 text-xs sm:text-sm text-black border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50">
                            ${v.createdAt}
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
    

    const getTopics = async () => {
        try {
            const response = await fetch('/topics', {
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
    getTopics();

    document.getElementById('add-topic').addEventListener('click', async function () {
        console.log("he's already added");
        let topic = document.getElementById('topic-data').value;

        if (topic !== "") {
            // Clear the input field
            document.getElementById('topic-data').value = "";

            const response = await fetch('/topic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic: topic })
            });

            const responseData = await response.json();
            if (response.status === 201) {
                Swal.fire({
                    title: 'Successfully added',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });

                getTopics();
            } else {
                console.error('Error:', response.status, responseData.message);
            }
        }
    });


});