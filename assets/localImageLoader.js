export function localImage(imageName){
    switch (imageName) {
        case "Butter Chicken Chapatis" : return require('../assets/Food/Butter-Chicken-Chapatis.jpg')
        case "Nachos" : return require('../assets/Food/Nachos.jpg')
        case "Pizza" : return require('../assets/Food/Pizza.jpg')
        case "Pork Dumplings" : return require('../assets/Food/Pork-Dumplings.jpg')
        case "Pork Mince Rice Bowl" : return require('../assets/Food/Pork-Mince-Rice-Bowl.jpg')
        case "Sausage and Veg" : return require('../assets/Food/Sausage-and-Veg.jpg')
        case 'Spaghetti Bolognese' : return require('../assets/Food/Spaghetti-Bolognese.jpg')
        case 'Steak and Bluecheese Burger' : return require('../assets/Food/Steak-and-Bluecheese-Burger.jpg')
        case 'StirFry' : return require('../assets/Food/StirFry.jpg')
        case 'Vietnamese Spring Rolls' : return require('../assets/Food/Vietnamese-Spring-Rolls.jpg')
    }
}