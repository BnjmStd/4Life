const dropzoneBox = document.getElementsByClassName('dropzone-box')[0];
const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");

const inputElement = inputFiles[0];
const dropzoneElement = inputElement.closest(".dropzone-area");

inputElement.addEventListener("change", (e) => {
    if(inputElement.files.length){
        updateDropzoneFileList(dropzoneElement, inputElement.files[0]);
    }
});

const updateDropzoneFileList = (dropzoneElement, file) => {
    let dropzoneFileMessage = dropzoneElement.querySelector(".message");
    dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
};

dropzoneBox.addEventListener("reset", (e) => {
    let dropzoneFileMessage = dropzoneBox.querySelector(".message");
    dropzoneFileMessage.innerHTML = "No archivos selec";
});

dropzoneBox.addEventListener("submit", (e) => {
    e.preventDefault();
    const myFile = document.getElementById("upload-file");
    console.log(myFile.files[0]);
});
