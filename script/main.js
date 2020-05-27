const IMAGE_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const API_KEY = '1e8f63bdc33f52e0915fe3ddfbef6ea9';
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');




const DBService = class {
    getData =  async (url) => {
        const res = await fetch(url);

        if(res.ok) {
            return res.json();
        } else {
            throw new Error (`Не удалось получить данные по адресу ${url}`)
        }

    }


    getTestData = async () => {
        return await this.getData('test.json')
    }

}

const renderCard = response => {
    console.log(response.results);
    tvShowsList.textContent = ''; 

    response.results.forEach(item => {

        const {
            backdrop_path: backdrop, 
            name: title, 
            vote_average: vote, 
            poster_path: poster}
                = item;


        const posterIMG = poster ? IMAGE_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = backdrop ? IMAGE_URL + backdrop : '';
        const voteElem =  vote > 0 ? vote : 'Span тут нет)';



        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
        <a href="#" class="tv-card">
            <span class="tv-card__vote">${voteElem}</span>
            <img class="tv-card__img"
                src="${posterIMG}" 
                data-backdrop="${backdropIMG}"
                alt="${title}">
            <h4 class="tv-card__head">${title}</h4>
        </a>`;

        tvShowsList.append(card);
    });


};

new DBService().getTestData().then(renderCard);

// меню 



//////////////////////////////////////////////////////////////////////
// открытие/закрытие меню

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

// закрываем меню по клику на окно

document.addEventListener('click', (event) => {
    if(!event.target.closest('.left-menu')){
        // console.log('Клик вне меню (благодаря отрицанию)');
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', (event)=> {
    const target = event.target;
    const dropdown = target.closest('.dropdown');

    if(dropdown){
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }

});

//////////////////////////////////////////////////////////////////////////
// открытие модального окна

tvShowsList.addEventListener('click', event=>{
    const target = event.target;
    const card = target.closest('.tv-card');
    
    if(card){
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }


});

// закрытие модального окна

modal.addEventListener('click', event => {

    if(event.target.closest('.cross') || 
        event.target.classList.contains('modal')){
        document.body.style.overflow = '';  
        modal.classList.add('hide');
    }
})

///////////////////////////////////////////////////////////////////////////////
// // 1 Смена картинки при наведении мыши

// let image = document.querySelectorAll('.tv-card__img');// создаем массив с картинками


// // используем метод перебора массива с картинками 
// for(let i = 0; i < image.length; i++){

//     let imageSrc = image[i].src;// переменная с атрибутом src выбранной картинки
//     let imageBackdrop = image[i].dataset.backdrop;// переменная с атрибутом data-backdrop выбранной картинки
   
//         //при наведении в атрибут src помещаем ссылку из backdrop
//         image[i].addEventListener('mouseover', function(){
//             image[i].src = imageBackdrop;
//         })  

//         // при отведении мыши возвращаем картинку
//         image[i].addEventListener('mouseout', function(){
//             image[i].src = imageSrc;
//         })  
// }


// // 2 Домашнее задание_ на youtube. Смена картинки

// const changeImage = event => {
//     const card = event.target.closest('.tv-shows__item');

//     if(card){
//         const img = card.querySelector('.tv-card__img');

//         const changeImg = img.dataset.backdrop;

//         if(changeImg){
//             img.dataset.backdrop = img.src;
//             img.src = changeImg;
//         }
//     }
// };

// tvShowsList.addEventListener('mouseover', changeImage);
// tvShowsList.addEventListener('mouseout', changeImage)

// 3 Другой вариант домашнего задания. С помощью деструктуризации

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if(card){
        const img = card.querySelector('.tv-card__img');

        const changeImg = img.dataset.backdrop;

        if(img.dataset.backdrop){
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);


