import React from 'react';
import { Button, FormGroup,FormControl, ControlLabel } from "react-bootstrap";
import API from '../../utils/API';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


export class MotDePasse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id:null,
            password: "",
            Npassword: "",
            cpassword: "",
            Apassword: "",
            
            erreur:false,
            erreur1:false,
            erreur2:false,
            

        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }




    send = event => {
        const setErreur2=(bool)=>{
            this.setState({erreur2:bool});
        }
        
        const SetErreur1=()=>{
            this.setState({erreur1:true});
        }
        API.verifierMotDePasse({"password":this.state.Apassword,"id":this.state._id}).then(function(data){
            if(data.data.erreur===true) setErreur2(true);
            else setErreur2(false);
        },function(error){
            SetErreur1();
            console.log(error);
            return;
        }
        )
        // console.log(this.state);
        
        if(this.state.Npassword.length === 0 || this.state.Npassword !== this.state.cpassword){
            this.setState({erreur:true});
            return;
        }
        var _send = {
            _id:this.state._id,
            password: this.state.Npassword,
        }
        console.log(_send);


        API.updateMotDePasse(_send).then(function(data){
            window.location = '/'+data.data.idUser+"/home/profil";
            return;
        },function(error){
            SetErreur1();
            console.log(error);
            return;
        })
    }    

    retour = event => {
        window.location = "/"+this.props.match.params.id+"/home/profil"
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    initialiser(id){
        const setCreatorName=(elt)=>{
            this.setState(elt);
            return;
        }
        const SetErreur1=()=>{
            this.setState({erreur1:true});
        }
        API.getUserbyId(id).then(function(data){
            if(data.data.statusG==='success'){
                setCreatorName(data.data.response);
                
                return ;
            }
            else{
                SetErreur1();
                return;
            }
            
    },function(error){
        console.log(error);
        return;
    });
    }


    componentDidMount(){
        const { match: { params } } = this.props;
        this.initialiser(params.id);;
      
        return;
    }

    render() {
        return(
            <div>
                {this.state.erreur===true && <div className="alert alert-danger">
                    <strong>Danger!</strong> verifer que le nouveau mot de passe est bien confirmé.
                   
                </div>}
                 {this.state.erreur2===true &&  <div className="alert alert-danger">
                     <strong>Danger!</strong>, ancien mot de passe incorrect
                    </div>}
                
                {this.state.erreur1===true && <div className="alert alert-danger">
                    <strong>Danger!</strong> Erreur de chargement..., veuillez ré-éssayer.
                </div>}
            <div className="Login" style={{marginBottom:"4em"}}>
                <h3>Modifier Profil</h3>
                <hr/>
                <FormGroup controlId="Apassword" bsSize="large">
                    <ControlLabel>Ancien mot de passe</ControlLabel>
                    <FormControl value={this.state.Apassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="Npassword" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl value={this.state.Npassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
          
                <Button
                    onClick={this.send}
                    block
                    bsSize="large"
                    type="submit"
                    className="btn-primary"
                    style={{marginBottom:"2px"}}
                    >
                Enregistrer nouveau mot de passe
                </Button>
                <label><Button onClick={this.retour} className="btn-dark"><ChevronLeftIcon />Annuler modification ??</Button></label>
            </div>
            </div>
            
        )
    }
}