# 14-08-2026

Continuação do projeto **Harmonic Musics** em React Native.

Nesta atividade a troca manual de telas usada anteriormente foi substituída pelo **React Navigation com Native Stack**, seguindo a orientação da aula.

## Estrutura

```text
14-08-2026/
├── App.js
├── app.json
├── package.json
├── navigation/
│   └── StackNavigator.js
└── screens/
    ├── LoginScreen.js
    └── HomeScreen.js
```

## Comandos da orientação

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

Depois de baixar a pasta/projeto:

```bash
npm install
npm start
```

No login, preencha e-mail e senha e pressione **Entrar**. O botão usa `navigation.navigate('Home')` para abrir a tela Home.
