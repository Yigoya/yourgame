// const form = document.querySelector('form');
const submit = document.querySelector('.btn');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const pIsLogin = document.querySelector('#isLogin');
const usernamecont = document.querySelector('.username')
let form = {}

let isLogin = false
submit.innerHTML = isLogin ? "Login" : "Register"
pIsLogin.innerHTML = isLogin ? 'click here to register':'click here to login';
username.style.display = isLogin?'none':'inline-block';
pIsLogin.addEventListener('click', ()=>{
    isLogin =!isLogin
    pIsLogin.innerHTML = isLogin? 'click here to register':'click here to login';
    usernamecont.style.display = isLogin ?'none':'flex';
    submit.innerHTML = isLogin ? "Login" : "Register"
})

const Auth = async (form)=>{
    try {
        const url = isLogin ? 'http://localhost:5000/auth/login':'http://localhost:5000/auth/register'
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        const res = await fetch(url,option)
        const data = await res.json()
        console.log(data.user._id)
        if(data.status === 200){
            localStorage.setItem('user', data.user._id)
            window.location.href = '../index.html'
        }else{

        }

    }catch(err){
        console.log(err)
    }
}

submit.addEventListener('click',async()=>{
    if(isLogin){
        form = {
            email: email.value,
            password: password.value
        }
    }else{
        form = {
            username: username.value,
            email: email.value,
            password: password.value
        }
        
    }
    await Auth(form)
})


// fetch(url, options)
//   .then(response => {
//     // Handle the response
//   })
//   .catch(error => {
//     // Handle errors
//   });


// fetch('https://api.example.com/data', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers as needed
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Handle the retrieved data
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle errors
//       console.error('Error:', error);
//     });

// fetch('https://api.example.com/data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any other headers as needed
//         },
//         body: JSON.stringify({
//           key1: 'value1',
//           key2: 'value2',
//           // Add other data as needed
//         }),
//       })
//         .then(response => response.json())
//         .then(data => {
//           // Handle the response data
//           console.log(data);
//         })
//         .catch(error => {
//           // Handle errors
//           console.error('Error:', error);
//         });
      
// fetch('https://api.example.com/data/123', {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//               // Add any other headers as needed
//             },
//             body: JSON.stringify({
//               keyToUpdate: 'newValue',
//               // Add other fields to update
//             }),
//           })
//             .then(response => response.json())
//             .then(data => {
//               // Handle the response data
//               console.log(data);
//             })
//             .catch(error => {
//               // Handle errors
//               console.error('Error:', error);
//             });
          