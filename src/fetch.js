console.log("client side js file is loaded!")

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    respnse.json().then((data) =>{
        console.log(data);
    })
})


fetch('http://api.weatherstack.com/current?access_key=7464d07df134a99b7a026cfa94074ef5&query=Boston&units=m').then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error);
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})