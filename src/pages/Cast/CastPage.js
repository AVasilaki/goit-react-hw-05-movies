import { fetchApi } from 'takeApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper, WrapperCard } from './CastPage.styled';

export default function Casts() {
  const [actors, setActors] = useState([]);
  const { id } = useParams();
  // const location = useLocation();
  // console.log(location);
  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}/credits`;
      try {
        const resp = await fetchApi(endPoint);

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
    <Wrapper>
      {actors.map(actor => (
        <WrapperCard key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : 'https://gdr.one/simg/200x305/5094bd/fff?text=Avatar'
            }
            alt={actor.name}
          ></img>
          <h3>{actor.name}</h3>
          <p>character : "{actor.character}"</p>
        </WrapperCard>
      ))}
    </Wrapper>
  );
}
