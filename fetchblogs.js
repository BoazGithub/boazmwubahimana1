


  
  const db = firebase.firestore();
// ---------------------------------------getting blogs from firebase-----------------------------------------------

    const blogsList = document.querySelector('.flexbox-blog');
    
    const renderBlog = (doc) => {
        const div = document.createElement("div");
        div.setAttribute('class', "flexbox-blog-item")
        div.setAttribute('id', doc.id)
        const id =div.getAttribute('id')

        const image = document.createElement('img');
        image.src += doc.data().imageref;
        image.alt += doc.data().image;

        const header3 = document.createElement('h3');
        header3.textContent += doc.data().title;

        const link = document.createElement('a')
        // window.location.href =
        link.setAttribute("href", `article.html#/${id}`)
        // link.textContent = header3


        const header5 = document.createElement('h5');
        header5.textContent += doc.data().created_at;

        const p = document.createElement('p');
        p.innerHTML += doc.data().description.substring(0,299) + "...";
      

      div.appendChild(image)
      link.appendChild(header3)
      div.appendChild(link)
      // div.appendChild(header5)
      div.appendChild(p)

      blogsList.appendChild(div)
    }

    db.collection("blogs").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        renderBlog(doc);

            console.log(doc.data());
            console.log(doc.id);

        })
    })

    