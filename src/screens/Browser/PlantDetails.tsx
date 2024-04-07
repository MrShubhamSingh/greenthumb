import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

interface PlantDetailProps {
  plant: {
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
  };
}

const PlantDetail: React.FC<PlantDetailProps> = ({route}) => {
  const {plant} = route.params;
  return (
    <View style={styles.container}>
      <Image source={{uri: plant.image_url}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Scientific Name:</Text>
          <Text style={styles.value}>{plant.scientific_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Common Name:</Text>
          <Text style={styles.value}>{plant.common_name || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Family:</Text>
          <Text style={styles.value}>{plant.family}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Author:</Text>
          <Text style={styles.value}>{plant.author}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bibliography:</Text>
          <Text style={styles.value}>{plant.bibliography}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{plant.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{plant.year}</Text>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.3, // 30% of screen height
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '50%',
    fontWeight: 'bold',
  },
  value: {
    width: '50%',
  },
});

export default PlantDetail;
