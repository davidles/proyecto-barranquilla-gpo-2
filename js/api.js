const apiURL = 'https://api-colombia.com/api/v1'

export const api = {
    getTouristicAttraction: async() =>{
        const fetchData = await fetch(`${apiURL}/TouristicAttraction`);
        const resp = await fetchData.json();
        
        return resp
    }
}



module.exports = api;