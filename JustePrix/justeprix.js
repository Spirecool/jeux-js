/* Générer un chiffre en aléatoire 
L'utilisateur fera des propositions 
Continuer tant qu'il n'a pas la bonne proposition */ 

let numberToFind = 0;
const resultDiv = document.getElementById('resultDiv');
const reboursDiv = document.getElementById('compteARebours');
let tempsRestant = 0;
let compteurInterval = null;

// On récupère notre bouton et on lui ajoute un élément : quand on clique dessus, il faut exécuter la fonction de la ligne 8 : tu génère un nombre entre 0 et 1000
document.getElementById('beginGame').addEventListener('click', function() {
    // Lancer la partie
    // Récupérer un chiffre aléatoire
    numberToFind = getRandomInt(1000);
    console.log(numberToFind);
    // Timer : va exécuter qqch 1 seconde plus tard
    tempsRestant = 30;
    if(compteurInterval != null) {
        clearInterval(compteurInterval);
    }
    compteurInterval = setInterval(() => {
        // on affiche le nob de secondes restantes
        reboursDiv.innerText = tempsRestant + ' seconde(s)';
        tempsRestant--; 
        // quand moins de 10s on ajoute une classe de danger
        if(tempsRestant < 10) {
            reboursDiv.classList.add('danger');
        }
        else if(tempsRestant == 0) {
            clearInterval(compteurInterval);
            // Partie terminée
        }

    }, 1000);
})

document.getElementById('checkPropositionButton').addEventListener('click', function() {
    // On appelle la fonction checkProposition() quand on appui sur le bouton GO
    checkProposition()
})

document.getElementById('userPropositionInput').addEventListener('keyup', function(event) {
    // On appelle la fonction checkProposition() quand on relâche le bouton 
    console.log(event) // ici on sait sur quelle touche il a cliqué
    if(event.key == 'Enter') {
        checkProposition()
    }
})

// Fonction qui choisi aléatoirement un chiffre entre 0 et 1000
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function checkProposition() {
    // Quand je clique sur le bouton GO je veux récupérer la proposition qui est dans l'input
    let numberProposition = document.getElementById('userPropositionInput').value
    if(numberToFind > numberProposition){
        // c'est plus
        resultDiv.innerHTML = "C'est plus";
        // resultDiv.classList.add("plus");
        let audio = new Audio("audios/plus.mp3");
        audio.play();

    } else if(numberToFind < numberProposition) {
        // c'est moins
        resultDiv.innerHTML = "C'est moins"
        let audio = new Audio("audios/moins.mp3");
        audio.play();
    } else if (numberToFind == numberProposition) {
        // c'est gagné
        resultDiv.innerHTML = "C'est gagné !"
        let audio = new Audio("audios/win.mp3");
        audio.play();
    }
}

