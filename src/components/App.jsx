import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import { PixabayAPIRequest } from './PixabayAPI/API';
import { useState, useEffect } from 'react';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [searchValue, setSearchValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handleFormSubmit = seacrhParam => {
    setSearchValue([]);
    setPage(1);
    setSearchRequest(seacrhParam);
  };

  const onChangePage = () => {
    setPage(state => state + 1);
  };

  const getNormalizedPhotos = arr => {
    return arr.map(({ id, webformatURL, tags, largeImageURL }) => ({
      id,
      webformatURL,
      tags,
      largeImageURL,
    }));
  };

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const { totalHits, hits } = await PixabayAPIRequest(
          searchRequest,
          page
        );
        if (totalHits < 1) {
          setLoading(false);
          return alert(`${search} not found, Sorry!`);
        }
        setSearchValue(prev =>
          page === 1
            ? getNormalizedPhotos(hits)
            : [...prev, ...getNormalizedPhotos(hits)]
        );
        setTotalPage(Math.ceil(totalHits / 12));
      } catch ({ message }) {
        console.log(message);
      } finally {
        setLoading(false);
      }
    };

    if (!searchRequest) return;

    search();
  }, [searchRequest, page]);

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ImageGallery searchValue={searchValue}></ImageGallery>
      {loading && <Loader></Loader>}
      {totalPage > 1 && page < totalPage && (
        <LoadMoreBtn onClick={onChangePage} />
      )}
    </Container>
  );
};
