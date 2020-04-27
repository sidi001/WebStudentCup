import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export class ContactUS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            erreur:0,
            sujet:"",
            message:""
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        
    }    

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <section className="my-5" style={{marginBottom:"6em"}}>
            <h2 className="h1-responsive font-weight-bold text-center my-5">
                Nous Contacter
            </h2>
            
            <div className="Login">
                        <p className="text-center w-responsive mx-auto pb-5">
                        Les menaces sont souvent recentes, cela pourra arriver à tout moment. C'est ainsi que nous mettons en place ce systeme de mailling qui vous permettra de nous contacter afin de signaler une quelconque menace.
                        Par ailleurs, ce systeme de mailling  vous permettra aussi de nous poser des questions. 
                        </p>
                        <FormGroup controlId="sujet" bsSize="large">
                            <ControlLabel>Sujet</ControlLabel>
                            <FormControl autoFocus type="text" value={this.state.sujet} onChange={this.handleChange}/>
                        </FormGroup>
                    
                        <FormGroup controlId="message">
                            <ControlLabel>Message</ControlLabel>
                            <br/>
                            <textarea id="message" name="story"
                                        rows="5" cols="33" placeholder="Ecriver votre message ici...">
                                
                                </textarea>
                        </FormGroup>
                            
                        <a href={"mailto:siditouredjenne@gmail.com?subject="+this.state.sujet+"&body="+this.state.message} target="_bank" rel="noopener noreferrer">
                            <Button
                            onClick={this.send}
                            block
                            bsSize="large"
                            type="submit"
                            style={{background:"green"}}
                            >
                            Envoyer
                            </Button>
                        </a>

                        <a href={"/"+this.props.match.params.id+"/"+this.props.match.params.at}  style={{margin:"3px"}}>
                            <Button
                                onClick={this.inscrire}
                                block
                                bsSize="large"
                                type="submit"
                                style={{background:"#282c34", color:"white"}}
                                >
                                Annuler
                            </Button>
                        </a>

                        
                    </div>
            
            </section>
  );
}
}