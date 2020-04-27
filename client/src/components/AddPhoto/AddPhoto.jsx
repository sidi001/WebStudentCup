import React, { Component } from 'react';

import {Container} from "reactstrap";
import API from '../../utils/API';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
 
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
 
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
 
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


class AddPhoto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uri:null,
      fileVide:false,
      validate:false,
      erreur1:false,
        // Set initial files, type 'local' means this is a file
        // that has already been uploaded to the server (see docs)
        files: []
    };
}

handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}
    // Set initial files, type 'local' means this is a file
        // that has already been uploaded to the server (see docs)
  // const [state,setState]=React.useState({files:[]});


   onClickHandler(event){

      const setValidate=(s)=>{
        this.setState({validate:true,fileVide:false,uri:s});
      }
      const setError=()=>{
        this.setState({validate:false,fileVide:true})
      }
        const data = new FormData() ;
        console.log(data);
        if(!this.state.files[0]) {
          this.setState({fileVide:true,validate:false});
          console.log("this.state.files");
          return;};
       var fichier=this.state.files[0];
       console.log(fichier);
        data.append('file', fichier);
        console.log(data.get("file"));
        API.uploadImage(data).then(function(data0){
          setValidate(data0.data.uri);
          console.log("uploaded2...."+data0.data.uri);
        }
        ,function(error){
          setError();
          console.log(error);
          return;
      })

    
  }

    valideurPhoto(){
          const SetErreur1=()=>{this.setState({erreur1:true})}
          const { match: { params } } = this.props;

          const  _send={"photo":this.state.uri,"idUser":params.id}
          console.log(_send);
          API.updatePhoto(_send).then(function(data){
            window.location = '/'+params.id+"/"+params.at+"/profil";
            return;
        },function(error){
            SetErreur1();
            console.log(error);
            return;
        })
      } 
      
      annuler(){
        
        const { match: { params } } = this.props;

        const  _send={"photo":this.state.uri}
        console.log(_send);
        API.AnnulerUploadPhoto(_send).then(function(data){
          window.location = '/'+params.id+"/"+params.at+"/profil";
          return;
      },function(error){
          console.log(error);
          return;
      })
    }
  
     render(){

      return (
        <Container >
           <br />
          
        
          <h1 className="col-sm-3 d-inline" style={{marginTop:"4em",marginLeft:"2em"}}>
          {this.state.validate===true &&
              <div className="row">
                <IconButton >
                  <ChevronLeftIcon />
                </IconButton>
                <button typy="button" className="btn btn-info" onClick={()=>this.annuler()}>
                
                retour
              </button>
              </div>
              }
          changement de photo de profil</h1>
          <hr/>
          <div className="container">
                          {this.state.erreur1===true && <div className="alert alert-danger">
                                    <strong>Erreur!</strong> 
                                    <div>erreur de validation du fichier!!</div>
                                  
                                      </div>}
                <div className="row">
                <div  className="jumbotron offset-md-3 col-md-6">
          
                    <div className="form-group files">
                        <label>Télécharger Votre Image ici</label>
                           {/* Pass FilePond properties as attributes */}
                              <FilePond ref={ref => this.pond = ref}
                                        files={this.state.files}
                                        allowMultiple={true}
                                        maxFiles={1}
                                        oninit={() => this.handleInit() }
                                        onupdatefiles={fileItems => {
                                          
                                            // Set currently active file objects to state
                                            this.setState({
                                              validate:false,
                                              fileVide:false,
                                              erreur1:false,
                                                files: fileItems.map(fileItem => fileItem.file)
                                            });
                                            console.log("ffff");
                                            console.log(this.state.files);
                                        }}>
                              </FilePond>
                                
                                {/* <input type="file"  name="file" onChange={onChangeHandler}/> */}
                                {this.state.validate===true && <div className="alert alert-success">
                                    <strong>Success!</strong> 
                                    <div>l'image est bien enregistrer sur notre serveur</div>
                                  
                                      </div>}
                               {this.state.fileVide===true && <div className="alert alert-danger">
                                    <strong>Erreur!</strong> 
                                    <div>veillez choisir un fichier!!</div>
                                  
                                      </div>}
                                {this.state.validate===false && <button type="button" className="btn btn-secondary" onClick={()=>this.onClickHandler()}> Enregistrer</button>}
                                {this.state.validate===true && 
                                  <div>
                                    <button type="button" className="btn btn-danger" style={{background:"red"}} onClick={()=>this.annuler()}>
                                         Annuler
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={()=>this.valideurPhoto()}>
                                         valider le changement
                                    </button>

                                    
                                  </div>
                                }


                            </div>
                      
                  </div>

                </div>

          </div>
          
          
  
        </Container>
    );
  }
  }

  export default AddPhoto;