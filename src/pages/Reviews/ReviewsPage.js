import { fetchApi } from 'takeApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}/reviews`;
      try {
        const resp = await fetchApi(endPoint, page);

        setReviews(resp.data.results);
        if (resp.data.page > 1) {
          setBtnLoadMore(true);
        }
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
      {btnLoadMore && (
        <button onClick={() => setPage(page + 1)}>load more</button>
      )}
    </>
  );
}
