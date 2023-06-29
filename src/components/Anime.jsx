import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';

const AnimeItem = styled.div`
    padding:3rem 8rem;
    background-color:#332426;
    h1{
        display:inline-block;
        font-size:3rem;
        margin-bottom:1.5rem;
        cursor:pointer;
        background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform:skew(-7deg);
        }
    }
    .tariler{
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background:linear-gradient( to right, #A855F7 23%, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .description{
        margin-top:2rem;
        color:#6c7983;
        line-height:1.7rem;
        button{
            border:none;        
            border-color:transparent;
            outline:none;
            font-size:1.2rem;
            cursor:pointer;
            font-weight:600;
            color:#27ae60;
            margin-left:.6rem;
        }
    }
    .details{
        // background-color:#3e3738;
        // background-color:#3c2326;
        background-color:#2a1d1e;
        border-radius:20px;
        padding:2rem;;
        border:5px solid #6c7983;       
        .detail{
            display:grid;
            grid-template-columns:repeat(2,1fr);
            padding:1.3rem;
            img{
                border-radius:8px;
            }
            .anime_details{
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                p{
                    display: flex;
                    gap: 1rem;
                }
                p span:first-child{
                    font-weight: 600;
                    color: #454e56;
                }
            }
        }
        .trailer_container{
            display: flex;
            justify-content: center;
            align-items: center;
            iframe{
                outline: none;
                border: 2px solid #6c7983;
                padding: .5rem;
                border-radius: 10px;
                background-color: #2a1d1e;
            }
        }
    }
    .characters{
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
        gap:2rem;
        background-color:#2A1D1E;
        padding:2rem;
        border-radius:20px;
        border:5px solid #6C7983;
        .character{
            padding:.4rem .6rem;
            background-color:#332426;
            transition:all .4s ease-in-out;
            img{
                width:100%;
                overflow:hidden;
            }
            h4{
                padding:.5rem 0;
                color:#454e56;
            }
            p{
                color:#27ae60;
            }
            &:hover{
                transform:translateY(-5px);
            }
        }
    }
    .back{
        position:absolute;
        left:1.1rem;
        top:1rem;
        a{
          font-weight:600;
          color:#D5B693;
          text-decoration:none;
        }
      }
   
`;


const Anime = () => {
    const { id } = useParams();
    // console.log(id);

    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);


    const getAnimeDetails = async (anime) => {
        // const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
        console.log(data.data);
    }

    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        console.log("Characters : ", data.data);
    }
    useEffect(() => {
        getAnimeDetails(id);
        getCharacters(id);
    }, [])

    const { title, title_english, synopsis, trailer, duration, aired, season, images, rank, score, scored_by, popularity, status, rating, source, genres } = anime;

    return (
        <AnimeItem>
            <div className="back"><Link to="/"><i class="fa-solid fa-angle-left fa-sm"></i> Home</Link></div>

            <h1>{title_english}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.webp.large_image_url} alt="anime-image" />
                    </div>
                    <div className="anime_details">
                        <p><span>Aired: </span><span>{aired?.string}</span></p>
                        <p><span>Rating: </span><span>{rating}</span></p>
                        <p><span>Rank: </span><span>{rank}</span></p>
                        <p><span>Score: </span><span>{score}</span></p>
                        {/* <p><span>Scored By: </span><span>{scored_by}</span></p> */}
                        <p>
                            <span>Genre: </span>
                            {genres?.map((genre) => (
                                <span key={genre.mal_id}>{genre.name}</span>
                            ))}
                        </p>
                        <p><span>Popularity: </span><span>{popularity}</span></p>
                        <p><span>Status: </span><span>{status}</span></p>
                        <p><span>Source: </span><span>{source}</span></p>
                        <p><span>Season: </span><span>{season}</span></p>
                        <p><span>Duration: </span><span>{duration}</span></p>
                    </div>
                    <p className="description">
                        {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                        <button onClick={() => {
                            setShowMore(!showMore)
                        }}>{showMore ? 'Show Less' : 'Read More'}</button>
                    </p>
                </div>
                <h3 className="tariler">Trailer</h3>
                <div className="trailer_container">
                    {trailer?.embed_url ? <iframe src={trailer?.embed_url} title="Inline Frame Example" width="800" height="450" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <h3>Trailer isn't available </h3>}
                </div>
            </div>
            <h3 className="tariler">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const { role } = character;
                    const { name, images, mal_id } = character.character;
                    // console.log(name);
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.webp.image_url ? images.webp.image_url : images?.webp.large_image_url} alt="character_image" />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                }
                )}
            </div>
        </AnimeItem>
    )
}

export default Anime
