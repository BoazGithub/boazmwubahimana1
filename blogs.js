

document.getElementById('article').addEventListener('click',  ()=>{
    console.log("clicked!!!")
document.querySelector('.article-modal').style.display='flex';
});

document.querySelector('.close').addEventListener('click', ()=> {
    document.querySelector('.article-modal').style.display='none';

});