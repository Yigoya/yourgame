const post = document.querySelector('.post')
const repo = document.querySelector('.repo')

let form;

const Auth = async (form)=>{
    try {
        const url = 'http://localhost:5000/game/add';
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
        form = {
            link:repo.value,
            userId:localStorage.getItem('user')
        }
        await Auth(form)
    }
    
})
