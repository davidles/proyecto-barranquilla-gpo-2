const apiURL = 'https://api-colombia.com/api/v1';

const api = {
    getTouristicAttraction: async () => {
        const fetchData = await fetch(`${apiURL}/TouristicAttraction`);
        const resp = await fetchData.json();
        
        return resp;
    }
};

const cardsContainer = document.querySelector('#cards-container');
const loadingContainer = document.querySelector('#loading');

const limit = 6;
let offset = 0;
let loading = false;

const loadMoreAttractions = async () => { 

    if (!loading) {
        loading = true;
        loadingContainer.innerHTML = ''
        return api.getTouristicAttraction()
            .then((resp) => resp.slice(offset, offset + limit))
            .then((info) => {
                offset += limit;
                loading = false;
                return info.forEach(({ id, name, city, images }) => {
                    return cardsContainer.innerHTML += `
                        <div class="card">
                            <img src="${images[0]}" class="card-img-top" alt="${name}" loading="lazy">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-outline-info m-auto">Ver más</a>
                            </div>
                        </div>
                    `;
                });
            });
    }

};

const checkScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    if (scrollPosition >= bodyHeight) {
        return loadMoreAttractions();
    }
};

window.addEventListener('scroll', checkScroll);


loadMoreAttractions();
