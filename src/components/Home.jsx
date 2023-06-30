import React, { useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import Airing from './Airing';
import Popular from './Popular';
import Upcoming from './Upcoming';


const HomeComp = styled.div`
    header{
        padding:2rem 5rem;
        width:64%;
        margin:0 auto;
        transition:all .4s ease-in-out;
        .logo{
            display:flex;
            align-items:center;
            justify-content:center;
            margin-bottom:2rem;
        }
        .search{
            display:flex;
            gap:1rem;
            align-items:center;
            justify-content:center;
            
            button{
                display:flex;
                align-items:center;
                gap:.5rem;
                padding:.7rem 1.5rem;
                font-size:1.2rem;
                background-color:#97b1c5;
                outline:none;
                border-radius:30px;
                transition:all .4s ease-in-out;
                cursor:pointer;
                font-family:inherit;
                border:5px solid #e5e7eb;
                i{
                    background-color: transparent;
                }
            }
            form{
                position:relative;
                width:100%;
                .input_control{
                    position:relative;
                    transition:all .4s ease-in-out;
                }
                .input_control input{
                    width:100%;
                    padding:.7rem 1rem;
                    border:none;
                    outline:none;
                    border-radius:30px;
                    font-size:1.2rem;
                    background-color:#e5e7eb;
                    transition:all .4s ease-in-out;
                    &::placeholder {
                        // color:#27AE5C;
                    }
                }
                .input_control button{
                    position:absolute;
                    right:34%;
                    top:170%;
                    transform:translateY(-50%);
                    border:2.3px solid #d9d9d9;
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        header{
          width:100%;
        }
        .logo{
          margin-bottom:0;
        }
        .search{
          flex-direction:column;
          .filter_btn{
            margin-bottom:1rem;
          }
        }
    }
    @media (max-width: 425px) {
        header{
          padding:1rem 2rem;
        }
        .logo{
          margin-bottom:1rem;
          h1{
            text-align:justify;
          }
        }
        .search{
          flex-direction:column;
          align-items:flex-start;
          .filter_btn{
            width:100%;
          }
          .input_control{
            margin-bottom:0;
          }
        }
    }
   
`;


const Home = () => {

    const { handleSearchChange, handleSubmitSearch, searchAnime, search, getAiringAnime, getPopularAnime, getUpcomingAnime } = useGlobalContext();

    const [rendered, setRendered] = useState("popular");
    const switchType = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }
    return (
        <HomeComp>
            <header>
                <div className="logo">
                    <h1> {rendered === 'popular' ? 'Popular Anime' :
                        rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}</h1>
                </div>
                <div className="search">
                    <div className="filter_btn popular_filter">
                        <button onClick={() => { setRendered("popular") }}><i class="fas fa-fire" style={{ color: "#194ea4" }}></i> Popular</button>
                    </div>
                    <form action="" className="search_form">
                        <div className="input_control">
                            <input type="text" placeholder='Search your anime' value={search} onChange={handleSearchChange} />
                            <button type='submit' onClick={handleSubmitSearch}>Search</button>
                        </div>

                    </form>
                    <div className="filter_btn airing_filter">
                        <button onClick={() => {
                            setRendered("airing")
                            getAiringAnime()
                        }}>Airing</button>
                    </div>
                    <div className="filter_btn upcoming_filter">
                        <button onClick={() => {
                            setRendered("upcoming")
                            getUpcomingAnime()
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {switchType()}
        </HomeComp>
    )
}

export default Home

