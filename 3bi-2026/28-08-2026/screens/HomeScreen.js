import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const baseUrl =
  'https://raw.githubusercontent.com/GabryelTenorio/PW3/main/3bi-2026/31-07-2026';

const secoes = [
  {
    titulo: 'Suas Junkbox',
    itens: [
      { nome: 'Favoritas', imagem: 'images (1).jpg' },
      { nome: 'Mix diário', imagem: 'images (2).jpg' },
      { nome: 'Descobertas', imagem: 'images (3).jpg' },
    ],
  },
  {
    titulo: 'Músicas em Alta',
    itens: [
      { nome: 'Top Hits', imagem: 'images (4).jpg' },
      { nome: 'Em alta agora', imagem: 'images (5).jpg' },
      { nome: 'Novidades', imagem: 'images (6).jpg' },
    ],
  },
  {
    titulo: 'Suas Playlists',
    itens: [
      { nome: 'Minha playlist', imagem: 'images.jpg' },
      { nome: 'Para relaxar', imagem: 'download (1).jpg' },
      { nome: 'Para treinar', imagem: 'download.jpg' },
    ],
  },
];

function MusicCard({ item }) {
  const imageUrl = `${baseUrl}/${encodeURIComponent(item.imagem)}`;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.nome}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.page} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Olá, usuário</Text>
        <Text style={styles.description}>
          Continue ouvindo o que combina com o seu momento.
        </Text>

        {secoes.map((secao) => (
          <View key={secao.titulo} style={styles.section}>
            <Text style={styles.sectionTitle}>{secao.titulo}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              {secao.itens.map((item) => (
                <MusicCard key={`${secao.titulo}-${item.nome}`} item={item} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingVertical: 22,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111111',
    paddingHorizontal: 18,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 18,
    marginTop: 6,
    marginBottom: 10,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  row: {
    paddingHorizontal: 18,
    paddingBottom: 4,
  },
  card: {
    width: 160,
    marginRight: 14,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 14,
    backgroundColor: '#dddddd',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
    marginTop: 8,
  },
});
