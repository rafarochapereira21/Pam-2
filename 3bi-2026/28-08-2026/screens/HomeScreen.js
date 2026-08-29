import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const musicas = [
  { id: '1', nome: 'Enter Sandman', artista: 'Metallica' },
  { id: '2', nome: 'Master of Puppets', artista: 'Metallica' },
  { id: '3', nome: 'Nothing Else Matters', artista: 'Metallica' },
  { id: '4', nome: 'One', artista: 'Metallica' },
  { id: '5', nome: 'Fade to Black', artista: 'Metallica' },
  { id: '6', nome: 'For Whom the Bell Tolls', artista: 'Metallica' },
  { id: '7', nome: 'Seek & Destroy', artista: 'Metallica' },
  { id: '8', nome: 'Creeping Death', artista: 'Metallica' },
  { id: '9', nome: 'Battery', artista: 'Metallica' },
  { id: '10', nome: 'Welcome Home (Sanitarium)', artista: 'Metallica' },
  { id: '11', nome: 'The Unforgiven', artista: 'Metallica' },
  { id: '12', nome: 'Sad but True', artista: 'Metallica' },
  { id: '13', nome: 'Wherever I May Roam', artista: 'Metallica' },
  { id: '14', nome: 'Harvester of Sorrow', artista: 'Metallica' },
  { id: '15', nome: 'Blackened', artista: 'Metallica' },
  { id: '16', nome: 'Orion', artista: 'Metallica' },
  { id: '17', nome: 'Ride the Lightning', artista: 'Metallica' },
  { id: '18', nome: 'The Four Horsemen', artista: 'Metallica' },
  { id: '19', nome: 'Whiplash', artista: 'Metallica' },
  { id: '20', nome: 'Fuel', artista: 'Metallica' },
  { id: '21', nome: 'The Memory Remains', artista: 'Metallica' },
  { id: '22', nome: 'King Nothing', artista: 'Metallica' },
  { id: '23', nome: 'Until It Sleeps', artista: 'Metallica' },
  { id: '24', nome: 'Moth Into Flame', artista: 'Metallica' },
  { id: '25', nome: 'Lux Æterna', artista: 'Metallica' },

  { id: '26', nome: 'Hail to the King', artista: 'Avenged Sevenfold' },
  { id: '27', nome: 'Nightmare', artista: 'Avenged Sevenfold' },
  { id: '28', nome: 'Bat Country', artista: 'Avenged Sevenfold' },
  { id: '29', nome: 'Afterlife', artista: 'Avenged Sevenfold' },
  { id: '30', nome: 'A Little Piece of Heaven', artista: 'Avenged Sevenfold' },
  { id: '31', nome: 'So Far Away', artista: 'Avenged Sevenfold' },
  { id: '32', nome: 'Buried Alive', artista: 'Avenged Sevenfold' },
  { id: '33', nome: 'Shepherd of Fire', artista: 'Avenged Sevenfold' },
  { id: '34', nome: 'Critical Acclaim', artista: 'Avenged Sevenfold' },
  { id: '35', nome: 'Almost Easy', artista: 'Avenged Sevenfold' },
  { id: '36', nome: 'Beast and the Harlot', artista: 'Avenged Sevenfold' },
  { id: '37', nome: 'Seize the Day', artista: 'Avenged Sevenfold' },
  { id: '38', nome: 'Unholy Confessions', artista: 'Avenged Sevenfold' },
  { id: '39', nome: 'Second Heartbeat', artista: 'Avenged Sevenfold' },
  { id: '40', nome: 'Chapter Four', artista: 'Avenged Sevenfold' },
  { id: '41', nome: 'Dear God', artista: 'Avenged Sevenfold' },
  { id: '42', nome: 'Welcome to the Family', artista: 'Avenged Sevenfold' },
  { id: '43', nome: 'Save Me', artista: 'Avenged Sevenfold' },
  { id: '44', nome: 'God Hates Us', artista: 'Avenged Sevenfold' },
  { id: '45', nome: 'This Means War', artista: 'Avenged Sevenfold' },
  { id: '46', nome: 'The Stage', artista: 'Avenged Sevenfold' },
  { id: '47', nome: 'Paradigm', artista: 'Avenged Sevenfold' },
  { id: '48', nome: 'Exist', artista: 'Avenged Sevenfold' },
  { id: '49', nome: 'Nobody', artista: 'Avenged Sevenfold' },
  { id: '50', nome: 'Mattel', artista: 'Avenged Sevenfold' },

  { id: '51', nome: "Sweet Child O' Mine", artista: "Guns N' Roses" },
  { id: '52', nome: "Welcome to the Jungle", artista: "Guns N' Roses" },
  { id: '53', nome: "Paradise City", artista: "Guns N' Roses" },
  { id: '54', nome: "November Rain", artista: "Guns N' Roses" },
  { id: '55', nome: "Knockin' on Heaven's Door", artista: "Guns N' Roses" },
  { id: '56', nome: "Don't Cry", artista: "Guns N' Roses" },
  { id: '57', nome: "Patience", artista: "Guns N' Roses" },
  { id: '58', nome: "Civil War", artista: "Guns N' Roses" },
  { id: '59', nome: "You Could Be Mine", artista: "Guns N' Roses" },
  { id: '60', nome: "Nightrain", artista: "Guns N' Roses" },
  { id: '61', nome: "Rocket Queen", artista: "Guns N' Roses" },
  { id: '62', nome: "Mr. Brownstone", artista: "Guns N' Roses" },
  { id: '63', nome: "It's So Easy", artista: "Guns N' Roses" },
  { id: '64', nome: "My Michelle", artista: "Guns N' Roses" },
  { id: '65', nome: "Out ta Get Me", artista: "Guns N' Roses" },
  { id: '66', nome: "Estranged", artista: "Guns N' Roses" },
  { id: '67', nome: "Live and Let Die", artista: "Guns N' Roses" },
  { id: '68', nome: "Yesterdays", artista: "Guns N' Roses" },
  { id: '69', nome: "14 Years", artista: "Guns N' Roses" },
  { id: '70', nome: "Dead Horse", artista: "Guns N' Roses" },
  { id: '71', nome: "Coma", artista: "Guns N' Roses" },
  { id: '72', nome: "Locomotive", artista: "Guns N' Roses" },
  { id: '73', nome: "Pretty Tied Up", artista: "Guns N' Roses" },
  { id: '74', nome: "Double Talkin' Jive", artista: "Guns N' Roses" },
  { id: '75', nome: "Chinese Democracy", artista: "Guns N' Roses" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Text style={styles.titulo}>Minhas músicas</Text>
      <Text style={styles.subtitulo}>Lista de músicas:</Text>

      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.artista}>{item.artista}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 15,
  },
  lista: {
    paddingBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  artista: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});
