import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../../utils/API';

export class AddMenace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adresse : "",
            typeCrime: "",
            mechant: "",
            horaire: "",
            description:""
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    retour = event => {
        window.location = "/"+this.props.match.params.id+"/"+this.props.match.params.at
    }
    send = event => {
        
        var _send = {
            idUser:this.props.match.params.id,
            adresse: this.state.adresse,
            typeCrime: this.state.typeCrime,
            mechant: this.state.mechant,
            horaire: this.state.horaire,
            description: this.state.description,
        }
        API.insertMenace(_send).then(function(data){
            window.location = "/"+data.data.idUser+"/home";
        },function(error){
            console.log(error);
            return;
        })
    }    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        return(

            <div>
                    <div className="Login">
                        <FormGroup controlId="adresse" bsSize="large">
                            <ControlLabel>adresse</ControlLabel>
                            <FormControl autoFocus type="email" value={this.state.adresse} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup controlId="typeCrime" bsSize="large">
                            <ControlLabel>typeCrime</ControlLabel>
                            <FormControl value={this.state.typeCrime} onChange={this.handleChange} type="text"/>
                        </FormGroup>
                        <FormGroup controlId="mechant" bsSize="large">
                            <ControlLabel>mechant</ControlLabel>
                            <FormControl value={this.state.mechant} onChange={this.handleChange} type="text"/>
                        </FormGroup>
                        <FormGroup controlId="horaire" bsSize="large">
                            <ControlLabel>horaire</ControlLabel>
                            <FormControl value={this.state.horaire} onChange={this.handleChange} type="text"/>
                        </FormGroup>
                        <FormGroup controlId="description" bsSize="large">
                            <ControlLabel>description</ControlLabel>
                            <FormControl value={this.state.description} onChange={this.handleChange} type="text"/>
                        </FormGroup>
                        
                        <Button
                        onClick={this.send}
                        block
                        bsSize="large"
                        type="submit"

                        style={{background:"green",marginBottom:"1em"}}
                        >
                        ENVOYER
                        </Button>
                        <label><Button onClick={this.retour} className="btn " style={{background:"#282c34",color:"white",marginBottom:"1em"}}>ANNULER</Button></label>

                    </div>
            </div>
            
        )
    }
}