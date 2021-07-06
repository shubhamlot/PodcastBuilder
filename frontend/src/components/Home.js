import {  makeStyles } from "@material-ui/core";
import EpisodeDisplay from "./EpisodeDisplay";
import NavBar from "./Navbar";
import AuthContext from '../context/auth-context'
import React,{ useContext } from "react";

const useStyles = makeStyles((theme)=>({
  root:{
    backgroundColor:"#303030",
    height:"100%",
    minHeight:"100vh",
    width:"99%"
  }
}))

    

export default function Home(param){
  const classes = useStyles()
  const auth = useContext(AuthContext)

    return(
        <div className={classes.root}>
        <NavBar username={auth.username}/>

        <EpisodeDisplay/>
        
       
        </div>
    )
}