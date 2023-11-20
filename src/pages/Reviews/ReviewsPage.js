import { fetchApi } from 'takeApi';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}/reviews`;
      try {
        const resp = await fetchApi(endPoint, page);

        setReviews(resp.data.results);
      } catch (error) {
        console.error(error);
        alert('something wrong');
        return error;
      } finally {
      }
    }
    getI();
  }, [id, page]);
  return (
    <>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)}>load more</button>
    </>
  );
}
