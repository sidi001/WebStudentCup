import React from 'react';
import { Button, Col, FormGroup,FormControl, ControlLabel } from "react-bootstrap";
import API from '../../utils/API';

  import Countries  from '../Countries/Countries';
import Input0 from '@material-ui/core/Input';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
    Label,Input
  } from 'reactstrap';



export class EditProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
                idUser:"",
                 nom:"",
                prenom:"",
                pseudo:"",
                zoneTag:null,
                adresse:"",
                description:"",
                tel:"",
                profession:"",
                sexe:false,
                age:"",
                erreur:false,
                countrieName:["Selectionnez les pays concernés"],
                checkedAcceptation:false,
                      

        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }



    lever(a){
        if(!a) return 0;
        else return parseInt(a);
        
    }

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
      };

    


    send = (id) => {
        if(!this.state.nom && this.state.nom.length === 0){
            alert("le champs nom doit être renseigner");
            return;
        }else if(!this.state.prenom && this.state.prenom.length === 0){
            alert("le champs prenom doit être renseigner");
            return;
        } else if(this.state.checkedAcceptation===false){
            alert("Veuillez confirmer avoir accepté les conditions ci-dessous");
            return;
        }
        this.setState(
            {id:id}
        );
        var _send = this.state;
        _send.id=id;
        console.log(_send);

        const setErreur=()=>{
            this.setState(
                {erreur:true}
            );
        }
            
            API.updateUser(_send).then(function(data){
                // console.log(data.data.statusG);
                        window.location = "/"+id+"/home/addPiece";
                    },function(error){
                        setErreur();
                        console.log(error);
                        return;
                    })
        


        
    }    

    
    handleChange = event => {
        this.setState({
           [event.target.id]: event.target.value
        });
    }

    changesex = (e) => {
        if(e.target.value === "female")
                this.setState({
                      sexe :true  
                });
        else {
          this.setState({
            sexe :false  
          });
        }
      }

    

    handleChange2 = event => {
        if(this.state.countrieName[0]==="Selectionnez les pays concernés"){
            var list=event.target.value.filter(elt=>elt!=="Selectionnez les pays concernés")
            this.setState({
                countrieName:list,
                zoneTag:list
            });
            return;
        }else if(event.target.value.length===0){
            this.setState({
                countrieName:["Selectionnez les pays concernés"],
                zoneTag:[]
            });
            return;
        }
        else{
            this.setState({
            countrieName:event.target.value,
            zoneTag:event.target.value
            });
        }
        
    }

  

    initializer=(id)=>{
       
        const setUser=(elt)=>{
            console.log(elt);
            this.setState(
                    elt
            )
        }
        API.getUserbyId(id).then(function(data){
            if(data.data.status==='success'){
                setUser(data.data.response);
                return;
            }
            else{
                alert("id  User n'existe pas");
                return;
            }
            
    },function(error){
        console.log(error);
        alert("une erreur s'est produit lors de l'affichage");
        return;
    });
    console.log(this.state);
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        if(params.idG && params.flag!=='0') this.initializer(params.id);
        return;
    }

    render() {
        
        const { match: { params } } = this.props;

        const ITEM_HEIGHT = 48;
            const ITEM_PADDING_TOP = 8;
            const MenuProps = {
            PaperProps: {
                style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                },
            },
            };

        return(
            
            <div className="Login" style={{marginBottom:"4em"}}>
                {params.flag==='0' &&  <h3>Créer votre Profil</h3> }
                {params.flag==='1' &&  <h3>Editer votre Profil</h3> }
                <hr/>
                <FormGroup controlId="nom" bsSize="large">
                    <ControlLabel><h6>Nom</h6></ControlLabel>
                    <FormControl autoFocus type="text" value={this.state.nom} onChange={this.handleChange} placeholder="obligatoire"  />
                </FormGroup>
                <FormGroup controlId="prenom" bsSize="large">
                    <ControlLabel><h6>Prénom</h6></ControlLabel>
                    <FormControl type="text" value={this.state.prenom} onChange={this.handleChange} placeholder="prenom..." />
                </FormGroup>
                <FormGroup controlId="pseudo" bsSize="large">
                    <ControlLabel><h6>Pseudo</h6></ControlLabel>
                    <FormControl type="text" value={this.state.pseudo} onChange={this.handleChange} placeholder="pseudo..." />
                </FormGroup>
                <FormGroup controlId="adresse" bsSize="large">
                    <ControlLabel><h6>Adresse</h6></ControlLabel>
                    <FormControl type="text" value={this.state.adresse} onChange={this.handleChange} placeholder="avenu rue, Ville.." />
                </FormGroup>
                <FormGroup controlId="tel" bsSize="large">
                <ControlLabel><h6>Telephone</h6></ControlLabel>
                <FormControl type="text" value={this.state.tel} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="profession" bsSize="large">
                <ControlLabel><h6>Profession</h6></ControlLabel>
                <FormControl type="text" value={this.state.profession} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup row="true">
                <ControlLabel >
                      <Label className="d-inline" md="3" htmlFor="sex"><h6>Sexe: </h6></Label>
                      {this.state.sexe && <p className="d-inline" style={{color:"red"}}>{"->Feminin"}</p>}
                      {!this.state.sexe && <p className="d-inline" style={{color:"red"}}>{"->masculin"}</p>}
                    </ControlLabel>
                    <Col xs={12} md={9}>
                      <Input type="select" name="sex" id="sex"  onChange = {this.changesex}>
                        <option value="0">Please select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel htmlFor="age"> <h6>Date de naissance</h6></ControlLabel>
                    <FormControl type="text" id="age" name="age" placeholder="jj/mm/aaaa" value={this.state.age} onChange={this.handleChange}/>
  
                </FormGroup>
                
                <FormGroup controlId="description" bsSize="large">
                    <ControlLabel><h6>Descrivez votre super pouvoir</h6></ControlLabel>
                    <textarea id="description" className="form-control" value={this.state.description} onChange={this.handleChange} placeholder="détailler force, pouvoir, intelligence, disponibilité ici..." />
                </FormGroup>
                
                

                
               
                <FormGroup controlId="zoneTag" bsSize="large">
                    
                    <div  style={{margin: "1em", minWidth: "400",maxWidth: "700",}}>
        
                            <InputLabel  htmlFor="select-multiple-checkbox"><h6>Pays de mobilité</h6></InputLabel>
                            <Select 
                            multiple
                            value={this.state.countrieName}
                            onChange={this.handleChange2}
                            input={<Input0  id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                            
                            >

                            {Countries.map(country => (
                                <MenuItem key={country.name} value={country.name}>
                                    <Checkbox checked={this.state.countrieName.indexOf(country.name) > -1} />
                                    <ListItemText primary={country.name} />
                                </MenuItem>
                            ))}
                            </Select>
                    
                    
                    </div>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                                control={<Checkbox
                                    checked={this.state.checkedAcceptation}
                                    onChange={this.handleCheck('checkedAcceptation')}
                                    value="checkedAcceptation"
                                    color="primary"
                                />
                            }
                            label="En cochant cette case, je confirme avoir autorisé à conserver mes données pour tout utilisation dans le cadre de recrutement."
                        />
                </FormGroup>
                {this.state.erreur===true && <div className="alert alert-danger">
                    <strong>Danger!</strong> Erreur d'enregistrement, veuillez ré-éssayer.
                </div>}
          
                <Button
                onClick={()=>this.send(params.id)}
                block
                bsSize="large"
                type="submit"
                className="btn-primary"
                style={{margin:"4px"}}
                >
                Enregistrer
                </Button>
                <label><Button className="btn-danger"  style={{background:"#282c34"}}
                onClick={()=>{if(params.idG==='0') {window.location.href="/"+params.id+"/"+params.at;return;}
                        else window.location.href="/"+params.id+"/"+params.at+"/profil"}}><i className="material-icons">arrow_back</i>Annuler</Button></label>
            </div>
            
        )
    }
}