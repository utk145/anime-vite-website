import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import Sider from './Sider';


const UpcomingStyles = styled.div`
  display:flex;
  .upcoming_anime{
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
    .upcoming_anime {
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

const Upcoming = ({ rendered }) => {
  // const  global = useGlobalContext();
  // console.log(global);

  const { upcoming, isSearch, searchResults } = useGlobalContext();
  const render = () => {
    if (!isSearch && rendered === "upcoming") {
      return upcoming?.map((anime) => {
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

    <UpcomingStyles>
      <div className="upcoming_anime">
        {render()}
      </div>
      <Sider tobe={"Upcoming"} type={"upcoming"}/>
    </UpcomingStyles>

  )
}






export default Upcoming


