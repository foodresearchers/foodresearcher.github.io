document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const batch = document.getElementById('batch').value;
    const researchInterest = document.getElementById('researchInterest').value;
    const photo = document.getElementById('photo').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const base64Image = reader.result.split(',')[1];

        const submission = {
            name,
            studentId,
            batch,
            researchInterest,
            photo: base64Image
        };

        fetch(`https://api.github.com/repos/sourovps/foodresearchers/contents/submissions/${studentId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'New student submission',
                content: btoa(JSON.stringify(submission))
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Information submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Submission failed.');
        });
    };

    reader.readAsDataURL(photo);
});
