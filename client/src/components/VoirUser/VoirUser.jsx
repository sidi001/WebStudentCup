import React from 'react';

import API from '../../utils/API';


export class VoirUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
                G:{id:null,
                 nom:"",
                prenom:"",
                description:"",
                zoneTag:[],
                nombreParticipant:null,
                age : "",
                pseudo : "",
                tel : "",
                 }
    }

    }

    initializer=(id)=>{


        const setG=(elt)=>{
            this.setState(
                    {...this.state,G:elt}
            );

            return;
        };
        
       API.getUserbyId(id).then(function(data){
                if(data.data.status==='success'){
                    setG(data.data.response);
                    return;
                }
                else{
                    alert("erreur, ce id n'existe pas");
                    return;
                }
                
            },function(error){
                console.log(error);
                return;
            });
       
    };





    componentDidMount() {
        const { match: { params } } = this.props;
        this.initializer(params.idUser);
      
        return;
    }

   

    render() {
        
        const { match: { params } } = this.props;
        

     

        return(
            
            <div  style={{marginBottom:"4em", background:"#5e6c84"}} align="center">
               
                <div className="container" style={{background:"#d0dacf"}}>
                    <h3>Afficher un User</h3>
                    <hr/>
                    <div>
                        <img  src={this.state.G.photo}   alt="profil du User" style={{widthMax:"100"}}  />
                        <tr/>
                        <div className="col-5" style={{color: "rgb(23, 43, 77)", lineHeight: "24px", fontSize: "20px", background: "rgb(172, 166, 172)"}}>
                            <div className="d-inline">{this.state.G.nom+" "+this.state.G.prenom} </div>
                            <p className="d-inline" style={{color:"white"}}>{"Status "}</p>
                            {this.state.admin===true && <p className="d-inline btn-success">admin..</p>}
                            {this.state.admin===false && <p className="d-inline btn-danger">User!</p>}
                        </div>
                    </div>
                    <br/>
                    <strong>
                        {"pseudo: "+this.state.G.pseudo}
                    </strong>
                    <p>{this.state.G.description}</p>
                    <br/>
                    

                    
                    <div ><h6 className="d-inline">age :   <div className="d-inline" style={{color:"red"}}>{this.state.G.age}</div></h6></div>
                    
                    <br/>
                    <h5>Contact</h5>
                    <div><strong>téléphone: </strong> <strong style={{color:"green"}}>{this.state.tel}</strong></div>
                    <div><strong>e-Mail: </strong> <strong style={{color:"green"}}><a href={"mailto:"+this.state.G.email} target="_bank" rel="noopener noreferrer">{this.state.G.email}</a></strong></div>
                    
                    <div><strong>Localité/ zone  de mobilité: </strong> <strong style={{color:"blue"}}>{this.state.G.zoneTag.join()}</strong></div>

                    <br/>

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




                </div>
                


                
            </div>
            
        )
    }
}