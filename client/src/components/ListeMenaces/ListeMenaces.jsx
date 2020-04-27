import React,{Component} from 'react'
import API from '../../utils/API';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Container} from "reactstrap";
import {Row} from "react-bootstrap";



 class nomClass extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            modal: false,
            idSelected:'00',
            selected:"tous",
            search:"",
            erreur:false,
        }
    }

    
     
    
     componentDidMount(){
         const callChange=(s)=>{
            this.setState(
                {list:s,}
            );
            return;
        }
        const erreur=(s)=>{
            this.setState(
                {erreur:s,}
            );
            return;
        }
         
        API.getAllMenace(this.props.match.params.id).then(function(data){
            callChange(data.data.response);
            
            return;
                },function(error){
                    erreur(true);
                    console.log(error);
                    return;
                })

        
     }

   
  onchange (e) {
      this.setState({search:e.target.value})
          };
        

         

    render(){
        
        

        const columns=[
            {
                Header:"№",
                style:{
                    textAlign:"right"
                },
                width:50,
                    maxWidth:50,
                    minWidth:40,
                Cell:props=>{
                    return (<div>
                        
                        <button className="btn-secondary d-inline"
                                >
                                 {this.state.list.indexOf(props.original)}
                        </button>
        
        
                    </div>
                        
                    );
                },
                sortable:false,
            filterable:false
    },

            {
            Header:"Adresse",
            accessor:"adresse",
            style:{
                textAlign:"left"
            },
            width:100,
            maxWidth:100,
            minWidth:100
        },
        {
            Header:"typeCrime",
            accessor:"typeCrime",
            
            sortable:true,
            width:80,
            maxWidth:80,
            minWidth:40
        },
        {
            Header:"mechant concerné",
            accessor:"mechant",
            sortable:true,width:70,
            maxWidth:70,
            minWidth:60

        },
        {
            Header:"horaire",
            accessor:"horaire",
            sortable:true,width:70,
            maxWidth:70,
            minWidth:60

        },
        {
            Header:"description",
            accessor:"description",
            sortable:true,width:70,
            maxWidth:70,
            minWidth:60

        },
        
        
        
    {
        Header:"Actions",
       
        Cell:props=>{
            return (<div>
                        lu

                     </div>
                
            );
        },
        sortable:false,
            filterable:false
    }]
        return (
            <Container>
                <Row>
                    <div className="col-sm-5">
                        <h3>listes des menaces</h3>
                    </div>
                    
                </Row>
                    
                    <hr/>
                <ReactTable
                className="col-lg-8"
                columns={columns}
                data={this.state.list}
                noDataText={"table vide..."}
                filterable
                defaultPageSize={15}
                >

                </ReactTable>
            </Container>
            
        )
    }
}

export default nomClass; //import nomClass from "../..path" pour usage
