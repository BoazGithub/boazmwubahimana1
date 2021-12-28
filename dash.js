const linkCont = document.querySelectorAll(".navs a");
const conten = document.querySelectorAll(".content");
const navBar = document.querySelector(".menu-bar");
const nav_menu = document.querySelector(".user-profile-l");
const mobile_menu = document.querySelectorAll(".user-profile-l ul li a");
const check = document.getElementById("check")
const inputs = document.querySelectorAll('.focused');
const deleteIcon = document.querySelectorAll('#delete');
const updateSkiIcon = document.querySelectorAll('#update-skill');
const proDeleteIcon = document.querySelectorAll('#deletepro');
// const modal = document.querySelector('.modal-content');
const editProject = document.querySelectorAll('#updatepro');

const skclose = document.querySelector('.skclose');
const kclose = document.querySelector('.kclose');
const addSkills = document.querySelector('.add');
const addProjects = document.querySelector('.add-project');
const addSkillModal = document.querySelector('.add-skill-modal');
const addProjectModal = document.querySelector('.add-project-modal');





navBar.addEventListener("click", () =>{
    navBar.classList.toggle("move");
    nav_menu.classList.toggle("move");
})


mobile_menu.forEach((link) => {
    link.addEventListener('click', ()=>{
        // console.log(link);
      navBar.classList.toggle("move");
      nav_menu.classList.toggle("move");  
    })
})

linkCont.forEach(link=> {
    link.addEventListener('click', ()=>{
        document.querySelector(".navs li.active").classList.remove("active");
        document.querySelector(".content.active").classList.remove("active");
        const parentEl = link.parentElement;
        parentEl.classList.add("active");
        const index = [...parentEl.parentElement.children].indexOf(parentEl);
        const conte = [...conten].filter(elem =>elem.getAttribute("data-index")==index);
        conte[0].classList.add("active");
    });
});


document.getElementById("updatebtn").addEventListener('click', () => {
    document.querySelector(".update").classList.add("active");
})



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

// deleteIcon.forEach(icon=>{
//     icon.addEventListener('click',()=> {
//         const confirmArt = confirm("Do you want to delete this skill?");
//         if( confirmArt == true ) {
//                 alert("Your skill successsful deleted.");
//                 return true;
//         } else {
//              alert("Skill not delete!")
//                  return false;
//                    }
//     })
// })

proDeleteIcon.forEach(icon=>{
    icon.addEventListener('click',()=> {
        const confirmArt = confirm("Do you want to delete this project?");
        if( confirmArt == true ) {
                alert("Your project successsful deleted.");
                return true;
        } else {
             alert("Project not delete!")
                 return false;
                   }
    })
})


// getting project data and render it in update form
editProject.forEach(icon =>{
    icon.addEventListener('click', (e)=>{
        const docscontent = e.target.parentNode.parentNode;
  const docsItem = docscontent.children
   const imag = docsItem[0]
   const head = docsItem[1]
   const descr = docsItem[2]
   const h = head.children
   const title = h[0].innerHTML

   const form = document.querySelector('.editProjectForm');



   const edtForm = `<input type="file" id="projImage" name="" value="${imag.src}"><br>
   <input type="text" name="" value="${title}"><br>
   <textarea name="text" id="" rows="15" >${descr.textContent}</textarea>
   <button class="button">Update</button>`;

   form.innerHTML = edtForm;
        
            document.querySelector('.login-modal').style.display='flex';
            
            
        
            document.querySelector('.close').addEventListener('click', ()=> {
                document.querySelector('.login-modal').style.display='none';
            
            });
        
    })
})

// getting skills data and render it in update form

updateSkiIcon.forEach(icon =>{
    icon.addEventListener('click', (e)=>{

        let getSkill = e.target.parentNode.parentNode;
        const skillItems = getSkill.children
        const skillImage = skillItems[0].src
        const skillContent = skillItems[1].textContent
        


        let skillsForm = `
        <input type="file" name="${skillImage}" value="${skillImage}"><br>
        <input type="text" name="" value="${skillContent}"><br>
        <button class="button">Update</button>
        `
        console.log(skillsForm)

        document.querySelector('.skill-modal').style.display='flex';
        document.querySelector('#updateSkillsForm').innerHTML = skillsForm

            // console.log(modal)
            
        
            document.querySelector('.sclose').addEventListener('click', ()=> {
                document.querySelector('.skill-modal').style.display='none';
            
            });
        
    });
});




addSkills.addEventListener('click', ()=>{
    document.querySelector('.add-skill-modal').style.display='flex';
})

    skclose.addEventListener('click', ()=> {
        document.querySelector('.add-skill-modal').style.display='none';
    
    });

// })

//

addProjects.addEventListener('click', ()=>{
    document.querySelector('.add-project-modal').style.display='flex';
    console.log("modal")
})

    kclose.addEventListener('click', ()=> {
        document.querySelector('.add-project-modal').style.display='none';
    
    })