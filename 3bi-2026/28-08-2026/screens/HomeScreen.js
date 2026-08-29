import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const musicas = [
  { id: '1', nome: 'Enter Sandman', artista: 'Metallica' },
  { id: '2', nome: 'Hail to the King', artista: 'Avenged Sevenfold' },
  { id: '3', nome: 'Back in Black', artista: 'AC/DC' },
  { id: '4', nome: 'Master of Puppets', artista: 'Metallica' },
  { id: '5', nome: 'Nightmare', artista: 'Avenged Sevenfold' },
  { id: '6', nome: 'Paranoid', artista: 'Black Sabbath' },
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
