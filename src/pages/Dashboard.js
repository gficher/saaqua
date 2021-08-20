import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import ValueCard from 'src/components/dashboard/ValueCard';
import SensorChart from 'src/components/dashboard/SensorChart';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      auth: JSON.parse(sessionStorage.getItem('auth')),
      data: null,
      aquariumList: [],
      currentAquarium: ''
    };

    const { auth } = this.state;

    if (auth === null) {
      console.log('Dashboard: auth is null');
    }
  }

  componentDidMount() {
    this.loadAquariums().then(() => {
      const { aquariumList } = this.state;

      if (aquariumList.length > 0) {
        this.changeAquarium(aquariumList[0].id);
      }
    });

    this.updateInterval = setInterval(() => {
      this.loadData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  loadAquariums() {
    const { auth } = this.state;

    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_BACK_URL}/user/${auth.user_id}/aquariums`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
        .then((res) => {
          this.setState({
            aquariumList: res.data.aquariums
          });

          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  loadData() {
    const { currentAquarium, auth } = this.state;

    if (currentAquarium === '') {
      return;
    }

    // TODO Load data from backend
    axios.get(`${process.env.REACT_APP_BACK_URL}/aquarium/${currentAquarium}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
      .then((res) => {
        const {
          luminosityValues,
          potentialHydrogenValues,
          salinityValues,
          supplyLevelValues,
          temperatureValues,
          waterLevelValues,
          veterinary,
          technician
        } = res.data;
        this.setState({
          data: {
            temperature: {
              unit: 'ºC',
              values: temperatureValues.map((item) => item.value),
              labels: temperatureValues.map((item) => item.measurement),
            },
            ph: {
              unit: '',
              values: potentialHydrogenValues.map((item) => item.value),
              labels: potentialHydrogenValues.map((item) => item.measurement),
            },
            salinity: {
              unit: 'ppm',
              values: salinityValues.map((item) => item.value),
              labels: salinityValues.map((item) => item.measurement),
            },
            light: {
              unit: 'lux',
              values: luminosityValues.map((item) => item.value),
              labels: luminosityValues.map((item) => item.measurement),
            },
            water: {
              unit: '%',
              values: waterLevelValues.map((item) => item.value),
              labels: waterLevelValues.map((item) => item.measurement),
            },
            food: {
              unit: '%',
              values: supplyLevelValues.map((item) => item.value),
              labels: supplyLevelValues.map((item) => item.measurement),
            },
          },
          veterinary,
          technician
        });
      });
  }

  changeAquarium(id) {
    this.setState({ data: null });
    this.setState({ currentAquarium: id }, this.loadData);
  }

  render() {
    const {
      data,
      veterinary,
      technician,
      aquariumList,
      currentAquarium
    } = this.state;

    const renderedAquariumList = aquariumList.map((aquarium) => (
      <MenuItem value={aquarium.id} key={aquarium.id}>{aquarium.name}</MenuItem>
    ));

    return (
      <>
        <Helmet>
          <title>Dashboard | Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Typography variant="h1">Dashboard</Typography>
            <FormControl style={{ marginBottom: '10px' }}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={currentAquarium}
                onChange={(event) => this.changeAquarium(event.target.value)}
              >
                {renderedAquariumList}
              </Select>
            </FormControl>
            { data
              && (
                <Grid
                  container
                  spacing={1}
                >
                  <Grid
                    item
                    lg={2}
                  >
                    <ValueCard title="Temperatura" value={`${data.temperature.values[data.temperature.values.length - 1]} ${data.temperature.unit}`} icon="thermostat" />
                  </Grid>
                  <Grid
                    item
                    lg={2}
                  >
                    <ValueCard title="Ph" value={`${data.ph.values[data.ph.values.length - 1]} ${data.ph.unit}`} icon="science" />
                  </Grid>
                  <Grid
                    item
                    lg={2}
                  >
                    <ValueCard title="Salinidade" value={`${data.salinity.values[data.salinity.values.length - 1]} ${data.salinity.unit}`} icon="medication" />
                  </Grid>
                  <Grid
                    item
                    lg={2}
                  >
                    <ValueCard title="Luminosidade" value={`${data.light.values[data.light.values.length - 1]} ${data.light.unit}`} icon="flare" />
                  </Grid>
                  <Grid
                    item
                    lg={2}
                  >
                    <ValueCard title="Água" value={`${data.water.values[data.water.values.length - 1]} ${data.water.unit}`} icon="water_drop" />
                  </Grid>
                  <Grid
                    item
                    lg={2}
                  >
                    <ValueCard title="Comida" value={`${data.food.values[data.food.values.length - 1]} ${data.food.unit}`} icon="set_meal" />
                  </Grid>
                </Grid>
              )}

            { data
            && (
              <Grid
                container
                spacing={1}
                py={4}
              >
                <Grid
                  item
                  lg={6}
                >
                  <SensorChart title="Temperatura" color="lightblue" data={data.temperature.values} labels={data.temperature.labels} />
                </Grid>
                <Grid
                  item
                  lg={6}
                >
                  <SensorChart title="Ph" color="lightblue" data={data.ph.values} labels={data.ph.labels} />
                </Grid>
                <Grid
                  item
                  lg={6}
                >
                  <SensorChart title="Salinidade" color="lightblue" data={data.salinity.values} labels={data.salinity.labels} />
                </Grid>
                <Grid
                  item
                  lg={6}
                >
                  <SensorChart title="Luminosidade" color="lightblue" data={data.light.values} labels={data.light.labels} />
                </Grid>
                <Grid
                  item
                  lg={6}
                >
                  <SensorChart title="Água" color="lightblue" data={data.water.values} labels={data.water.labels} />
                </Grid>
                <Grid
                  item
                  lg={6}
                >
                  <SensorChart title="Comida" color="lightblue" data={data.food.values} labels={data.food.labels} />
                </Grid>
              </Grid>
            )}

            <Typography variant="h1">Funcionários</Typography>
            <Grid
              item
            >
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Empresa</TableCell>
                      <TableCell>Especialidade</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Documento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { data
                    && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {veterinary.name}
                      </TableCell>
                      <TableCell>{veterinary.company}</TableCell>
                      <TableCell>{veterinary.specialty}</TableCell>
                      <TableCell>Veterinário</TableCell>
                      <TableCell>
                        CFMV&nbsp;
                        {veterinary.cfmv}
                      </TableCell>
                    </TableRow>
                    )}
                    { data
                    && (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {technician.name}
                        </TableCell>
                        <TableCell>{technician.company}</TableCell>
                        <TableCell>{technician.specialty}</TableCell>
                        <TableCell>Técnico</TableCell>
                        <TableCell>
                          CREA&nbsp;
                          {technician.crea}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default Dashboard;
