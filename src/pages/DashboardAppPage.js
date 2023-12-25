import { Helmet } from 'react-helmet-async';
// @mui
import { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import { getItems } from '../api/item';
import { getOrders } from '../api/order';
import { getClients } from '../api/client';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [item, setItem] = useState([]);
  const [order, setOrder] = useState([]);
  const [client, setClient] = useState([]);


  useEffect(() => {
    getItems()
      .then((res) => {
        setItem(res.data ? res.data : []);
      })

      .catch((err) => console.error(err));

      getOrders()
      .then((res) => {
        setOrder(res.data ? res.data : []);
      })
      .catch((err) => console.error(err));

    getClients()
      .then((res) => {
        setClient(res.data ? res.data : []);
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   Promise.all([getEnvois(), getEtats()])
  //     .then(([envoisRes, etatsRes]) => {
  //       const envois = envoisRes.data;
  //       const etats = etatsRes.data;

  //       const envoisDeposeCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'Déposé';
  //       }).length;

  //       const envoisEnRouteCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'En Route';
  //       }).length;

  //       const envoisEnAttenteCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'En Attente';
  //       }).length;

  //       const envoisLivreCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'Livrée';
  //       }).length;

  //       const envoisRetourCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'Retour';
  //       }).length;

  //       setEnvoiCount(envois.length);

  //       setLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // Define count of Envois for each Etat

  // const envoicount = envoi ? envoi.length : 0;
  // const adminCount = admin ? admin.length : 0;
  // const clientCount = client ? client.length : 0;
  // const livreurCount = livreur ? livreur.length : 0;
  // const userCount = adminCount + clientCount + livreurCount;
  // const ramassageCount = ramassage ? ramassage.length : 0;


  const orderCount = (index) => {
    const status = ['New Order', 'Validated'];
    return order.filter((e) => e?.status === status[index]).length || '0';
  };


  return (
    <>
      <Helmet>
        <title> Admin BackOffice </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back to your Admin BackOffice
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Items"
              total={item.length || '0'}
              icon={'streamline:shipping-box-1-box-package-label-delivery-shipment-shipping'}
            />
          </Grid>
       
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Orders"
              total={order.length || '0'}
              color="info"
              icon={'game-icons:card-pickup'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of Clients"
              total={client.length || '0'}
              color="warning"
              icon={'raphael:customer'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Orders"
              total={orderCount(0)}
              color="success"
              icon={'game-icons:card-pickup'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Validated"
              total={orderCount(1)}
              color="success"
              icon={'game-icons:card-pickup'}
            />

          </Grid>
        </Grid>
      </Container>
    </>
  );
}
