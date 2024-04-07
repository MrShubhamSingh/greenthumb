import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Plant from '../Browser/Plant';
import {getFavorites} from '../../components/FavoriteStorage';

interface PlantData {
  author: string;
  bibliography: string;
  common_name: string | null;
  family: string;
  family_common_name: string | null;
  genus: string;
  genus_id: number;
  id: number;
  links: {
    genus: string;
    plant: string;
    self: string;
  };
  plant_id: number;
  rank: string;
  scientific_name: string;
  slug: string;
  status: string;
  synonyms: string[];
  year: number;
  image_url: string;
}

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<PlantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFavorites()
      .then(favorites => {
        setFavorites(favorites);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting favorites:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({item}: {item: PlantData}) => {
    return <Plant item={{...item, isFavorite: true}} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<ActivityIndicator size="large" />}
      />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    top: 0,
  },
});

export default FavoritesList;
