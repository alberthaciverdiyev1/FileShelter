document.addEventListener("DOMContentLoaded", function (e) {

    const getTopic = async () => {
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
            console.log({data});
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
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
                  
                getTopic();
            } else {
                console.error('Error:', response.status, responseData.message);
            }
        }
    });
    

});