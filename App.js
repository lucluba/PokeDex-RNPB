import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {fetchPokemonsList} from './apiService';

const App = () => {
  const [data, setData] = useState([]);
  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';

  useEffect(() => {
    (async () => {
      const response = await fetchPokemonsList();
      setData(response.results);
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="red" />
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({item, index, separator}) => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => Alert.alert(item.name, item.url)}
                key={Date.now() + index}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '100',
  },
  button: {
    alignItems: 'center',
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default App;
