import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
});

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

const App = () => {
  const renderItem = ({ item }) => {
    const { id, name, status, species, gender, image } = item;

    return (
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardInfo}>
            Status: {status} | Species: {species} | Gender: {gender}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Rick and Morty GraphQL API Example</Text>
        <Query query={GET_CHARACTERS} variables={{ page: 1 }}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;

            const { results } = data.characters;

            return (
              <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cardContainer}
              />
            );
          }}
        </Query>
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 16,
    color: 'gray',
  },
});

export default App;
