import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../../utils/API';
import AppNavBar from '../AppNavBar';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            checkedAdmin:false,
            checkedRemenber:true,
            erreur:0,
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    inscrire = event => {
        window.location = "/signup";
    }   
    
    send = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then(function(data){
            localStorage.setItem('token', data.data.token);

            if(data.data.admin===true)
                    window.location.href ='/'+data.data.id+"/admin";
            else
                window.location.href ='/'+data.data.id+"/home";
            // return;
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

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
      };
    render() {
        return(
            <div>
                <AppNavBar/>

                <div className="Login">
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup >
                    <FormControlLabel
                            control={<Checkbox
                                checked={this.state.checkedAdmin}
                                onChange={this.handleCheck('checkedAdmin')}
                                value="checkedAdmin"
                                color="primary"
                                
                            />
                        }
                        label="Admin"
                      />
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.checkedRemenber}
                                onChange={this.handleCheck('checkedRemenber')}
                                value="checkedRemenber"
                                color="primary"
                            />
                        }
                        label="se souvenir de moi"
                      />
                    </FormGroup>
                    
                <Button
                onClick={this.send}
                block
                bsSize="large"
                type="submit"
                style={{background:"green"}}
                >
                Connexion
                </Button>
                <Button
                    onClick={this.inscrire}
                    block
                    bsSize="large"
                    type="submit"
                    style={{background:"#282c34", color:"white"}}
                    >
                    Creer un compte
                    </Button>

                
            </div>
        </div>
           
        )
    }
}