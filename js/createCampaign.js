//create-campaign.js

document.querySelectorAll('.category-option').forEach(option => {
    option.addEventListener('click', function () {
        document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});


function setUploadProgress(percent) {
    const fill = document.getElementById('uploadProgressFill');
    const text = document.getElementById('progressText');
    fill.style.width = percent + '%';
    text.innerHTML = ` ${percent}% `;
}


setUploadProgress(50);