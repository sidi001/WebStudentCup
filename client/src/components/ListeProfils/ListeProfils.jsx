import React from 'react';

import {Row,Col} from "react-bootstrap";
import {Container} from "reactstrap";
import API from '../../utils/API';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  });

export default function ListeProfils(props) {



  
  const [state, setState] = React.useState({
    data: [
    ],
  });
  const [selected, setSelected] = React.useState("tous");
  const [a, setA] = React.useState(1);
  const [search, setSearch] = React.useState("");

  //les variable du search
  const classes = useStyles();
 






  const initialiseListe=()=>{
    setA(0);
    console.log(a);
    const callChange=(s)=>{
      setState({data:s});
      return;
  }

    API.getAllUser({'id':props.match.params.id}).then(function(data){

      callChange(data.data.response);
       return;
           },function(error){
               console.log(error);
               return;
           })
  }

  if(a) initialiseListe();

  const contacter=(event,index)=>{

  }

  const voir=(e)=>{
    
  }

  

  //les fonctions du search

    

    function changeFiltre(e){
        // console.log("jfjsnjf");
            if(e.target.value === "tous" || e.target.value ==="0")
            setSelected("tous");
            else if(e.target.value === "titre"){
                setSelected("titre");
            }
            else if(e.target.value === "prix"){
                setSelected("prix");
            }
            else if(e.target.value === "localite"){
                setSelected("localite");
            }
            else if(e.target.value === "participation"){
              setSelected("participation");
          }
          else if(e.target.value === "jour"){
            setSelected("jours restant");
        }
            
          }
  function onchange (e) {
            setSearch( e.target.value );
          };

   const filteredG = state.data.filter(G => {
       if(selected==="tous"){
        return (G.zoneTag.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        G.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        G.prenom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        G.pseudo.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        G.description.toLowerCase().indexOf(search.toLowerCase()) !== -1 
        )
       }
       else if(selected==="zoneTag") return G.zoneTag.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1;
       else if(selected==="description") return G.description.toLowerCase().indexOf(search.toLowerCase()) !== -1;
       else if(selected==="nom") return (G.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
              G.prenom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                G.pseudo.toLowerCase().indexOf(search.toLowerCase()) !== -1 );
       return true;
          }).sort((a, b) => {
            const diff = a.nom - b.nom;
        
            return  diff;
        });

  return (
      <Container  >
          <Row>
                <br/>
                   <h1 className="col-sm-6 d-inline" style={{marginTop:"1em",marginLeft:"0em"}}>Mon Profil</h1>
                <br/>
                <div className="col-sm-6">

                             
                    
                </div>
                <div className="row col-sm-6"> 

                    <div className="col-sm-4 d-inline">
                        <select className="form-control" name="categorie" id="categorie" required="" onChange={changeFiltre.bind(this)}>
                                <option value="0">choisir filtre</option>
                                <option value="tous">tous</option>
                                <option value="nom">par nom</option>
                                <option value="description">par pouvoir</option>
                                <option value="zoneTag">par pays de mobilité</option>
                        </select>
                    </div>
                    <div className="col-sm-3 d-inline ">
                            <Paper className={classes.root}>
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                    <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} />
                                
                                <InputBase
                                    className={classes.input}
                                    placeholder={"filtrer par "+selected}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e)=>onchange(e)}
                                    value={search}
                                />
                                <IconButton className={classes.iconButton} aria-label="search" onClick={()=>{setSearch("");}}>
                                    <i className="material-icons">
                                        cancel
                                    </i>
                                </IconButton>
                                
                            </Paper>
                    </div>
                    
                </div>
        </Row>
        <hr/>
        <Row>
            {filteredG.length===0 && <h4 className="Login">Aucun elements n'est trouvé... </h4>}
            {filteredG.map((G,index)=>{
             return (<Col  col-sm-6="true" className=" card img-fluid" style={{width:"400px",margin:"1em"}} key={index}>
              <img className="card-img-top" src={G.photo} alt="Card G" style={{width:"100%"}}/>
              <div className="price" style={{
                  background: "red",
                  color: "#fff",
                  position: "absolute",
                  right: "6px",
                  top: "20px",
                  borderRadius: "3px",
              }}><h6>{G.nom}</h6></div>
              <div className="card-img-overlay">
                <h4 className="card-title">Héro</h4>
                <p className="card-text" style={{background:"#fff"}}>{G.description}</p>
                <p className="w-50" style={{background:"rgba(33,33,33,0.7)",color:"white"}}>Pseudo:{" "+G.pseudo}</p>
                <div style={{background: "rgba(33,30,0,0.7)",position: "absolute",left: "4px",bottom: "40px", borderRadius: "3px",}}>
                  <strong >Age: </strong> <strong style={{color:"white"}}>{G.age}</strong>
                </div>
                <div style={{background: "rgba(33,30,0,0.7)",position: "absolute",left: "4px",bottom: "20px", borderRadius: "3px",}}>
                  <strong >Localité: </strong> <strong style={{color:"white"}}>{G.zoneTag.join().substring(0,30)} {G.zoneTag.length>30 && "..."}</strong>
                </div>

                <div>
                <a href={"/"+props.match.params.id+"/admin/afficherUser/"+G._id} target="_bank" rel="noopener noreferrer"><div  className="btn btn-primary" id={index} style={{marginRight:"1em", background:"#111"}}
                    onClick={(event)=>voir(event)}>Voir</div></a>
                  <a href={"mailto:"+G.email} target="_bank" rel="noopener noreferrer"><div  className="btn btn-success" id={G._id} onClick={(event)=>{contacter(event,index)}}>contacter</div></a>
                </div>
                
                  {G.admin===true && 
                     <div className="" style={{color:"white",background: "green",position: "absolute",left: "0px",top: "0px", borderRadius: "3px"}}>
                     <strong style={{}}>Admin!! </strong>
                   </div>
                  }
                  {G.admin===false && 
                     <div className="" style={{color:"white",background: "green",position: "absolute",left: "0px",top: "0px", borderRadius: "3px"}}>
                     <strong style={{}}>User... </strong>
                   </div>
                  }
              </div>
              </Col>)
          })}
        </Row>
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
  );
}
