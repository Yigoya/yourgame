const post = document.querySelector('.post')
const repo = document.querySelector('.repo')
const container = document.querySelector('.container')
let form;

const Auth = async (form)=>{
    try {
        const url = 'https://yourname-6kdw.onrender.com/game/add';
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        const res = await fetch(url,option)
        const data = await res.json()
        console.log(data)

    }catch(err){
        console.log(err)
    }
}

post.addEventListener('click',async()=>{
    if(localStorage.getItem('user')){
        if(repo.value == ''){
            let div = document.createElement('div')
            let p = document.createElement('p')
            p.innerHTML = 'the repo link is required'
            div.className = 'alert'
            div.appendChild(p)
            container.appendChild(div)
            setTimeout(()=>{
                div.remove()
            },2000)
        }else{
            form = {
                link:repo.value,
                userId:localStorage.getItem('user')
            }
            await Auth(form)
        }
    }
    else {
        window.location.href = '../auth.html'
    }
    
})
