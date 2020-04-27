import React from 'react';

import {Row,Col} from "react-bootstrap";
import {Container} from "reactstrap";
import Typography from '@material-ui/core/Typography';


export default function PresentationAgence(props) {

 

      return (
        <Container >
           
          {/* {total!==0 && <Button className="btn-success" style={{
                    margin:"1em"
                  }}
                  onClick={()=>{edit()}}> Modifier</Button>} */}
                  <br/>

          <h1 className="col-sm-3 d-inline" style={{marginTop:"4em",marginLeft:"2em"}}>Présentation  de l'entreprise</h1>
          <hr/>
          
          <div  style={{marginBottom:"4em", background:"#33384"}} align="center">
               
               <div className="container" style={{background:"rgb(109, 105, 105)"}}>
                   <br/>
                   <div>
                       <img  src="http://localhost:3000/images/logo.png"   alt="profil du G" style={{widthMax:"100"}}  />
                       <tr/>
                       <div className="col-12" style={{color: "rgb(23, 43, 77)", lineHeight: "24px", fontSize: "20px", background: "rgb(172, 166, 172)"}}>
                           <h3 className="">HÉROs RÉCRUTEUR</h3>

                           <p className="d-inline" style={{color:"white"}}>Slogant: Nous vous récrutons pour sauver le monde</p>
                           
                       </div>
                   </div>
                   <br/>
                   <strong>
                   Les menaces ne cessent d’augmenter, comme les besoins de protection de la population. Dans ce contexte, les approches et outils traditionnels montrent leurs limites, et ne répondent plus aux défis des transformations digitales.
                   </strong>
                   <h6><p>Herorecruteur mobilise une communauté d’individus hors du commun, ces super-héros afin de lutter contre les forces maléfiques qui oppriment le monde.</p>
                   <p>Fondée en 2020, Herorecruteur est aujourd’hui l’une des plus grandes plateformes de recrutement de super-héros en France avec des bureaux à Paris et à Dijon.</p>
                   <p>Herorecruteur mobilise la force et l’intelligence collective pour lutter contre les actes malfaisants qui se multiplient.</p>
                   </h6>
                   <br/>
                   

                   <br/>
                   <h3>POurquoi nous faire confiance ??</h3>

                  <p>Une levée de fond de 4M€, plus d’une centaine de super-héros, l’ouverture d’une filiale en Suisse et à Singapour, Herorecruteur se développe rapidement sur les marches européens et asiatiques.</p>
                   <p>Herorecruteur dispose d’une forte reconnaissance et légitimité parmi les superhéros et participe activement à l’écosystème.</p>
                   
                   <div >
                     <h6 className="d-inline">CE QUE NOUS RECHERCHONT:  </h6>
                     <div className="d-inline" style={{color:"black"}}>Herorecruteur, ils recherchent des femmes et hommes super-héros, respectueux des bonnes pratiques, aimant relever les défis quotidiens de la population allant au bout de leurs engagements en contribuant à faire bouger les choses.</div>
                     Une équipe d’experts, compétente, pluridisciplinaire, dynamique et forte de proposition est prête à les accueillir.
                   </div>
                   
                   <div><strong>créer par: </strong> <strong style={{color:"green"}}>" WebStudentcup"</strong></div>
                   

                   <br/>
                   <section className="section section-b">
                  <div className="container">
                    <h2>Retrouver Nous sur:</h2>
                    <div className="w3-container  w3-center ">
                      <button ><img src="/facebook.png" alt="Facebook" style={{width:"50px", margin:"2em",borderRadius:"4px"}} className=""/></button>
                      < button><img src="/instagram.jpeg" alt="Facebook" style={{width:"50px", margin:"2em",borderRadius:"4px"}} className=""/></button>
                      <button><img src="/twitter.png" alt="Facebook" style={{width:"50px", margin:"2em",borderRadius:"4px"}} className=""/></button>
                      <button><img src="/linkedin.png" alt="Facebook" style={{width:"50px", margin:"2.5em",borderRadius:"4px"}} className=""/></button>
                      
                      <p className="w3-medium">copy right WebStudent</p>
                    </div>
                  </div>
                </section>




               


               
           </div>
            
          </div>
          
  
        </Container>
    );
  }