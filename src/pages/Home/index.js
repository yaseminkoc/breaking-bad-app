import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCharacters } from '../../redux/charactersSlice';

function Home() {
    const data = useSelector((state) => state.characters)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCharacters());
    }, [])
  return (
    <div>Home</div>
  )
}

export default Home