
import axios from 'axios';

export const ReadFromSheet = async ({ sheet, filter = {} }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  try {
    const response = await axios.post(`${backendUrl}/read`,{ sheet, filter });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Erreur ${error.response.status}: ${error.response.data.message || 'Erreur serveur'}`);
    } else if (error.request) {
      throw new Error('Pas de réponse du serveur');
    } else {
      throw new Error('Erreur de configuration de la requête');
    }
  }
};