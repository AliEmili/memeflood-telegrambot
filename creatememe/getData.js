const rp = require('request-promise');
const requestOptions = {
    method: 'GET',
    uri: 'https://meme-api.herokuapp.com/gimme/1',
    json: true
}


module.exports.data = async() => {
    try {
        return await rp(requestOptions);
    } catch (err) {
        console.log(err);
    }

}