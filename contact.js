// ----------------------------saving contacts in firebase---------------------

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  const names = document.querySelector("#fname").value;
  const email = document.querySelector("#email").value;
  const description = document.querySelector("#description").value
  const contacted_at = new Date()

  let contact = {
    name:names,
    email,
    description,
    date:contacted_at
  }
  firebase.firestore().collection("contact").add(contact).then(()=>{
     alert("Thank You for Contact me!")
     contactForm.reset();
  }).catch(error => alert(error.message))
})

//September 1, 2020 at 11:51:14 AM

// ----------------- reading skills on guest users --------------

const guestSkills = document.querySelector(".flex-skills");

firebase.firestore().collection("skills").get().then( snapshot => {
  snapshot.docs.forEach( doc => {
    let skill = `
          <div class="flex-skill-item">
                <img src="${doc.data().skillUrl}" alt="${doc.data().skillImage}">
                <p> ${doc.data().skill}</p>
            </div>
    `;
    guestSkills.innerHTML += skill
    //console.log(doc.data())
  })
});

// ----------------- reading projects on guest users --------------
const guestProjects = document.querySelector(".flexbox-project");

firebase.firestore().collection('projects').get().then( snapshot => {
  snapshot.docs.forEach(doc =>{
    //console.log(doc.data());

    let project = `
    <div class="flexbox-project-item">
    <img src="${doc.data().project_imageUrl}" alt="${doc.data().image_name}">
    <a href="#"><h2>${doc.data().title}</h2></a>
  <p>${doc.data().description}</p> 
</div>
    `;
    guestProjects.innerHTML +=project
  })
})
