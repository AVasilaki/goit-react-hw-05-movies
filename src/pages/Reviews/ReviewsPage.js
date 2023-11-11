import { fetchApi } from 'takeApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}/reviews`;
      try {
        const resp = await fetchApi(endPoint, page);
        console.log(resp);
        // setMovieDetail(resp.data);
        // setGenres(resp.data.genres);
        setReviews(resp.data.results);
      } catch (error) {
        console.error(error);
        alert('something wrong');
        return error;
      } finally {
      }
    }
    getI();
  }, [id]);
  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
