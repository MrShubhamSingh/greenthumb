import React, {memo, useEffect, useState} from 'react';
import {Pressable, Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getFavorites, toggleFavorite} from '../../components/FavoriteStorage';
import {useNavigation} from '@react-navigation/native';
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
function Plant({item}: {item: PlantData}) {
  const {id, common_name, scientific_name, image_url} = item;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigation = useNavigation();

  // Check if the current plant is already a favorite
  useEffect(() => {
    // Assuming getFavorites is a function to retrieve favorite plants
    getFavorites().then(favorites => {
      setIsFavorite(favorites.some(fav => fav.id === id));
    });
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(item);
      setIsFavorite(prev => !prev);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  function showPlantDetail() {
    navigation.navigate('PlantDetail', {plant: item});
  }
  return (
    <Pressable onPress={showPlantDetail} style={styles.plant}>
      <View style={styles.container}>
        <View style={styles.thumbnailImg}>
          <Image source={{uri: image_url}} style={styles.thumbnailImg} />
        </View>
        <View style={styles.detail}>
          <Text>{common_name}</Text>
          <Text>{scientific_name}</Text>
        </View>
        <Pressable onPress={handleToggleFavorite} style={styles.fvrt}>
          {isFavorite ? (
            <Icon name="heart" size={20} color="red" />
          ) : (
            <Icon name="heart-outline" size={20} />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  plant: {
    justifyContent: 'center',
    margin: 5,
    padding: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 6,
    color: '#000',
    elevation: 3, // Only for Android
    shadowOpacity: 0.5, // Only for iOS
    shadowOffset: {width: 0, height: 2}, // Only for iOS
    shadowColor: '#000', // Only for iOS
  },
  container: {
    flexDirection: 'row',
  },
  detail: {
    flexDirection: 'column',
    padding: 5,
  },
  thumbnailImg: {
    height: 100,
    width: 100,
  },
  fvrt: {
    position: 'absolute',
    padding: 5,
    right: 0,
  },
});

export default memo(Plant);
