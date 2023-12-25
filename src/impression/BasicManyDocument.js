/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';
import { Document, Image, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getManyEnvoi } from '../api/envoi';
// Create styles

const formatter = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'DZD',
});

const COLUMNS = ['Envoi N', 'Produit', 'Quantitée', "Note d'information", 'Date & Heure'];

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#ffffff',
    color: 'black',
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, // the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
  },
  columnText: {
    width: `${100 / COLUMNS.length}%`,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'ultrabold',
    color: 'gray',
    marginBottom: 3,
  },
});

// Create Document Component
function BasicManyDocument() {
  const [envois, setEnvois] = useState([]);
  const ids = useLocation().state;
  console.log(envois);

  useEffect(() => {
    getManyEnvoi(ids)
      .then((res) => setEnvois(res))
      .catch(() => alert('Erreur, impossible de récupérer les information de la facture'));
  }, [ids]);
  return (
    <>
      {envois.length > 0 ? (
        <PDFViewer style={styles.viewer}>
          {/* Start of the document */}
          <Document>
            {/* render a single page */}
            <Page size="A4" style={styles.page}>
              {envois.map((e, index) => (
                <>
                  <View
                    break={index > 0}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Text style={{ flex: 1, textAlign: 'left', fontSize: 20, color: 'gray' }}>Bon de livraison</Text>
                    <Image style={{ width: 100, textAlign: 'center' }} src="/logo-black.jpeg" />
                    <View style={{ flex: 1, textAlign: 'right' }}>
                      <Text>WeDelivery</Text>
                      <Text>Bab Ezzouar, Rahmania</Text>
                      <Text>0557969321</Text>
                    </View>
                  </View>
                  <View style={{ height: 2, backgroundColor: 'gray', marginVertical: 15 }} />
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 15,
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        paddingVertical: 2,
                        borderLeft: 5,
                        borderColor: 'gray',
                        paddingLeft: 6,
                      }}
                    >
                      <Text style={styles.subtitle}>Information Expediteur</Text>
                      <Text>{`${e?.client.firstname} ${e?.client.lastname}`}</Text>
                      <Text>{e?.client.phone}</Text>
                      <Text>{e?.client.entreprise}</Text>
                    </View>
                    <Text style={{ fontSize: 40 }}>{e?.numcommand || '00'}</Text>
                    <View
                      style={{
                        flex: 1,
                        textAlign: 'right',
                        paddingVertical: 2,
                        borderRight: 5,
                        borderColor: 'gray',
                        paddingRight: 6,
                      }}
                    >
                      <Text style={styles.subtitle}>Information Destinataire</Text>
                      <Text>{e?.name}</Text>
                      <Text>{e?.telephone1}</Text>
                      <Text>{e?.client.address}</Text>
                    </View>
                  </View>
                  <View style={{ fontSize: 10 }}>
                    <View style={styles.rowView}>
                      {COLUMNS.map((c, index) => (
                        <Text
                          key={index}
                          style={{
                            width: `${100 / COLUMNS.length}%`,
                          }}
                        >
                          {c}
                        </Text>
                      ))}
                    </View>
                    <View style={styles.rowView}>
                      <Text style={styles.columnText}>{e?.numcommand}</Text>
                      <Text style={styles.columnText}>{e?.produit}</Text>
                      <Text style={styles.columnText}>{e?.quantite}</Text>
                      <Text style={styles.columnText}>{e?.infos}</Text>
                      <Text style={styles.columnText}>{`${e?.created_at.split('T')[0]} ${e?.created_at
                        .split('T')[1]
                        .slice(0, 8)}`}</Text>
                    </View>
                  </View>
                  <View style={{ height: 2, backgroundColor: 'gray', marginVertical: 15 }} />
                  <Text style={{ ...styles.title, textAlign: 'center' }}>
                    TOTAL À PAYER : {formatter.format(e.prixtotal).split('DZD')[1]} DA
                  </Text>
                  <View style={{ height: 2, backgroundColor: 'gray', marginVertical: 15 }} />
                </>
              ))}
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
export default BasicManyDocument;
