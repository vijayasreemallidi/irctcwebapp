// script.js

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const pageToShow = document.getElementById(pageId);
    if (pageToShow) {
        pageToShow.classList.add('active');
    }
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Login successful (placeholder)');
    showPage('landing-page');
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Registration successful (placeholder)');
    showPage('landing-page');
});

document.getElementById('track-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const trainNumber = event.target.elements[0].value;
    document.getElementById('track-results').textContent = `Tracking Train ${trainNumber} (placeholder)`;

    const stations = document.querySelectorAll('.station');
    const trainIcon = document.getElementById('train-icon');
    const trainStatus = document.getElementById('train-status');
    const arrivalMessage = document.getElementById('arrival-message');
    let isLate = Math.random() < 0.3;

    let routes = {
        '12345': ['Delhi', 'Jaipur', 'Ahmedabad', 'Mumbai'],
        '67890': ['Bangalore', 'Chennai'],
        '13579': ['Kolkata', 'Pune'],
        '24680': ['Hyderabad', 'Vijayawada', 'Visakhapatnam']
    };

    let route = routes[trainNumber] || ['Station 1', 'Station 2', 'Station 3', 'Station 4'];

    stations.forEach((station, index) => {
        station.textContent = route[index];
    });

    stations.forEach((station, index) => {
        setTimeout(() => {
            stations.forEach(s => s.setAttribute('data-status', 'upcoming'));
            station.setAttribute('data-status', 'stopped');
            trainIcon.style.left = station.style.left;

            if (index < stations.length - 1) {
                setTimeout(() => {
                    station.setAttribute('data-status', 'moving');

                    if (isLate) {
                        trainIcon.style.color = 'red';
                        trainStatus.textContent = "Train is running late";
                    } else {
                        trainIcon.style.color = 'green';
                        trainStatus.textContent = "Train is on time";
                    }

                }, 2000);

            } else {
                if (isLate) {
                    trainIcon.style.color = 'red';
                    trainStatus.textContent = "Train is running late";
                } else {
                    trainIcon.style.color = 'green';
                    trainStatus.textContent = "Train is on time";
                }
                setTimeout(() => {
                    arrivalMessage.textContent = "Train arrived at destination: " + route[route.length - 1];
                }, 2000);
            }

        }, index * 4000);
    });
});