import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

const CharImg = styled.div`
  min-height:100vh;
  display:flex; 
  flex-direction:column;
  align-items:center;
  .back{
    position:absolute;
    left:2rem;
    top:2rem;
    a{
      font-weight:600;
      // color:#FD2C21;
      color:#D5B693;
      text-decoration:none;
      display:flex;
      align-items:center;
      gap:.5rem;
    }
  }
  .large_img{
    display:inline-block;
    padding:2rem;
    margin:2rem 0;
    background-color:#2A1D1E;
    border-radius:8px;
    border:4px solid #6C7983;
    position:relative;
    img{
      width:250px;
    }
  }
  .small_imgs{
    display:flex;
    flex-wrap:wrap;
    gap:.6rem;
    width:80%;
    justify-content:center;
    padding:2rem;
    // border-radius:7px;
    // border:4px solid #6C7983;
    img{
      width:6rem;
      height:6rem;
      object-fit:cover;
      cursor:pointer;
      border-radius:5px;
      border:3px solid #6C7983;
    }
  }
`;

const CharcImages = () => {
  const { id } = useParams();
  const { characterImages, pictures } = useGlobalContext();


  const [index, setIndex] = useState(0);
  const ImageClick = (ind)=>{
    setIndex(ind);
  }

  useEffect(() => {
    characterImages(id)
  }, [])

  const ImageDoubleClickDownload = async () => {
    const imageUrl = pictures[index]?.jpg.image_url;
    if (imageUrl) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Ani_Char.jpg';
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error while downloading the image:', error);
      }
    }
  };
  return (
    <CharImg>
      <div className="back"><Link to="/"><i class="fa-solid fa-angle-left"></i> Home</Link></div>
      <div className="large_img"  onDoubleClick={ImageDoubleClickDownload}> 
        <img src={pictures[index]?.jpg.image_url} />
      </div>
      <div className="small_imgs">
        {pictures?.map((pic, indx) => {
          // console.log(pic);
          return (
            <div className="image_container" onClick={()=>ImageClick(indx)} key={indx}>
              <img src={pic.jpg.image_url} alt="image_character" style={{
                border: indx === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                filter: indx === index ? 'grayscale(0)' : 'grayscale(60%)',
                transform: indx === index ? 'scale(1.1)' : 'scale(1)',
                transition: 'all .3s ease-in-out'
              }} />
            </div>
          )
        })}
      </div>
    </CharImg>
  )
}
export default CharcImages