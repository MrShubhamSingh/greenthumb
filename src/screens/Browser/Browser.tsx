import React, {useState, useEffect, useCallback, Suspense} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import {getPlants} from '../../network/plant-service';
import {getFavorites} from '../../components/FavoriteStorage';
const Plant = React.lazy(() => import('./Plant'));

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

const PlantsBrowser: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [offlineMode, setOfflineMode] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (!offlineMode) {
      getPlants(page)
        .then((result: {data: PlantData[]; meta?: Meta}) => {
          const {data, meta} = result;
          if (meta && meta.total) {
            const {total: totalPlants} = meta;
            setTotal(totalPlants);
          }
          setPlantData(prevData => [...prevData, ...data]);
          setLoading(false);
        })
        .catch((error: any) => {
          console.warn(error);
          setLoading(false);
          setOfflineMode(true);
        });
    } else {
      getFavorites()
        .then(favorites => {
          setPlantData(favorites);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error getting favorites:', error);
          setLoading(false);
        });
    }
  }, [page, offlineMode]);

  useEffect(() => {
    getFavorites()
      .then(favorites => setFavorites(favorites.map(fav => fav.id)))
      .catch(error => console.error('Error getting favorites:', error));
  }, []);

  const keyExtractor = useCallback((item: PlantData, index: number) => {
    // Use both id and index to create a unique key
    return item.id.toString() + '-' + index.toString();
  }, []);

  const renderItem = ({item}: {item: PlantData}) => {
    return <Plant item={{...item, isFavorite: favorites.includes(item.id)}} />;
  };

  const handlePagination = useCallback(() => {
    if (!offlineMode && total !== plantData.length) {
      setPage(prevPage => prevPage + 1);
    }
  }, [offlineMode, total, plantData]);

  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator size="small" />}>
        <FlatList
          data={plantData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={handlePagination}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </Suspense>
      {loading && plantData.length > 0 && <ActivityIndicator size="large" />}
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

export default PlantsBrowser;
