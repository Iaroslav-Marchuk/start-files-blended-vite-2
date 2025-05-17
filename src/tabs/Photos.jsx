import Form from '../components/Form/Form';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';

import { useState } from 'react';

import { getPhotos } from '../apiService/photos';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getQuery = async (topic, page = 1) => {
    try {
      setIsLoading(true);
      setError(false);

      const data = await getPhotos(topic, page);

      if (page === 1) {
        setQuery(topic);
        setImages(data.photos);
        if (data.photos.length === 0) {
          console.log('No results found for your search. Please try again!');
        }
      } else {
        setImages(prevImages => [...prevImages, ...data.photos]);
      }

      setTotalPages(Math.ceil(data.total_results / data.per_page));
      setPage(page);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const hasImages = images.length > 0;
  const isNotLastPage = page < totalPages;

  const handleLoadMore = () => {
    if (isNotLastPage) {
      const nextpage = page + 1;
      getQuery(query, nextpage);
    }
  };
  return (
    <>
      <Form onSubmit={getQuery} />
      {error && <p>Error</p>}
      {hasImages && <PhotosGallery images={images} />}
      {isLoading && <Loader />}
      {hasImages && !isLoading && isNotLastPage && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
    </>
  );
};

export default Photos;
