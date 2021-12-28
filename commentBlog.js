const inputs = document.querySelectorAll('.focused');

inputs.forEach(input => {
    input.addEventListener('focus', focusFunction);
    input.addEventListener('blur', blurFunction);
});

function focusFunction(){
    let parent = this.parentNode;
    parent.classList.add('focus');
}
function blurFunction(){
    let parent = this.parentNode;
    if(this.value == ""){
        parent.classList.remove('focus');
    }
}