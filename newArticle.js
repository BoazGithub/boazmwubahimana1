const inputs = document.querySelectorAll('.focused');
const btn = document.getElementById('btnart')
const artform = document.getElementById('articleForm')

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
// btn.addEventListener('click', () => {
//     const confirmArt = confirm("Do you want to publish?");
//         if( confirmArt == true ) {
//                 alert("Article published");
//                 artform.reset()
//                 return true;
//         } else {
//              alert("Article not published")
//                  return false;
//                    }
// });