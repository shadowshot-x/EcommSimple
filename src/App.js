import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Authpage from "./Components/Authpage";
import Productlist from "./Components/Productlist";
import firebase from './firebase.js';
import {Grid} from "@material-ui/core";

class App extends Component {

  componentDidMount(){
    const itemsRef = firebase.database().ref('baseProducts');
    itemsRef.on('value', (snapshot) => {
        console.log(snapshot.val());
        this.props.addProductsToStore({products:snapshot.val()})
      });
}
  render() {
    return (
      <div className="App">
        <Grid>
          <Grid style={{margin:"2vh"}} item xs={4}>
            
          </Grid>
        </Grid>
        {this.props.state?<div>
          {this.props.state.user?<div style={{padding:"10vh"}}><Productlist/></div>:<Authpage />}
        </div>:<div>Please Wait</div>}
       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('i am called when store is updated',state)
  return {
    state: state
  };
}

const mapDispatchToProps=(dispatch)=>{
  return ({
    addProductsToStore:(payload1)=>{dispatch({type:'INITIATE_PRODUCTS',payload:payload1})}
})
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

