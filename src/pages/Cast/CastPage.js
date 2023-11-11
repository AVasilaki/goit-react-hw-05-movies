import { fetchApi } from 'takeApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Casts() {
  const [actors, setActors] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}/credits`;
      try {
        const resp = await fetchApi(endPoint);
        console.log(resp);
        // setMovieDetail(resp.data);
        // setGenres(resp.data.genres);
        setActors(resp.data.cast);
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
      {actors.map(actor => (
        <li key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt=""
          ></img>
          <p>
            {actor.name}
            <span> - character : "{actor.character}"</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
