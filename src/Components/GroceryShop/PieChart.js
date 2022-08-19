import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const PieChart = (props) => {
    const data = {
        labels: props.trendingProductsSorted.slice(0, 5),
        datasets: [{

            data: props.trendingProductsSortedFrequency.slice(0, 5),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            hoverOffset: 4,
            options: {
                plugins: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    legend: {
                        display: 'true',
                        position: "left",
                    },
                    title: {
                        display: 'true',
                        text: 'Custom Chart Title',

                    }

                },
            },
            animation: {
                duration: 2500,
                easing: 'easeOutQuart'
            }
        }]


        /*   options: {
              plugins: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  },
                  legend: {
                      display: 'true',
                      position: "left",
                  },
                  title: {
                      display: 'true',
                      text: 'Custom Chart Title',
  
                  }
  
              },
          } */


    }


    //console.log(data);

    return (
        <div style={{ width: '70%', marginLeft: '90px' }} >
            <Doughnut data={data} />
        </div >

    );
};

export default PieChart;