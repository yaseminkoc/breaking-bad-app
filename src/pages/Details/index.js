import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loading from '../../components/Loading';
function Detail() {
  const {char_id} = useParams();
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`).then((res) => res.data).then(data => setChar(data[0])).finally(setLoading(false));
    
  },[char_id])
  return (
    <div>
      {loading && <Loading/>}
      {
        char && <div>
        <h1>{char.name}</h1>
        <img src={char.img} alt="" style={{width:"50%"}}/>
        </div>}
        {char && <pre>{JSON.stringify(char, null, 2)}</pre>}
    </div>    
  )
}

export default Detail