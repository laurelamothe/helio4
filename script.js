
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

// Fonction pour ajouter des points et mettre à jour l'affichage
function addPoints(points) {
    let currentPoints = parseInt(localStorage.getItem('cagnottePoints')) || 0;
    currentPoints += points;
    localStorage.setItem('cagnottePoints', currentPoints);
    updatePoints();
}

// Appeler updatePoints lors du chargement de la page
window.onload = function() {
    updatePoints();
};
