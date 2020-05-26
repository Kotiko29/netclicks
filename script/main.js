// меню 

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

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

// Смена картинки при наведении мыши

let image = document.querySelectorAll('.tv-card__img');// создаем массив с картинками


// используем метод перебора массива с картинками 
for(let i = 0; i < image.length; i++){

    let imageSrc = image[i].src;// переменная с атрибутом src выбранной картинки
    let imageBackdrop = image[i].dataset.backdrop;// переменная с атрибутом data-backdrop выбранной картинки
   
        //при наведении в атрибут src помещаем ссылку из backdrop
        image[i].addEventListener('mouseover', function(){
            image[i].src = imageBackdrop;
        })  

        // при отведении мыши возвращаем картинку
        image[i].addEventListener('mouseout', function(){
            image[i].src = imageSrc;
        })  
}




