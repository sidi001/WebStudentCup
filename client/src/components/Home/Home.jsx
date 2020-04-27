import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import "./Home.css";
import {MotDePasse} from '../MotDePasse/MotDePasse';
// import {
//   Footer
// } from "mdbreact";



import { BrowserRouter} from 'react-router-dom';
import {Col, Button} from 'react-bootstrap';
// Form,FormGroup,Button,FormControl
import { PrivateRoute } from '../PrivateRoute';



import Accueil from '../Accueil/Accueil';
import PresentationProfil from '../PresentationProfil/PresentationProfil';
import PresentationAgence from '../PresentationAgence/PresentationAgence';
import ListeProfils from '../ListeProfils/ListeProfils';
import {ContactUS} from '../ContactUS/ContactUS';
import { EditProfil } from '../EditProfil/EditProfil';
import AjouterPiece from '../AjouterPiece/AjouterPiece';
import AddPhoto from '../AddPhoto/AddPhoto';
import { VoirUser } from '../VoirUser/VoirUser';
import { AddMenace } from '../AddMenace/AddMenace';
import ListeMenaces from '../ListeMenaces/ListeMenaces';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: "12px",
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Home({match}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [profil,setProfil]=React.useState("Mon profil");


//pour le menu...
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl0, setAnchorEl0] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick0 = event => {
    setAnchorEl0(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose0 = () => {
    setAnchorEl0(null);
  };

  console.log(match);


  // des fonction a appeler avec onLoad en utilisant des variable de session


  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    
    <div className={classes.root} >
      
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      <Toolbar style={{background:"#282c34"}}>

              <IconButton 
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className="{clsx(classes.menuButton, open && classes.hide)}"
              >
                <MenuIcon />
              </IconButton>
           
                <Col xs={10} sm={5} md={4}>
                  <Typography variant="h6" noWrap >
                      <a href={match.url} className="d-inline">
                          <div className=""> 
                            <img  style={{borderRadius:"4px"}} src="http://localhost:3000/images/logo.png" alt="NoImage" width='42' /> 
                        </div> 
                      </a>
                      <p width='20%' height='10' className="d-inline"> HEROS-RECRUTEUR </p>
                  </Typography>
                </Col>

                <Col className="d-none d-sm-block">
                      <Typography variant="h6" noWrap >
                        <div className="navs navbar-light">
                              {match.params.at==="admin" &&  
                                <>
                                  <Button className="btn btn1" style={{background:"#14523d",color:"#fff"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                      Menu admin
                                      <i className="material-icons">arrow_drop_down</i>
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                      >
                                          <a href={"/"+match.params.id+"/"+match.params.at+"/listeprofil"} className="btn btn1"  style={{textDecoration:"none",color:"white" ,background:"#14523d",margin:"1px"}}>

                                            <MenuItem  onClick={handleClose}  style={{height:"25px"}}><h5> Liste profils</h5> </MenuItem>
                                        </a>
                                        <br/>
                                        <a href={"mailto:"} target="_bank" rel="noopener noreferrer"  className="btn btn1"  style={{textDecoration:"none",color:"white",background:"#14523d"}}>
                                            <MenuItem onClick={handleClose} style={{height:"25px"}}><h5>liste des mails</h5></MenuItem>
                                        </a>
                                        <a href={"/"+match.params.id+"/"+match.params.at+"/listemenace"}   className="btn btn1"  style={{textDecoration:"none",color:"white",background:"#14523d"}}>
                                            <MenuItem onClick={handleClose} style={{height:"25px"}}><h5>liste des menaces</h5></MenuItem>
                                        </a>
                                        
                                      </Menu>
                                  
                                </>

                             }
                          {match.params.at!=="admin" && <Button style={{background:"#282c34"}}><a href={"/"+match.params.id+"/"+match.params.at+"/presentationAgence"} className="btn btn1" style={{color:"#fff",marginRight:"2px",paddingRight:"2px",textDecoration:"none" ,background:"#14523d"}}><i className="material-icons">vertical_split</i>
                              A propos</a> </Button>
                          }
                          {match.params.at!=="admin" && <Button style={{background:"#282c34"}}><a href={"/"+match.params.id+"/"+match.params.at+"/addmenace"} className="btn btn1" style={{color:"#fff",marginRight:"2px",paddingRight:"2px",textDecoration:"none" ,background:"#14523d"}}>
                              Alert</a> </Button>
                          }
                          <Button  
                          onClick={()=>{window.location.href="/"+match.params.id+"/"+match.params.at+"/edit/0"}} 
                          style={{background:"#282c34"}}>
                            <div className="btn btn1"  style={{color:"#fff",marginRight:"1px",paddingRight:"4px",background:"#14523d" }}>
                              <i className="material-icons">add_circle</i>
                              Créer profil
                            </div> 
                              </Button>
                          <Button style={{background:"#282c34"}}>
                            <a href={"/"+match.params.id+"/"+match.params.at+"/profil" } className="btn btn1" style={{color:"#fff",marginRight:"1px",paddingRight:"4px",background:"#14523d"}} ><i className="material-icons">portrait</i>
                                {profil}
                            </a> 
                          </Button>
                          <Button style={{background:"#282c34"}}>
                            <a href={"/"+match.params.id+"/"+match.params.at+"/contact" } className="btn btn1" style={{color:"#fff",marginRight:"1px",paddingRight:"4px",background:"#14523d"}} ><i className="material-icons">settings_phone</i>
                                Contact
                            </a> 
                          </Button>
                        </div>
                        </Typography>

                </Col>

        </Toolbar>
        
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} onClick={handleDrawerClose}>
          RETOUR
          <IconButton >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <a href={"/"+match.params.id+"/"+match.params.at+"/profil" } style={{textDecoration:"none",color:"black"}}> 
            <ListItem button key="infouser" >
              <ListItemIcon><i className="material-icons">perm_identity</i></ListItemIcon>
              <ListItemText primary={profil} />
            </ListItem>
          </a>
          <a href={"/"+match.params.id+"/"+match.params.at+"" } style={{textDecoration:"none",color:"black"}}>
            <ListItem button key="accueil" >
              <ListItemIcon><i className="material-icons">account_balance</i></ListItemIcon>
              <ListItemText primary="ACCUEIL" />
            </ListItem>
          </a>
          <a href={"/"+match.params.id+"/"+match.params.at+"/presentationAgence"} style={{textDecoration:"none",color:"black"}}>
            <ListItem button key="about" >
              <ListItemIcon><i className="material-icons">vertical_split</i></ListItemIcon>
              <ListItemText primary="A propos de nous" />
            </ListItem>
          </a>
            
            

            <a href={"/"+match.params.id+"/"+match.params.at+"/edit/0"} style={{textDecoration:"none",color:"black"}}>
              <ListItem button key="listcontest" >
              <ListItemIcon><i className="material-icons">add_circle_outline</i></ListItemIcon>
              <ListItemText primary="Editer mon profil" />
              </ListItem>
            </a>
            
            {match.params.at==="admin" &&  
                        <>
                          <ListItem button key="historiqueP" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick0}>
                            <ListItemIcon><i className="material-icons">local_activity</i></ListItemIcon>
                            <label  style={{textDecoration:"none",color:"black"}}>
                              <h6>Menu admin</h6>
                            </label>
                            <ListItemIcon><i className="material-icons">expand_more</i></ListItemIcon>
                        </ListItem>
                          
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl0}
                              keepMounted
                              open={Boolean(anchorEl0)}
                              onClose={handleClose0}
                            >
                                <a href={"/"+match.params.id+"/"+match.params.at+"/listeprofil"}  style={{textDecoration:"none",color:"black"}}>

                                  <MenuItem onClick={handleClose0} href={"/"+match.params.id+"/"+match.params.at+"/listemails"}>Liste Profil</MenuItem>
                              </a>
                              <a href={"mailto:"} target="_bank" rel="noopener noreferrer"  style={{textDecoration:"none",color:"black"}}>
                                  <MenuItem onClick={handleClose0}>Lire mails</MenuItem>
                              </a>
                              <a href={"/"+match.params.id+"/"+match.params.at+"/listemenaces"}  style={{textDecoration:"none",color:"black"}}>
                                  <MenuItem onClick={handleClose0}>Liste menaces</MenuItem>
                              </a>
                            </Menu>
                          
                        </>

                          }
                    
                  

            <a href={"/"+match.params.id+"/"+match.params.at+"/contact"}  style={{textDecoration:"none",color:"black"}}>
              <ListItem button key="contact" >
                <ListItemIcon><i className="material-icons">settings_phone</i></ListItemIcon>
                    
                          <ListItemText primary="NOUS CONTACTER" />
                    
              </ListItem>
            </a>
          
        </List>
        <Divider />
        <List>
        <a href={"/"}  style={{textDecoration:"none",color:"black"}}>

            <ListItem button key="jury">
                <ListItemIcon><i className="material-icons">power_off</i></ListItemIcon>
                <label  style={{textDecoration:"none",color:"black"}}>
                    <h6>Se deconnecter</h6>
                </label>
            </ListItem>
          </a>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          <BrowserRouter width="100%">
                <div>  
                    
                  <div className="appBody">
                      {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
                  </div>
                  <PrivateRoute exact path='/:id/:at' component={Accueil} />
                      {/* <Route path="/" component={Footer} /> */}
                    <PrivateRoute  path='/:id/:at/listeProfil' component={ListeProfils} />
                    <PrivateRoute path='/:id/:at/afficherHeroe/:idHeroe' component={PresentationProfil} />
                    <PrivateRoute path='/:id/:at/modificationProfil/:idG' component={PresentationProfil} />
                    <PrivateRoute  path='/:id/:at/contact' component={ContactUS} />
                    <PrivateRoute path='/:id/:at/profil' component={PresentationProfil} />
                    <PrivateRoute path='/:id/:at/motDePasse' component={MotDePasse} />
                    <PrivateRoute path='/:id/:at/presentationAgence' component={PresentationAgence} />
                    <PrivateRoute path='/:id/:at/edit/:flag' component={EditProfil} />
                    <PrivateRoute path='/:id/:at/addPiece' component={AjouterPiece} />/
                    <PrivateRoute path='/:id/:at/addphoto' component={AddPhoto} />
                    <PrivateRoute path='/:id/:at/afficherUser/:idUser' component={VoirUser} />
                    <PrivateRoute path='/:id/:at/addmenace' component={AddMenace} />
                    <PrivateRoute path='/:id/:at/listemenace' component={ListeMenaces} />
                    

                  </div>
              </BrowserRouter>
      
      </main>


    </div>
  );
}

export default Home;