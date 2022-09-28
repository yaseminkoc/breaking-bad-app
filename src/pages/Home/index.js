import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCharacters } from '../../redux/charactersSlice';
import Masonry from 'react-masonry-css';
import "./style.css"
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';

function Home() {
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const characters = useSelector((state) => state.characters.items)
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  const dispatch = useDispatch();
  useEffect(() => {
    if(status ==='idle'){
      dispatch(getCharacters());
    }
  }, [dispatch, status])

  const handleClick = () => {
    dispatch(getCharacters(nextPage));
  }


  if (status === 'failed') return (<Error message={error} />)
  return (
    <div>

      {

        <Masonry
          breakpointCols={4}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {/* array of JSX items */
            characters.map((character) => (
              <div key={character.char_id}>
                <Link to={`/char/${character.char_id}`}>
                  <img alt={character.name} src={character.img} className="character" />
                  <div className='char_name'>{character.name}</div>
                </Link>
              </div>
            ))}
        </Masonry>
      }
      <div style={{ padding: "20px 0 40px 0", textAlign: "center" }} >
        {status==='loading' && <Loading />}
        {hasNextPage && status!=='loading' && (<button onClick={() => handleClick()}>Get More ({nextPage})</button>)}

        {
          !hasNextPage && <div>There is nothing to be shown.</div>
        }
      </div>
    </div>
  )
}

export default Home