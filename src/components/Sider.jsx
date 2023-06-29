import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';


function Sider({tobe,type}) {
    const {[type]:data} = useGlobalContext()

    const sorted = data?.sort((a,b) => {
        return b.score - a.score;
    })

    return (
        <SidebarStyle>
            <h3>Top 5 {tobe}</h3>
            <div className="anime">
                {sorted?.slice(0,5).map((anime) => {
                    return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.webp.large_image_url} alt="" />
                        <h5>
                            {anime.title_english}
                        </h5>
                    </Link>
                })}
            </div>
        </SidebarStyle>
    )
}

const SidebarStyle = styled.div`
    margin-top: 2rem;
    background-color: #332426;
    border-top: 5px solid #909090;
    padding-right: 2rem;
    padding-left: 5rem;
    padding-top: 2rem;
    h3{
        text-align: center;
        font-size:1.6rem;
    }
    .anime{
        display: flex;
        flex-direction: column;
        width: 150px;
        img{
            width: 100%;
            border-radius: 5px;
            border: 5px solid #909090;
        }
        a{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            color: #D5B693;
            h5{
                font-size: 1rem;
                text-align: center;
            }
        }
    }
    @media (max-width: 480px) {
        display:none;
    }
`;

export default Sider
