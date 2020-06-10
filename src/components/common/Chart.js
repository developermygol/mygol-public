import { Localize } from './Locale/Loc';


export const getSettings = (label, inputData, maxX = 10) => {
    const styles = {
        primary: '#e7a016',
        secondary: 'rgba(255, 255, 255, 0.6)',
        grid: 'rgba(255, 255, 255, 0.1)'
    }

    const labels = [];
    for (let i = 0; i < maxX; ++i) labels.push(i + 1);

    const data = {
        labels,
        datasets: [{
            label: Localize(label),
            data: inputData,
            borderColor: styles.primary,
            backgroundColor: styles.primary,
        }]
    }

    const options = {
        responsive: true,
        legend: null,
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: styles.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 10,
                    fontColor: styles.secondary
                },
                gridLines: {
                    display: true,
                    color: styles.grid,
                    drawBorder: true,
                    borderColor: styles.grid,
                    drawTicks: false
                }
            }]
        }
    }

    return { data, options };
}