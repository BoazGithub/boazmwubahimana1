  

/// -----------------------------------------------getting a single blog-------------------------------------------------
  const db = firebase.firestore();
  const blog = document.querySelector('.post');
  let hr = document.createElement("hr");

const getBlogId = ()=> {
    let link = window.location.href;
    let linkArray = link.split('/');
    let blogId = linkArray.slice(-1).pop()
    return blogId
  }

  const renderBlog = async () => {
   let id = getBlogId()

   let oneBlog = await db.collection("blogs").doc(id).get().catch((err)=> console.log(err))

   firebase.auth().onAuthStateChanged(user=>{
     if(user){
       console.log(user.email)

       if(user.email == "mwubahimanaboaz800@gmail.com"){
    document.querySelector('.edit').style.display= "flex"
    document.querySelector('.delete').style.display= "flex"
    document.querySelector(".nav-list ul li a#new-article").style.display="inline-block"
    document.querySelector(".nav-list ul li a#admin-dash").style.display="inline-block"
    
      
       }else{
        document.querySelector('.edit').style.display= "none"
        document.querySelector('.delete').style.display= "none"
        document.querySelector(".nav-list ul li a#new-article").style.display="none"
        document.querySelector(".nav-list ul li a#admin-dash").style.display="none"


       }
     }else{
      document.querySelector('.edit').style.display= "none"
      document.querySelector('.delete').style.display= "none"
      document.querySelector(".nav-list ul li a#new-article").style.display="none"
      document.querySelector(".nav-list ul li a#admin-dash").style.display="none"


     }
   })

   let date = oneBlog.data().created_at.toDate()
  let dateObject = new Date(date)
  let month = dateObject.toLocaleString('en-GB',{month: 'short'});
  let year = dateObject.getFullYear()
  let day = dateObject.toLocaleDateString('en-GB', {day: '2-digit'})
  let dateResult = `${day}-${month}-${year}`

   let h3 = document.createElement("h3")
      h3.textContent = oneBlog.data().title;

   let h5 = document.createElement("h5");
       h5.textContent = dateResult;

   let editBtn = document.createElement("button");
       editBtn.setAttribute("class", "edit");
       editBtn.textContent = "Edit"
       editBtn.setAttribute("value", "Edit");
       editBtn.getAttribute("value");

       editBtn.addEventListener('click', ()=>{
         let id =  getBlogId()
         const projectModal = document.querySelector('.update-project-modal');

         projectModal.style.display='block';

         document.querySelector('.close').addEventListener('click', ()=>{
          projectModal.style.display='none'
         })
         
         renderUpdateProject(oneBlog)
       
       });

   let deleteBtn = document.createElement("button");
       deleteBtn.setAttribute("class", "delete");
       deleteBtn.textContent = "Delete"
       deleteBtn.setAttribute("value", "Delete");
       deleteBtn.getAttribute("value");
       deleteBtn.addEventListener('click', () =>{
         db.collection('blogs').doc(id).delete()
         alert("Blog deleted successful")
       })

   let image = document.createElement("img");
       image.src = oneBlog.data().imageref;
       image.alt = oneBlog.data().image;

   let p = document.createElement("p");
       p.innerHTML = oneBlog.data().description;

   let br =  document.createElement("br");


   
   blog.appendChild(h3)
   blog.appendChild(h5)
   blog.appendChild(editBtn)
   blog.appendChild(deleteBtn)
   blog.appendChild(image)
   blog.appendChild(p)
   blog.appendChild(br)
   blog.appendChild(hr)
   
  }
  
  renderBlog()
  // ---------------------------------end of create blog-----------

  // ---------------------------------update blog ------------------------------------
  const  renderUpdateProject = (oneBlog)=>{
    const frm = document.querySelector('.editProjectForm')
    const textFrm = document.querySelector('.editProjectFor')
    
    const formProjec = `
        <div><img src="${oneBlog.data().imageref}" alt=""></div>
        <input type="file" id="projImage" name="" value="${ oneBlog.data().image}"><br><br>
        <button type="submit" class="button">Save</button>
    `;
    frm.innerHTML = formProjec

    const textFormProjec = `
        <input type="text" name="" id="project-title" value="${oneBlog.data().title}"><br><br>
        <textarea name="text" id="project-content" rows="20" >${oneBlog.data().description}</textarea><br><br>
        <button type="submit" class="button">Save changes</button>
    `
    textFrm.innerHTML = textFormProjec
  }

  // ----------------edit blog----------------
  function editProject(){
  event.preventDefault()
    const projectImage = document.querySelector('#projImage').files[0];
    
      // ------ save new image ------
      const storageRef = firebase.storage().ref()
      const imageName = storageRef.child(projectImage.name)
      const blogImage = imageName.put(projectImage);

      
      blogImage.on('state_changed',(snapshot) => {
        const progress = (snapshot.bytesTransfarred/snapshot.totalbytes)*100;
        console.log(Math.trunc(progress) + " Uploading....")
      }, (error) => {
        alert(error.message)
      }, () => {
        blogImage.snapshot.ref.getDownloadURL().then( async downloadURL => {
           const blog = {
            imageref: downloadURL,
            image: imageName.location.path
           };
           await db.collection('blogs').doc(id).update(blog)
           alert("Blog successful Updated!")
        }).catch( err => alert(err.message))
      })

  }

  function editTextProject() {

    event.preventDefault();
    const projectTitle = document.querySelector('#project-title').value;
    const projectDescription = document.querySelector('#project-content').value;
    const blog = {
      title:projectTitle,
      description:projectDescription
     }

      db.collection('blogs').doc(id).update(blog).then(()=> {
        alert("Blog successful Updated!")
        // document.querySelector('.update-project-modal').style.display="none"
      })
  }

  //----------------------------------------create comment-----------

  const commentForm = document.querySelector('#comment-form');

  commentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let comment = document.querySelector('#commet').value;
    let date = new Date()
    let blogid = getBlogId()
    
    const commt = {
      name,
      comment,
      imageurl:'',
      date,
      blogid
    };

    // firebase.auth().onAuthStateChanged(user=>{
                  
              if(name!= '' || comment !=''){
                db.collection('comments').add(commt).then(() => {
                  alert("This blog successfully commented")
                  commentForm.reset()
                })
              }else {
                alert("all field must be filled")
              };
          
  })

  //------------------------------------- getting a blog comments---------------------


  let id = getBlogId()
  const renderComment = (doc)=>{
    if(doc.data().imageurl == ""){
      imageurl = "http://www.nretnil.com/avatar/LawrenceEzekielAmos.png"
    } else {
       imageurl = doc.data().imageurl
    }
// converting time string into real time date
  let dat =doc.data().date.toDate()
  let dateObject = new Date(dat)
  let month = dateObject.toLocaleString('en-GB',{month: 'short'});
  let year = dateObject.getFullYear()
  let day = dateObject.toLocaleDateString('en-GB', {day: '2-digit'})
  let dateResult = `${day}-${month}-${year}`

 const comDiv = document.createElement("div")
       comDiv.setAttribute("class", "comment")

  const h5 = document.createElement('h5')

  const comImgDiv = document.createElement("div")
        comImgDiv.setAttribute("class", "image")
  const img = document.createElement("img")
        img.src = imageurl
        
  const cmtDiv = document.createElement("div")
  cmtDiv.setAttribute('class', "content")
  

  const h4 = document.createElement('h4')
  h4.textContent= `Commented by ${doc.data().name} on ${dateResult}`
  const pComt = document.createElement("p")
  pComt.textContent= doc.data().comment

  hr.appendChild(comDiv)
  comDiv.appendChild(comImgDiv)
  comImgDiv.appendChild(img)
  comDiv.appendChild(cmtDiv)
  cmtDiv.appendChild(h4)
  cmtDiv.appendChild(pComt)
  }

  db.collection("comments").where("blogid","==",id).onSnapshot(snapshot => {
    const count =  snapshot.size
 let chenges = snapshot.docChanges()
    chenges.forEach(change => {
     renderComment(change.doc)
    });
  });

  // -------------------- delete a blog ---------------------------------
