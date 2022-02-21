const request = require('postman-request');

const forecast = (latitude, longitude, callback) =>{
    var url = 'http://api.weatherstack.com/current?access_key=7464d07df134a99b7a026cfa94074ef5&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback("No internet", undefined);
        }else if(body.error){
            callback("no location has been found.", undefined);
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            })
        }
    })
}

module.exports = forecast