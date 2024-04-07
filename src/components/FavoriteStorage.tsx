import AsyncStorage from '@react-native-async-storage/async-storage';
const FAVORITES_KEY = '@favorites';

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

export const getFavorites = async (): Promise<PlantData[]> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

export const getUpdatedFavorites = (
  plant: PlantData,
  favorites: PlantData[],
): PlantData[] => {
  const index = favorites.findIndex(p => p.id === plant.id);
  if (index !== -1) {
    return favorites.filter(p => p.id !== plant.id);
  } else {
    return [...favorites, plant];
  }
};

export const toggleFavorite = async (plant: PlantData): Promise<void> => {
  try {
    let favorites: PlantData[] = await getFavorites();
    const updatedFavorites = getUpdatedFavorites(plant, favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};
