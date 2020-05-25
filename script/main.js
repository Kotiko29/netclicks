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
        console.log('Клик вне меню (благодаря отрицанию)');
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