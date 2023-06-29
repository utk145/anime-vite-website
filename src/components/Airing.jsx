import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import Sider from './Sider';


const AiringStyles = styled.div`
  display:flex;
  .airing_anime{
    margin-top:2rem;
    padding-top:2rem;
    padding-bottom:2rem;
    padding-left:2rem;
    padding-right:0;
    width:100%;
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    grid-gap:2rem;
    background-color:#2e2526;
    border-top:5px solid #909090;
    a{
      height:500px;
      border:5px solid #909090;
      border-radius:10px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        &:hover{
          transition: transform 0.3s ease-in-out;
          transform: scale(1.01);
        }
      }
      span{
        color:#27ae60;
        text-decoration:none;
        opacity:.7;
      }
    }

  }
  @media (max-width: 426px) {
    .airing_anime {
      a {
        height: 150px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
    }
  }
`;

const Airing = ({ rendered }) => {
  // const  global = useGlobalContext();
  // console.log(global);

  const { airing, isSearch, searchResults } = useGlobalContext();
  const render = () => {
    if (!isSearch && rendered === "airing") {
      return airing?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.webp.large_image_url} alt="large_image_url" />
        </Link>
      })
    } else {
      return searchResults?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.webp.large_image_url} alt="large_image_url" />
        </Link>
      })
    }
  }

  return (

    <AiringStyles>
      <div className="airing_anime">
        {render()}
      </div>
      <Sider tobe={"Airing"} type={"airing"}/>
    </AiringStyles>

  )
}






export default Airing


