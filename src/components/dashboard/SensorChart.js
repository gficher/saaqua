import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@material-ui/core';

const SensorChart = (props) => {
  const theme = useTheme();
  const {
    title, color, data, labels
  } = props;

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        title={title || 'Title'}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 150,
            position: 'relative'
          }}
        >
          <Line
            data={{
              datasets: [
                {
                  data: data || [3, 6, 7, 23, 10, 4],
                  borderColor: color,
                },
              ],
              labels: labels || ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']
            }}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

SensorChart.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  data: PropTypes.array,
  labels: PropTypes.array
};

export default SensorChart;
