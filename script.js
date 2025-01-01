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

        fetch('https://api.github.com/repos/sourovps/foodresearchers/contents/submissions/' + studentId + '.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'token YOUR_GITHUB_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'New student submission',
                content: btoa(JSON.stringify(submission))
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.commit) {
                alert('Information submitted successfully!');
            } else {
                alert('Submission failed.');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    reader.readAsDataURL(photo);
});
