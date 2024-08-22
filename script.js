
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour mettre à jour le compte à rebours
    function updateCountdown() {
        const countdownContainer = document.getElementById('countdown-container');
        if (!countdownContainer) return;

        const endTime = new Date(countdownContainer.getAttribute('data-end-time')).getTime();
        const countdownElement = document.getElementById('countdown');
        
        function calculateTimeRemaining() {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                countdownElement.textContent = 'Compte à Rebours : 00:00:00';
                clearInterval(updateCountdownInterval);
                return;
            }

            const hours = Math.floor((distance % (24 * 3600 * 1000)) / (3600 * 1000));
            const minutes = Math.floor((distance % (3600 * 1000)) / (60 * 1000));
            const seconds = Math.floor((distance % (60 * 1000)) / 1000);

            countdownElement.textContent = `Compte à Rebours : ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
        }

        function formatNumber(num) {
            return num < 10 ? '0' + num : num;
        }

        calculateTimeRemaining();
        const updateCountdownInterval = setInterval(calculateTimeRemaining, 1000); // Met à jour chaque seconde
    }

    // Appeler updateCountdown lors du chargement de la page
    updateCountdown();

    // Cagnotte
    const cagnotteElement = document.getElementById('cagnotte');
    if (cagnotteElement) {
        let points = localStorage.getItem('cagnottePoints') ? parseInt(localStorage.getItem('cagnottePoints')) : 0;
        cagnotteElement.innerHTML = `Points : ${points}`;
    }
});

// Fonction pour ajouter des points et rediriger vers l'URL spécifiée
function addPointsAndRedirect(points, redirectUrl) {
    // Récupérer les points actuels depuis le stockage local ou initialiser à 0
    let currentPoints = parseInt(localStorage.getItem('cagnottePoints')) || 0;
    // Ajouter les nouveaux points
    currentPoints += points;
    // Stocker les nouveaux points dans le stockage local
    localStorage.setItem('cagnottePoints', currentPoints);
    // Rediriger vers l'URL spécifiée
    window.location.href = redirectUrl;
    alert(`Félicitations ! Vous avez gagné ${points} points.`); // Afficher une alerte avec le nombre de points gagnés

}

// Fonction pour afficher les points de manière progressive
function updatePoints() {
    const element = document.getElementById('cagnotte');
    const totalPoints = parseInt(localStorage.getItem('cagnottePoints')) || 0; // Montant total de points à atteindre
    let currentPoints = parseInt(element.textContent.replace('Cagnotte : ', '').replace(' Points', '')) || 0; // Points actuels
    const duration = 3000; // Durée totale de l'animation en millisecondes
    const incrementTime = 50; // Temps entre chaque incrémentation en millisecondes
    const incrementAmount = totalPoints / (duration / incrementTime); // Montant des points à ajouter à chaque incrémentation

    function animate() {
        if (currentPoints >= totalPoints) {
            element.textContent = `Cagnotte : ${totalPoints} Points`;
            return;
        }
        currentPoints += incrementAmount;
        element.textContent = `Cagnotte : ${Math.round(currentPoints)} Points`;
        setTimeout(animate, incrementTime);
    }

    animate();
}

// // Fonction pour ajouter des points et mettre à jour l'affichage
// function addPoints(points) {
//     let currentPoints = parseInt(localStorage.getItem('cagnottePoints')) || 0;
//     currentPoints += points;
//     localStorage.setItem('cagnottePoints', currentPoints);
//     updatePoints();
// }

// Appeler updatePoints lors du chargement de la page
window.onload = function() {
    updatePoints();
};


// Fonction pour vérifier les codes et gérer l'ajout de points et la redirection
function checkCodes(button) {
    const code1 = document.getElementById('code1').value;
    const code2 = document.getElementById('code2').value;
    
    // Récupérer les codes requis depuis les attributs du bouton
    const requiredCode1 = button.getAttribute('data-code1');
    const requiredCode2 = button.getAttribute('data-code2');

    // Récupérer le lien de redirection depuis l'attribut du bouton
    const redirectUrl = button.getAttribute('data-url');

    // Récupérer la date de fin du compte à rebours depuis le HTML
    const countdownContainer = document.getElementById('countdown-container');
    const countdownDate = new Date(countdownContainer.getAttribute('data-end-time')).getTime();
    const now = new Date().getTime();
    
    // Vérifier si les codes sont corrects
    if (code1 === requiredCode1 && code2 === requiredCode2) {
        // Si le compte à rebours n'est pas terminé, ajouter des points
        if (now < countdownDate) {
            alert(`Félicitations ! Vous avez gagné ${10} points.`); // Afficher une alerte avec le nombre de points gagnés
            location.href = redirectUrl;
            addPoints(10); // Ajouter le nombre de points souhaité

        } else {
            alert("Le compte à rebours est terminé, les points n'ont pas été ajoutés.");
        }

        // Redirection vers l'URL spécifiée
        location.href = redirectUrl;
    } else {
        alert('Codes incorrects');
    }
}

// Fonction pour vérifier le code et rediriger
function check1Codes(button) {
    // Récupérer le code correct et l'URL depuis les attributs du bouton
    var correctCode = button.getAttribute('data-code1');
    var redirectUrl = button.getAttribute('data-url');

    // Récupérer le code entré par l'utilisateur
    var userInput = document.getElementById('code1').value;

    // Vérifier si le code entré est correct
    if (userInput === correctCode) {
        alert(`Félicitations ! Vous avez gagné 100 points.`); // Afficher une alerte avec le nombre de points gagnés
        window.location.href = redirectUrl;

        addPoints(100); // Ajouter le nombre de points souhaité

    } else {
        // Afficher un message d'erreur si le code est incorrect
        alert('Code incorrect. Veuillez réessayer pour gagner des points.');
    }
}


// Fonction pour ajouter des points et mettre à jour le stockage local
function addPoints(points) {
    let currentPoints = parseInt(localStorage.getItem('cagnottePoints')) || 0;
    currentPoints += points;
    localStorage.setItem('cagnottePoints', currentPoints);
    updatePoints(); // Mettre à jour l'affichage des points

}


function updateCountdown() {
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.getElementById('progress-bar');

    if (!progressBarContainer || !progressBar) return;

    // Récupère la durée à partir de l'attribut data-duration
    const duration = parseInt(progressBarContainer.getAttribute('data-duration'), 10);

    if (isNaN(duration)) return;

    const endTime = new Date().getTime() + duration * 1000; // Calcul de l'heure de fin
    const totalTime = duration * 1000; // Temps total en millisecondes

    function calculateTimeRemaining() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            progressBar.style.width = '0%';
            clearInterval(updateCountdownInterval);
            return;
        }

        // Calculer la largeur de la jauge de progression
        const percentage = (distance / totalTime) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    calculateTimeRemaining();
    const updateCountdownInterval = setInterval(calculateTimeRemaining, 1000); // Met à jour chaque seconde
}

// Attacher un événement de clic au bouton pour lancer la jauge
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
    updateCountdown();
    startButton.disabled = true; // Désactiver le bouton après le clic
});


