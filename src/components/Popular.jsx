import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import Sider from './Sider';


const PopularStyles = styled.div`
  display:flex;
  .popular_anime{
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

  // @media (max-width: 768px) {
  //   flex-direction: column;
  //   .popular_anime {
  //     width: 100%;
  //     margin-bottom: 2rem;

  //     a {
  //       height: 250px;
  //       border: 5px solid #909090;
  //       border-radius: 10px;

  //       img {
  //         width: 100%;
  //         height: 100%;
  //         object-fit: cover;
  //         border-radius: 10px;

  //         &:hover {
  //           transition: transform 0.3s ease-in-out;
  //           transform: scale(1.01);
  //         }
  //       }

  //       span {
  //         color: #27ae60;
  //         text-decoration: none;
  //         opacity: .7;
  //       }
  //     }
  //   }
  // }

  @media (max-width: 426px) {
    .popular_anime {
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

const Popular = ({ rendered }) => {
  // const  global = useGlobalContext();
  // console.log(global);

  const { popular, isSearch, searchResults } = useGlobalContext();
  const render = () => {
    if (!isSearch && rendered === "popular") {
      return popular?.map((anime) => {
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

    <PopularStyles>
      <div className="popular_anime">
        {render()}
      </div>
      <Sider tobe={"Popular"} type={"popular"}/>
    </PopularStyles>

  )
}






export default Popular


