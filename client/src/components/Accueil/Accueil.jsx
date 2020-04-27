import React from 'react';

import {Container} from "reactstrap";
import "./Accueil.css";



export default function Accueil(props) {

 

      return (
        <div>

            <Container >
              
              <header className="v-header container">

                <div className="fullscreen-video-wrap">
                
                  <video src="/camera.mp4" autoPlay loop="">
                </video>
                </div>
               
                <div className="header-overlay"></div>
                
                <div className="header-content text-md-center">
                
                  <h1>Bienvenue aux SuperHereos</h1>
                  <p>Nous recrutons des personnes aux aptitudes exceptionnelles. Il vous suufit de vous inscrire et nous descrire au mieux votre profil. </p>
                  {props.match.params.id && <div></div>}
                  {!props.match.params.id && <a className="btn" href="/login">Se connecter</a>}
                </div>
              </header>

                <section className="section section-a">
                  <div className="container">
                    <h2>Mission de Heroes Recruteur</h2>
                    <p>Une menace pèse sur le monde. Partout dans le monde, les actes malfaisants...........</p>
                  </div>
                </section>

                <section className="section section-b">
                  <div className="container">
                    <h2>Retrouver Nous sur:</h2>
                    <div className="w3-container  w3-center ">
                      <button ><img src="/facebook.png" alt="Facebook" style={{width:"50px", margin:"1em"}} className=""/></button>
                      < button><img src="/instagram.jpeg" alt="Facebook" style={{width:"50px", margin:"1em"}} className=""/></button>
                      <button><img src="/twitter.png" alt="Facebook" style={{width:"50px", margin:"1em"}} className=""/></button>
                      <button><img src="/linkedin.png" alt="Facebook" style={{width:"50px", margin:"1em"}} className=""/></button>
                      
                      <p className="w3-medium">copy right WebStudent</p>
                    </div>
                  </div>
                </section>

              </Container>
             
        </div>
        
    );
  }