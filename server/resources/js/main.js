(async function () {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(document.getElementById('canvas'), {
    type: 'bar',
    options: {
      animation: true,
      plugin: {
        colors: {
          forceOverride: true,
        },
        legend: {
          display: true,
        },
        tooltip: {
          embled: true,
        },
      },
    },
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map((row) => row.count),
          backgroundColor: '#62BEEE',
        },
      ],
    },
  });
})();

/* Traffic Sources */
const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4,
    },
  ],
};
const config = {
  type: 'doughnut',
  data: data,
};
new Chart(document.getElementById('traffic'), config);
