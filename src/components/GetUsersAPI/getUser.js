const API_KEY = '36028425-48f97f4e693396b4b6c5eb90a';

export default async function getInfoFromApi(value, page) {
  const URL = `https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}
