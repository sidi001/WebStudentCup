import React from 'react';

import {Row,Col,Button} from "react-bootstrap";
import {Container} from "reactstrap";
import API from '../../utils/API';
import './PresentationProfil.css';


export default function PresentationProfil(props) {

    const [state, setState] = React.useState({user:{}});
  const [a, setA] = React.useState(1);
  const [erreur, setErreur] = React.useState(false);
  var photo=state.user.photo;

    const  motDePasse = event => {
        window.location = "/"+props.match.params.id+"/home/motDePasse"
    }
    const  ajouterPiece = event => {
      window.location = "/"+props.match.params.id+"/home/addPiece"
  }
    const initialiseListe=()=>{
        setA(0);
        //console.log(a);
        const callChange=(s)=>{
          setState({user:s});
          return;
      }
      const SetErreur=()=>{
        setErreur(true);
    }
    

        API.getUserbyId(props.match.params.id).then(function(data){
         callChange(data.data.response);
          return;
              },function(error){
                SetErreur();
                  console.log(error);
                  return;
              })
      }

    
      if(a===1) initialiseListe();
      
      return (
        <Container >
           {erreur===true && <div className="alert alert-danger">
                    <strong>Danger!</strong> Erreur de chargement du USER, veuillez ré-éssayer.
                </div>}
                
                  <br/>
                <h1 className="col-sm-6 d-inline" style={{marginTop:"6em",marginLeft:"0em"}}>Mon Profil</h1>
                <br/>
          <Button 
              className="col-sm-3 d-inline styled2 btn btn-info" 
              style={{paddingRight:"2em",marginTop:"2em" ,background:"rgb(18, 73, 190,0.85)"}}
              onClick={()=>{window.location.href="/"+props.match.params.id+"/"+props.match.params.at+"/editUser/";}}
          >
            <i className="material-icons d-inline">add_circle_outline</i>
            <h6 className="d-inline">Modifier Profil</h6>
          </Button>
         
          <hr/>
          <div  className="jumbotron">
          
            <Row>
                <Col  className="col-sm-4 col-4 d-inline">
                     <img src={photo} alt="Profil..." style={{width:"300px"}}/>
                </Col>
                <Col   className="col-sm-4 col-4 d-inline" style={{margin:"1em"}} key="ok">
                  <div className="form-group">
                     
                      <h6 className="btn" style={{background:"rgba(0, 190, 218, 0.5)",color:"green"}}>
                        <a href={"/"+props.match.params.id+"/"+props.match.params.at+"/addphoto"}>changer d'image<i className="material-icons">
                          add_photo_alternate</i>
                        </a>
                      </h6>
                  </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col  className="col-sm-4 col-4 d-inline">
                  <div>
                    <strong className="d-inline">Nom:</strong> 
                    <p className="d-inline" style={{color:"blue"}}>{" "+state.user.nom}</p>
                  </div>
                  <div>
                    <strong className="d-inline">Prenom:</strong> 
                    <p className="d-inline"  style={{color:"blue"}}>{" "+state.user.prenom}</p>
                  </div>
                  <div>
                    <strong className="d-inline">SEXE:</strong> 
                    <div className="d-inline"  style={{color:"blue"}}>
                     {state.user.sexe==="false" && <div className="d-inline">{" Homme"}</div>}
                     {state.user.sexe==="true" && <div className="d-inline">{" Femme"}</div>}
                    </div>
                  </div>
                  <div>
                    <strong className="d-inline">Né le:</strong> 
                    <p className="d-inline"  style={{color:"blue"}}>{" "+state.user.age}</p>
                  </div>
                  <div>
                    <strong className="d-inline">Adresse:</strong> 
                    <p className="d-inline"  style={{color:"blue"}}>{" "+state.user.adresse}</p>
                  </div>
                  <div>
                    <strong className="d-inline">Adminitrateur:</strong> 
                    {state.user.admin===false && <p className="d-inline"  style={{color:"blue"}}> {" Non"}</p>}
                    {state.user.admin===true && <p className="d-inline"  style={{color:"blue"}}> {" Oui"}</p>}
                  </div>
                  <div>
                    <strong className="d-inline">Date d'inscription:</strong> 
                    <p className="d-inline"  style={{color:"blue"}}>{" "+new Date(state.user.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <strong className="d-inline">Pseudo:</strong> 
                    <p className="d-inline"  style={{color:"blue"}}>{" "+state.user.pseudo}</p>

                  </div>

                </Col>
                <Col   className="col-sm-4 col-4 d-inline" style={{margin:"1em"}} key="ok">
                  <div>
                    <i className="d-inline material-icons">
                      phone_iphone
                    </i>
                    <h6 className="d-inline"  style={{color:"blue"}}>{" (indicatif)"+state.user.tel}</h6>

                  </div>
                  <div>
                    <i className="d-inline material-icons">
                    business_center
                    </i>
                    <h6 className="d-inline"  style={{color:"blue"}}>{" "+state.user.profession}</h6>

                  </div>
                  <div>
                    <i className="d-inline material-icons">
                      mail
                    </i>
                    <h6 className="d-inline"  style={{color:"blue"}}>{" "+state.user.email}</h6>

                  </div>
                  {state.user.pieceUrl!=="" && 
                    <div>
                      <h6 className="d-inline"  style={{color:"black"}}>{"Ma Piece: CV/LM"}</h6>
                      <a href={state.user.pieceUrl} target="_bank" rel="noopener noreferrer">
                        <button className="buttonVoir" type="button" style={{margin:"2px",marginLeft:"1em", color:"white"}}>{state.user.pieceUrl? state.user.pieceUrl.substring(0,10):""}</button>
                      </a>
                    </div>
                  }
                
                </Col>
            </Row>
            <label><Button onClick={(event)=>motDePasse(event)} className="btn btn-secondary" style={{margin:"2px"}}>CHANGER DE MOT DE PASSE</Button></label>
            <label><Button onClick={(event)=>ajouterPiece(event)} className="btn-info" style={{margin:"2px"}}>ajouter piece</Button></label>
            <p className=""  style={{color:"dark"}}>{" NB: Vous pouvez a tout moment modifier votre profil, ajouter d'image ou une piece comme lettre de motivation ou votre CV en Cliquant sur le boutton concerné."}</p>

          </div>
          
  
        </Container>
    );
  }