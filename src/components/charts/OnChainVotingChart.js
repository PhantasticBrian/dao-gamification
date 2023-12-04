import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const OnChainVotingChart = () => {
  const [votingData, setVotingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'REACT_APP_DUNE_API_KEY';
        const response = await axios.get(
          `https://api.dune.com/api/v1/query/2205751/results?api_key=${apiKey}`
        );
        setVotingData(response.data?.data?.rows || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (votingData.length > 0) {
      const ctx = document.getElementById('votingChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: votingData.map(item => item.label),
          datasets: [
            {
              label: 'Votes',
              data: votingData.map(item => item.value),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [votingData]);

  return (
    <Box>
      <canvas id="votingChart" width="400" height="200" />
    </Box>
  );
};

export default OnChainVotingChart;