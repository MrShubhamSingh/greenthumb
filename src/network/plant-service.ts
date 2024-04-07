import axios from 'axios';

const baseURL = 'https://trefle.io/api/v1/';
const token = 'LBBEuV-39I_7SRrYDzJjLmf10CvbRbqsnloIfRO-9wE';

export const getPlants = async (page = 1) => {
  try {
    const response = await axios.get(
      `${baseURL}plants?token=${token}&page=${page}`,
    );
    const {data, meta} = response.data;
    return {data, meta};
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
