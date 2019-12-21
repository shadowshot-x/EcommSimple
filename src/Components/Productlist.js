import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid,Typography,Button,Card,CardActionArea,CardActions,CardContent,CardMedia} from "@material-ui/core";
import firebase from '../firebase.js';

class Productlist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user:this.props.state.user
         }
         this.handleInc=this.handleInc.bind(this);
         this.handleDec=this.handleDec.bind(this);
         this.handleSave=this.handleSave.bind(this);
    }
    componentDidMount(){
        this.setState({
            user:this.props.state.user
        })
    }
    handleInc(id){
        let z=id.toString();
        let zval=this.state.user[z]+1;
        let user={...this.state.user,[z]:zval}
        console.log(user);
        this.setState({
            user
        })
    }
    handleDec(id){
        let z=id.toString();
        let zval=this.state.user[z]-1;
        let user;
        if(zval<0){
            user={...this.state.user,[z]:0}
            console.log(user);
            this.setState({
                user
            })
        }
        else{
            user={...this.state.user,[z]:zval}
            console.log(user);
            this.setState({
                user
            })
        }

        
    }
    handleSave(){
        this.props.updateUser(this.state.user);
        const userList = firebase.database().ref('existingusers');
        let x;
        userList.on('value', (snapshot) => {
            let flag=false;
            x=snapshot.val();
            let d;
            Object.keys(x).forEach((ele)=>{
                if(x[ele].email==this.state.user.email){
                    d=x[ele];
                    flag=true;
                    firebase.database().ref('existingusers/'+ele).set(this.state.user);
                }
            })
            console.log(d);
          });
    }
    render() { 
        let x=this.props.state.products;
        let currentCost=0;
        Object.keys(x).forEach((ele)=>{
            currentCost=currentCost+(this.state.user[x[ele].id1]*x[ele].price);
        })
        return (
            <Grid container>
                
            <Grid item container xs={8}>
                {Object.keys(x).map((ele)=>{
                    // currentCost=currentCost+(this.state.user[x[ele].id1]*x[ele].price);
                    return <Grid item xs={6} style={{marginTop:"2vh"}}>
                        <Card style={{maxWidth:340}}>
                            <CardActionArea>
                                <CardMedia style={{height:140}}
                                image={x[ele].img}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {x[ele].title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {x[ele].description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                Price : {x[ele].price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.user[x[ele].id1]}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button style={{backgroundColor:"red",color:"white"}} onClick={()=>this.handleInc(x[ele].id1)}>+</Button>
                            <Button style={{backgroundColor:"red",color:"white"}} onClick={()=>this.handleDec(x[ele].id1)}>-</Button>
                            </CardActions>
                        </Card>


                    {/* <div>{x[ele].title} and {this.state.user[x[ele].id1]*x[ele].price}</div>
                    <Button onClick={()=>this.handleInc(x[ele].id1)}>+</Button>
                    <Button onClick={()=>this.handleDec(x[ele].id1)}>-</Button> */}
                    </Grid>
                })}
                
            </Grid>
            <Grid item xs={4} style={{paddingTop:"17vh",backgroundColor:"#2F2A2A"}}>
                <Button onClick={this.handleSave} className="button_b">SAVE</Button>
                <Typography variant="h3" style={{paddingTop:"5vh",color:"white"}}>Current Price : {currentCost} </Typography>
            </Grid>
            </Grid> 
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
        updateUser:(payload1)=>{dispatch({type:'INITIATE_USER',payload:payload1})}
    })
  }
   
export default connect(mapStateToProps,mapDispatchToProps)(Productlist);
