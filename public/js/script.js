const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value
    const url = `http://localhost:3000/weather?address=${encodeURIComponent(location)}`
    messageOne.textContent = 'Loading...'
    

    fetch(url).then((response)=>{

    response.json().then((data)=>{


        if(data.error)
            messageOne.textContent = data.error
        else{
        
            console.log
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecastData

        }


    })

})

})
