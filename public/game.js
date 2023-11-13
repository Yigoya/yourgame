const root = document.querySelector('.root')


const getGames = async()=>{
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      }
    const res = await fetch('https://yourname-6kdw.onrender.com/game/getgames', options);
    const response = await res.json();
    const data = response.data
    console.log(data)
    data.forEach((games)=>{
        let gamecont = document.createElement('div');
        gamecont.className = 'gamecont';
        let div = document.createElement('div');
        let review = document.createElement('div');
        review.className ='review';
        let name = document.createElement('p');
        let link = document.createElement('a');
        div.className = 'game';
        let gamelink = document.createElement('a');
        name.innerHTML = games.githubusername;
        link.href = games.link;
        link.target = '_blank';
        link.className = 'link';
        link.innerHTML = 'link';
        gamelink.href = `./games/${games.projectname}`
        gamelink.innerHTML = `<span>PLAY</span> ${games.projectname}`;
        div.appendChild(gamelink);
        div.appendChild(name);
        div.appendChild(link);
        review.innerHTML = `
        <h4 class="like">likes ${games.likes}</h4>
        <h4 class="dislike">dislikes ${games.dislikes}</h4>
        <h4 class="comment">comments ${games.comment.length} &#9662;</h4>
        
        `
        gamecont.appendChild(div);
        gamecont.appendChild(review);
        root.appendChild(gamecont);
    })
}
getGames()

const like = document.querySelectorAll('.like')
const dislike = document.querySelectorAll('.dislike')
const comment = document.querySelectorAll('.comment')

// like.addEventListener('click',async()=>{
//   const options = {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//   }
//   const res = await fetch('https://localhost:5000/', options);
//   const response = await res.json();
//   console.log(response)
// })

like.forEach((ele)=>{
  ele.onclick = (e)=>{
    console.log(e.target)
  }
})



