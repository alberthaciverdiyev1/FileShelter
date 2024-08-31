document.addEventListener("DOMContentLoaded", function (e) {
    const tableHtml = (data) => {
        let h = '';
        data.map((v, i) => {
            // h += ` <tr class="bg-gray-100 border-b text-black">
            //         <th class="px-1 py-2 text-xs sm:text-base text-center w-8 border border-orange-200">
            //             ${i + 1}
            //         </th>
            //         <td class="px-3 py-2 text-xs sm:text-base border border-orange-200">
            //             ${v.foreignWord}
            //         </td>
            //         <td class="px-3 py-2 text-xs sm:text-base border border-orange-200">
            //             ${v.translatedWord}
            //         </td>
            //         <td class="px-3 py-2 text-xs sm:text-base border border-orange-200">
            //             ${v.description}
            //         </td>
            //         <td class="px-3 py-2 text-xs sm:text-base border border-orange-200 sm: w-8">
            //         <div class="flex flex-row flex-wrap space-x-2">
            //             <button class="py-1 px-3 text-xs sm:text-xs text-white bg-yellow-500 border border-gray-300 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center justify-center">
            //                 <i class="fas fa-edit mr-1"></i>
            //                 <span class="hidden sm:inline">Edit</span>
            //             </button>
            //         </div>
            //     </td>
            //         <td class="px-3 py-2 text-xs sm:text-base border border-orange-200 sm: w-8">
            //         <div class="flex flex-row flex-wrap space-x-2">
            //             <button class="py-1 px-3 text-xs sm:text-xs text-white bg-red-500 border border-gray-300 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-center">
            //                 <i class="fas fa-trash mr-1"></i>
            //                 <span class="hidden sm:inline">Delete</span>
            //             </button>
            //         </div>
            //     </td>
            //     </tr> `;

            h += `
     <tr class="text-start min-w-[340px]  bg-gray-50" ${v._id}>
        <td class="border-l border-r border-b border-orange-200 px-2 py-3 w-9">${i + 1}</td>
        <td class="border-l border-r border-b border-orange-200 px-2 py-3">${v.foreignWord ? v.foreignWord.slice(0, Math.min(13, v.foreignWord.length)) : ''}</td>
        <td class="border-l border-r border-b border-orange-200 px-2 py-3">${v.translatedWord ? v.translatedWord.slice(0, Math.min(13, v.translatedWord.length)) : ''}</td>
        <td class="border-l border-r border-b border-orange-200 px-2 py-3">${v.description ? v.description.slice(0, Math.min(13, v.description.length)) : ''}</td>
        <td class="border-l border-r border-b border-orange-200 px-2 py-3 w-10">
            <div class="flex flex-row flex-wrap space-x-2 justify-center">
                <button class="py-1 px-3 text-xs sm:text-xs text-white bg-red-500 border border-gray-300 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out flex items-center">
                    <i class="fas fa-trash mr-1"></i>
                    <span class="hidden sm:inline">Delete</span>
                </button>
            </div>
        </td>
    </tr>`;
        });


        document.getElementById('dictionary-body').innerHTML = h;
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