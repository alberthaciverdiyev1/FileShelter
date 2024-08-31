document.addEventListener("DOMContentLoaded", function (e) {
    let wordId = '';
    const tableHtml = (data) => {
        let h = '';
        data.map((v, i) => {
            h += `
                <tr class="text-start min-w-[340px] bg-gray-50" data-role="table-row" data-id="${v._id}">
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

        document.querySelectorAll('[data-role="table-row"]').forEach(row => {
            row.addEventListener('dblclick', editInputsAdd);
        });
    }

    function editInputsAdd(event) {
        const row = event.currentTarget;
        wordId = row.getAttribute('data-id');
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            if (index > 0 && index < 4) {
                cell.innerHTML = `<input type="text" value="${cell.textContent}" class="border rounded px-2 py-2 w-full" />`;
            }
            if (index === 4) {
                cell.innerHTML = `<div class="flex flex-row flex-wrap space-x-2 justify-center">
                            <button id="update-word" class="py-1 px-3 text-xs sm:text-xs text-white bg-yellow-500 border border-gray-300 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center">
                                <i class="fas fa-check mr-1"></i>
                                <span class="hidden sm:inline">Update</span>
                            </button>
                        </div>`;
            }
        });

    }

    document.getElementById('update-word')?.addEventListener("click", function() {
        alert("updated");
    });
    


    function handleInputFocusOut(event) {
        const input = event.target;
        const newValue = input.value;
        const cell = input.parentElement;
        const row = cell.parentElement;
        const wordId = row.getAttribute('data-id'); // Retrieve data-id attribute

        // Replace input field with its value
        cell.innerHTML = newValue;

        // Log the new value and row ID
        console.log(`Row ID: ${wordId}, New Value: ${newValue}`);

        // Optionally, perform actions with the new values
        // Example: Send updated value to server (this is optional and depends on your use case)
        // fetch(`/dictionary/update/${wordId}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ field: cell.dataset.field, value: newValue })
        // });
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