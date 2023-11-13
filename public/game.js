const root = document.querySelector('.root')


const getGames = async()=>{
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      }
    const res = await fetch('http://localhost:5000/game/getgames', options);
    const response = await res.json();
    const data = response.data
    console.log(data)
    data.forEach((games)=>{
        let div = document.createElement('div');
        let name = document.createElement('p');
        let link = document.createElement('a');
        div.className = 'game';
        let gamelink = document.createElement('a');
        name.innerHTML = games.githubusername;
        link.href = games.link;
        link.innerHTML = games.link;
        gamelink.href = `./games/${games.projectname}`
        gamelink.innerHTML = games.projectname;
        div.appendChild(gamelink);
        div.appendChild(name);
        div.appendChild(link);
        root.appendChild(div);
    })
}
getGames()



