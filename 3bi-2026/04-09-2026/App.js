import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [valorInicial, setValorInicial] = useState('');
  const [taxa, setTaxa] = useState('');
  const [tipoTaxa, setTipoTaxa] = useState('anual');
  const [periodo, setPeriodo] = useState('');
  const [tipoPeriodo, setTipoPeriodo] = useState('anos');
  const [aporteMensal, setAporteMensal] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function converterNumero(valor) {
    if (!valor) return 0;

    let texto = String(valor).trim().replace(/\s/g, '').replace('R$', '');
    const ultimaVirgula = texto.lastIndexOf(',');
    const ultimoPonto = texto.lastIndexOf('.');

    if (ultimaVirgula > -1 && ultimoPonto > -1) {
      if (ultimaVirgula > ultimoPonto) {
        texto = texto.replace(/\./g, '').replace(',', '.');
      } else {
        texto = texto.replace(/,/g, '');
      }
    } else if (ultimaVirgula > -1) {
      texto = texto.replace(',', '.');
    }

    const numero = Number(texto);
    return Number.isFinite(numero) ? numero : NaN;
  }

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function calcular() {
    const inicial = converterNumero(valorInicial);
    const juros = converterNumero(taxa);
    const tempo = converterNumero(periodo);
    const aporte = converterNumero(aporteMensal);

    if (
      !Number.isFinite(inicial) ||
      !Number.isFinite(juros) ||
      !Number.isFinite(tempo) ||
      !Number.isFinite(aporte)
    ) {
      setErro('Preencha os campos apenas com números válidos.');
      setResultado(null);
      return;
    }

    if (inicial < 0 || juros < 0 || tempo <= 0 || aporte < 0) {
      setErro('Use valores positivos e um período maior que zero.');
      setResultado(null);
      return;
    }

    const meses = tipoPeriodo === 'anos' ? Math.round(tempo * 12) : Math.round(tempo);

    if (meses <= 0) {
      setErro('O período precisa representar pelo menos 1 mês.');
      setResultado(null);
      return;
    }

    const taxaDecimal = juros / 100;
    const taxaMensal =
      tipoTaxa === 'anual'
        ? Math.pow(1 + taxaDecimal, 1 / 12) - 1
        : taxaDecimal;

    let montante;

    if (taxaMensal === 0) {
      montante = inicial + aporte * meses;
    } else {
      const fator = Math.pow(1 + taxaMensal, meses);
      const valorInicialCorrigido = inicial * fator;
      const valorAportes = aporte * ((fator - 1) / taxaMensal);
      montante = valorInicialCorrigido + valorAportes;
    }

    const totalInvestido = inicial + aporte * meses;
    const totalJuros = montante - totalInvestido;

    setErro('');
    setResultado({
      montante,
      totalInvestido,
      totalJuros,
      meses,
      taxaMensal: taxaMensal * 100,
    });
  }

  function limpar() {
    setValorInicial('');
    setTaxa('');
    setTipoTaxa('anual');
    setPeriodo('');
    setTipoPeriodo('anos');
    setAporteMensal('');
    setResultado(null);
    setErro('');
  }

  function Opcao({ ativo, texto, onPress }) {
    return (
      <TouchableOpacity
        style={[styles.opcao, ativo && styles.opcaoAtiva]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={[styles.opcaoTexto, ativo && styles.opcaoTextoAtivo]}>{texto}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f5f7" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.titulo}>Juros Compostos</Text>
          <Text style={styles.subtitulo}>
            Simule quanto seu dinheiro pode render ao longo do tempo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Valor inicial</Text>
          <View style={styles.inputLinha}>
            <Text style={styles.prefixo}>R$</Text>
            <TextInput
              style={styles.input}
              value={valorInicial}
              onChangeText={setValorInicial}
              placeholder="0,00"
              keyboardType="decimal-pad"
            />
          </View>

          <Text style={styles.label}>Taxa de juros</Text>
          <View style={styles.inputLinha}>
            <Text style={styles.prefixo}>%</Text>
            <TextInput
              style={styles.input}
              value={taxa}
              onChangeText={setTaxa}
              placeholder="0,00"
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.seletor}>
            <Opcao
              texto="Anual"
              ativo={tipoTaxa === 'anual'}
              onPress={() => setTipoTaxa('anual')}
            />
            <Opcao
              texto="Mensal"
              ativo={tipoTaxa === 'mensal'}
              onPress={() => setTipoTaxa('mensal')}
            />
          </View>

          <Text style={styles.label}>Período</Text>
          <TextInput
            style={styles.inputSozinho}
            value={periodo}
            onChangeText={setPeriodo}
            placeholder="0"
            keyboardType="decimal-pad"
          />
          <View style={styles.seletor}>
            <Opcao
              texto="Anos"
              ativo={tipoPeriodo === 'anos'}
              onPress={() => setTipoPeriodo('anos')}
            />
            <Opcao
              texto="Meses"
              ativo={tipoPeriodo === 'meses'}
              onPress={() => setTipoPeriodo('meses')}
            />
          </View>

          <Text style={styles.label}>Investimento mensal</Text>
          <View style={styles.inputLinha}>
            <Text style={styles.prefixo}>R$</Text>
            <TextInput
              style={styles.input}
              value={aporteMensal}
              onChangeText={setAporteMensal}
              placeholder="0,00"
              keyboardType="decimal-pad"
            />
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.botaoCalcular} onPress={calcular} activeOpacity={0.85}>
            <Text style={styles.botaoCalcularTexto}>CALCULAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoLimpar} onPress={limpar} activeOpacity={0.85}>
            <Text style={styles.botaoLimparTexto}>LIMPAR</Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.resultadoCard}>
            <Text style={styles.resultadoTitulo}>Resultado</Text>

            <Text style={styles.resultadoLegenda}>Montante final</Text>
            <Text style={styles.montante}>{formatarMoeda(resultado.montante)}</Text>

            <View style={styles.divisor} />

            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Total investido</Text>
              <Text style={styles.resumoValor}>{formatarMoeda(resultado.totalInvestido)}</Text>
            </View>

            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Juros acumulados</Text>
              <Text style={styles.resumoValor}>{formatarMoeda(resultado.totalJuros)}</Text>
            </View>

            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Período calculado</Text>
              <Text style={styles.resumoValor}>{resultado.meses} meses</Text>
            </View>

            <Text style={styles.observacao}>
              Taxa equivalente usada no cálculo: {resultado.taxaMensal.toFixed(4).replace('.', ',')}% ao mês.
              Os aportes mensais são considerados no fim de cada mês.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f5f7',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 8,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#15181d',
  },
  subtitulo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#626a73',
    marginTop: 7,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e6ea',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#30353b',
    marginTop: 15,
    marginBottom: 7,
  },
  inputLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: '#cfd5db',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  prefixo: {
    height: '100%',
    paddingHorizontal: 14,
    textAlignVertical: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#4f5862',
    backgroundColor: '#f0f2f4',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#171a1f',
  },
  inputSozinho: {
    height: 52,
    borderWidth: 1,
    borderColor: '#cfd5db',
    borderRadius: 12,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#171a1f',
    backgroundColor: '#ffffff',
  },
  seletor: {
    flexDirection: 'row',
    backgroundColor: '#edf0f2',
    borderRadius: 10,
    padding: 4,
    marginTop: 8,
  },
  opcao: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  opcaoAtiva: {
    backgroundColor: '#15181d',
  },
  opcaoTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: '#626a73',
  },
  opcaoTextoAtivo: {
    color: '#ffffff',
  },
  erro: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 19,
    color: '#b3261e',
  },
  botaoCalcular: {
    marginTop: 22,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15181d',
  },
  botaoCalcularTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  botaoLimpar: {
    marginTop: 10,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cfd5db',
    backgroundColor: '#ffffff',
  },
  botaoLimparTexto: {
    color: '#333940',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resultadoCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#15181d',
  },
  resultadoTitulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
  },
  resultadoLegenda: {
    color: '#b9c0c7',
    fontSize: 13,
  },
  montante: {
    marginTop: 4,
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },
  divisor: {
    height: 1,
    backgroundColor: '#343a40',
    marginVertical: 18,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 11,
  },
  resumoLabel: {
    flex: 1,
    color: '#b9c0c7',
    fontSize: 13,
  },
  resumoValor: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  observacao: {
    marginTop: 10,
    color: '#949da6',
    fontSize: 11,
    lineHeight: 17,
  },
});
