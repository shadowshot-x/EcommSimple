import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button,Grid} from "@material-ui/core";
import firebase,{ auth, provider } from '../firebase.js';

class Authpage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user:null
         }
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
    }
    logout() {
        auth.signOut()
          .then(() => {
            this.props.loginTheUSer(null);
          });
      }
    login() {
        auth.signInWithPopup(provider) 
          .then((result) => {
            const user = result.user;
            const userList = firebase.database().ref('existingusers');
            let x;
            // userList.push({email:user.email});
            userList.on('value', (snapshot) => {
                let flag=false;
                x=snapshot.val();
                let d;
                Object.keys(x).forEach((ele)=>{
                    if(x[ele].email==user.email){
                        d=x[ele];
                        flag=true;
                    }
                })

                if(flag==true){
                    console.log("Exisitng user")
                    this.props.loginTheUSer(d);
                }
                else{
                    console.log("new user");
                    userList.push({email:user.email,
                    1:0,
                    2:0,
                    3:0,
                    4:0
                        });
                }
              });
            
          });
      }
    

    render() { 
        return ( 
            <Grid container style={{color:"white",fontFamily:"domine-bold"}}>
                <Grid item xs={6} style={{marginTop:"13vh"}}>
                <Button className="example_a" onClick={this.login}>LOG-IN</Button>
                </Grid>
                <Grid item xs={6} style={{fontSize:"6em",marginTop:"10vh"}}>
                  An E-commerce Website with Exclusive Products.
                </Grid>
                <Grid item>
                
                </Grid>
            </Grid>
         );
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    };
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return ({
        addProductsToStore:(payload1)=>{dispatch({type:'INITIATE_PRODUCTS',payload:payload1})},
        loginTheUSer:(payload2)=>{dispatch({type:'INITIATE_USER',payload:payload2})}
    })
  }
   
export default connect(mapStateToProps,mapDispatchToProps)(Authpage);
