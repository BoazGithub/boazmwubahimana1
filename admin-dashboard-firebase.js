
  const db = firebase.firestore();


// ----------reading contacted message ----------------
const contact = document.querySelector(".contact")

db.collection('contact').get().then( snapshot => {
  snapshot.docs.forEach(doc => {
      // converting time string into real time date
    let dat = doc.data().date.toDate()
    let dateObject = new Date(dat)
    let month = dateObject.toLocaleString('en-GB',{month: 'short'});
    let year = dateObject.getFullYear()
    let day = dateObject.toLocaleDateString('en-GB', {day: '2-digit'})
    let dateResult = `${day}-${month}-${year}`
      let cont = `
                <div class="main-contentC">
                    <div class="logo">
                    <img src="../img//avatar.jpg" alt="img">
                    </div>
                    <div class="descriptionC">
                        <h3>${dateResult} by ${doc.data().name}</h3>
                        <h4>Email: ${doc.data().email}</h4>
                        <p>${doc.data().description}</p>
                    </div>
                </div>
      `;
     // console.log(cont)

      contact.innerHTML += cont
  })

})


// ---------------------------------------getting blogs from firebase-----------------------------------------------

    const blogsList = document.querySelector('.blog');
    
    const renderBlog = (doc) => {
        let blogId = doc.id
        const blogItem = `
                        <div class="main-content-blog" id="${blogId}">
                        <div class="description-blog">
                            
                            <div class="flexbox-blog-item">
                                <img src="${doc.data().imageref}" alt="${doc.data().image}">
                                <a href="./article.html#/${blogId}">
                                <h3>${doc.data().title}</h3>
                                </a>
                                
                                <p>${ doc.data().description.substring(0,150) + "..."}</p> 
                            </div>

                        </div>
                    </div>
                        `;
    

      blogsList.innerHTML += blogItem
    }

    db.collection("blogs").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        renderBlog(doc);
        })
    })


//------------------------log user out---------------
  const lgout = document.querySelector("#logout")
  lgout.addEventListener("click",() =>{
      firebase.auth().signOut().then(() => {
          alert("Successfully Loged Out")
          window.location.replace("./login.html")
      }
          
      )
  })


//------------- my account =---------------------
firebase.auth().onAuthStateChanged(user =>{
    if(user){
        readAccount(user)
        
    }
})


const readAccount = (user) => {
    if(user){
        db.collection('userss').doc(user.uid).get().then(doc => {
            let profileContainer = document.querySelector('.profile')
            let accout = `<img src="../img/ami.png" alt="">
                        <h3>${doc.data().user.userName}</h3>
                        <h3>You are <strong>${doc.data().user.userRole}</strong></h3>
                        <h3>Your Email: <span>${user.email}</span></h3>
                        <button id="updatebtn" onclick="updateInfo()">Update Info</button>
            `;
            // console.log(doc.data().user.userName)
            profileContainer.innerHTML = accout
        })
    }
}
const updateInfo = () => {
    document.querySelector(".update").classList.add("active");
}


// ----------------------update user information-----------------------

 ////-----------------------create a project-----------

 document.querySelector('.add-project').addEventListener('click', ()=>{
     document.querySelector('.add-project-modal').style.display = 'block';

     // ----closing adding project modal ----
     document.querySelector('.kclose').addEventListener('click', () => {
         document.querySelector('.add-project-modal').style.display="none"
     })
    // getting data from form
     const projectForm = document.querySelector("#project-form");
     
     projectForm.addEventListener('submit', (e)=>{
         e.preventDefault();
         const text = document.getElementById('project-title').value
         const projectImage = document.getElementById('project-image').files[0]
         const projectDescrip = document.getElementById('project-descript').value
         
         if(text !="" || projectImage !="" || projectDescrip !=""){
             const storageRef = firebase.storage().ref();
             const imageName = storageRef.child(projectImage.name)
             const prImg = imageName.put(projectImage)
     
             prImg.on('state_changed', (snapshot) => {
              const progress = (snapshot.bytesTransfarred/snapshot.totalBytes)*100;
              console.log(progress + "  uploading")
             },(error) => {
               //console.log(error.message)
               alert(error.message)
             }, ()=>{
                prImg.snapshot.ref.getDownloadURL().then( async downloadURL => {
                    let project = {
                        title: text,
                        project_imageUrl:downloadURL,
                        image_name:imageName.location.path,
                        description:projectDescrip
                    };
                    await db.collection('projects').add(project);
                    //console.log("Project created successful " + project.data())
     
                    // reseting form
                    
                    document.querySelector('.add-project-modal').style.display='none';
                    
                    alert("Project successful created!!! ")
                    projectForm.reset()
     
                })
             })
     
             console.log('i\'m project form!')
             
         }else{
             alert("All field must be filled")
         }
     })
 })


// ----------------------------------------create skills--------

document.querySelector('.add').addEventListener('click', () => {
    document.querySelector('.add-skill-modal').style.display ="block";
    // closing a modal
    document.querySelector('.skclose').addEventListener('click', ()=> {
        document.querySelector('.add-skill-modal').style.display ="none";
    })

    const skillsForm = document.getElementById("add-skills-form");
    
    skillsForm.addEventListener('submit', (e)=>{
        const skillImg = document.getElementById("image-skills-field").files[0];
        const skillNames = document.getElementById("skill-add").value;
        e.preventDefault()
        if( skillImg !="" || skillNames != ""){
    
            /// saving image on firebase storage
            const storageRef = firebase.storage().ref()
            const imageName = storageRef.child(skillImg.name);
            const skillImage = imageName.put(skillImg)
    
            skillImage.on("state_changed", (snapshot) => {
           const progress = (snapshot.bytesTransfarred/snapshot.totalBytes)*100;
           console.log(progress + "image is uploading ...")
            }, (error) => {
                alert(error.message)
            }, ()=>{
            skillImage.snapshot.ref.getDownloadURL().then( async downloadURL =>{
                const skill ={
                    skill:skillNames,
                    skillUrl:downloadURL,
                    skillImage:imageName.location.path
                }
                await db.collection('skills').add(skill);
                console.log(downloadURL)
                console.log(skill)
                alert(" skill successfully Uploaded");
                skillsForm.reset()
                document.querySelector('.add-skill-modal').style.display='none';
                })
            })
          
        } else{
                alert("Please fill all fields")
            }
        })
})
    
    // ----------------------------------reading project from firebase-------------------------
      const projectContainer = document.querySelector(".projec");
      const renderProject = (doc) =>{

          let  project=  `
                            <div class="flexbox-pro-item" id="${doc.id}">
                                <img src="${doc.data().project_imageUrl}" alt="${doc.data().image_name}">
                                <a href=""><h3>${doc.data().title}</h3></a>
                                <p>${doc.data().description}</p> 
                                <span><i class="fas fa-trash-alt" id="deletepro" onclick="deleteProject()"></i></span>
                                <span><i class="fas fa-pen-alt" onclick="updateProject()" id="updatepro"></i></span>
                            </div>
                         `;
                         
      projectContainer.innerHTML += project;
      }

    // ------------------------Edit project -----------------
    const updateProject = async ()=>{
                document.querySelector('.login-modal').style.display='flex';

            let projectId = event.target.parentNode.parentNode.id
            
                    
                    
            updatePr(projectId)
                        
                    
            document.querySelector('.close').addEventListener('click', ()=> {
                document.querySelector('.login-modal').style.display='none';
            
            });

        }


    const updatePr = async projectId => {
   
            const form = document.querySelector('.editProjectForm');
            const textForm = document.querySelector('.editProjectFormText');
            let oneProject = await db.collection('projects').doc(projectId).get();
        

            const edtForm = `
            <div class="image-pro"><img src="${oneProject.data().project_imageUrl}" alt=""></div>
            <input type="file" id="projImage" name="" value=""><br>
            <button type ="submit" class="button">Save</button>`;

            form.innerHTML = edtForm;

       const myprForm=document.querySelector('.editProjectForm');

        myprForm.addEventListener('submit', async () => {
                event.preventDefault();
                const projectImg = document.querySelector('#projImage').files[0];
                
                
                    // saving image in firebase storage
                    const storageRef = firebase.storage().ref();
                    const imageName = storageRef.child(projectImg.name);
                    const proImg = imageName.put(projectImg);
            
                    proImg.on('state_changed', snapshot => {
                        const progress = (snapshot.bytesTransfarred/snapshot.totalbytes)*100
                        console.log( progress + "is loading ...  " + projectId )
                    }, error => alert(error.message), async () => {
                        proImg.snapshot.ref.getDownloadURL().then( async downloadURL => {
                        const project = {
                            title:projectTitle,
                            description:projectContent,
                            project_imageUrl: downloadURL,
                            image_name: imageName.location.path
                        };
                        await db.collection('projects').doc(projectId).update(project)
                        alert("Project successful Updated!")
                        document.querySelector('.login-modal').style.display="none"
                        }).catch( err => alert(err.message))
                    })
            }
    );

        const txtForm = `
            <input type="text" id="project-title" name="" value="${oneProject.data().title}"><br>
            <textarea name="text" id="project-description" rows="10">${oneProject.data().description}</textarea>
            <button type ="submit" class="button">Save changes</button>
             `;
            textForm.innerHTML =txtForm;

            textForm.addEventListener('submit', async ()=>{
                event.preventDefault();
                const projectTitle = document.querySelector('#project-title').value;
                const projectContent = document.querySelector('#project-description').value;

                const project = {
                    title:projectTitle,
                    description:projectContent,
                };
                await db.collection('projects').doc(projectId).update(project)
                alert("Project successful Updated!")
            })

}



//---------------------------- getting projects--------------------
      db.collection('projects').onSnapshot(snapshot =>{
          let changes = snapshot.docChanges()
         changes.forEach( change => {

            if(change.type == "added"){
             renderProject(change.doc)
            } else if(change.type == "removed"){
                let div= projectContainer.querySelector(`[id=${change.doc.id}]`)
                projectContainer.removeChild(div)
            }

                            
          })
      });

      ///// this for deleting project------------
    function deleteProject (){                         
            let projectId=event.target.parentNode.parentNode.id
            db.collection('projects').doc(projectId).delete()
            alert("Deleted successfully!!!")
        };
                        
 
//  ---------------------------------reading skills from firebase--------

const skillContainer = document.querySelector('.description-skill')

const renderSkill = (doc) =>{

        let skillItm = document.createElement("div")
            skillItm.setAttribute("class", "flexbox-skill-item")
            skillItm.setAttribute("id", doc.id)

        let skillImge = document.createElement("img")
            skillImge.src = doc.data().skillUrl
            skillImge.alt = doc.data().skillImage

        let pragra = document.createElement("p")
            pragra.textContent = doc.data().skill

        let span1 = document.createElement("span")

        let dIcon =document.createElement("i")
            dIcon.setAttribute("class","fas fa-trash-alt")
            dIcon.setAttribute("id", "delete-skill")
            dIcon.addEventListener('click', ()=>{
                let skillId = dIcon.parentNode.parentNode.id 
                db.collection('skills').doc(skillId).delete()
                alert("Skill successfully deleted!!")
            })
        

        let span2 = document.createElement("span")

        let upIcon =document.createElement("i")
            upIcon.setAttribute("class","fas fa-pen-alt")
            upIcon.setAttribute("id", "update-skill")
            upIcon.addEventListener('click', (e)=>{
               let skillId= e.target.parentNode.parentNode.id
               document.querySelector('.skill-modal').style.display= "block";
                updateSkill(skillId)

            })

        skillContainer.appendChild(skillItm)
        skillItm.appendChild(skillImge)
        skillItm.appendChild(pragra)
        skillItm.appendChild(span1)
        span1.appendChild(dIcon)
        skillItm.appendChild(span2)
        span2.appendChild(upIcon)

    }

//-------------------------------- callback for updating skills-----------------------------

    const updateSkill = async skillId =>{
        const getSkill = await db.collection('skills').doc(skillId).get();


        let skillsForm = `<di><img src="${getSkill.data().skillUrl}" alt=""></div>
        <input type="file" name="" id="skill-image" value="${getSkill.data().skillUrl}"><br>
        <button type="submit" class="button">Save</button>
        `;
        document.querySelector('#updateSkillsFormImage').innerHTML = skillsForm;

        // --------------updating data from form to firebase -----------------
        const skillForm =  document.querySelector('#updateSkillsFormImage');
        skillForm.addEventListener('submit', ()=>{
            const skillImg = document.querySelector('#skill-image').files[0];

                // -------------saving image in storage ------
                const storageRef = firebase.storage().ref();
                const imageName = storageRef.child(skillImg.name)
                const skillImage = imageName.put(skillImg);

                skillImage.on("state_changed", snapshot => {
                    const progress = (snapshot.bytesTransfarred/snapshot.totalbytes)*100;
                    console.log(Math.trunc(progress) + " Uploading....")

                }, 
                error => alert(error.message),
                 async () => {
                    skillImage.snapshot.ref.getDownloadURL().then( async downloadURL => {
                    const skill = {
                        skillUrl: downloadURL,
                        skillImage: imageName.location.path
                    };
                    await db.collection('skills').doc(skillId).update(skill)
                    alert("skill successful Updated!")
                    }).catch( err => alert(err.message))
              })
        })

        let skillsFormName = `
    <input type="text" name="" id="skill-name" value="${getSkill.data().skill}"><br>
    <button type="submit" class="button">Save changes</button>
    `;

    const skillFormName = document.querySelector('#updateSkillsForm');
      skillFormName.innerHTML = skillsFormName;

        skillFormName.addEventListener('submit', ()=> {
            event.preventDefault()
             const skillName = document.querySelector('#skill-name').value;
             if(skillName.length < 3){
                 alert("Skills should be greater than or equal to 3");
                 return false;
             } else{
            const skill = {
                        skill:skillName
                    };
                  db.collection('skills').doc(skillId).update(skill).then( ()=>{
    
                      alert("skill successful Updated!")
                  }).catch( err => console.log(err.message))
                }
        });
        // ---------closing a modal--------------
        document.querySelector('.sclose').addEventListener('click', ()=>{
            document.querySelector('.skill-modal').style.display ="none"

        })


        //alert(skillId)
    }

db.collection('skills').onSnapshot(snapshot => {
    let changes = snapshot.docChanges()
    changes.forEach(change => {
     
     if(change.type == "added"){

         renderSkill(change.doc)
     } else if (change.type == "removed"){
         let div = skillContainer.querySelector(`[id =${change.doc.id}]`)
      skillContainer.removeChild(div)
     }
     
    });
 
 })



// ------deleting skill from firebase----------------------





