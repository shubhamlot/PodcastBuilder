import React,{useContext} from 'react'
import {ThemeProvider,createMuiTheme, makeStyles,Paper,Container,Grid} from '@material-ui/core'
import Navbar from './Navbar'
import logo from '../logo.svg'
import {  gql, useQuery } from '@apollo/client'
import AuthContext from '../context/auth-context'
import AllGuests from './AllGuests'
import {Redirect} from 'react-router-dom'
const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },

});

const SHOW_CHANNEL = gql`
  query channelInfo ($userId:String){
      channelInfo(userId:$userId){
       channelName
       profileImage
       discription
       language
       country
       contenttype
       creator
      }
  }
`

const useStyles = makeStyles((theme) => ({

	container:{
		padding:20,
		width:"100%",
		height:"100vh",
		display:"flex"
	},
	img:{
		width:"100%",
		height:"70%",
		},
	box:{
		
		padding:20
	}
}))

export default function ChannelInfo(){
	const auth = useContext(AuthContext)
	const classes = useStyles();
	 const{ loading,err,data} = useQuery(SHOW_CHANNEL,{
      variables: {userId:auth.userId},
    })

	 if(loading)return<p>loading</p>

	 if(auth.isGuest) return <Redirect to="createchannel"/>
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
			<Navbar/>
			<Container maxWidth="lg">
			<Paper className={classes.container}>
				<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={4}>
				<img className={classes.img} src={`http://localhost:4000/images/${data.channelInfo.profileImage}`}/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={4}>
					<h1>{data.channelInfo.channelName}</h1>
					<h3>{data.channelInfo.discription}</h3>
					<h3>{data.channelInfo.country}</h3>
					<h3>{data.channelInfo.language}</h3>
					<h3>{data.channelInfo.contenttype}</h3>

				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={4}>
					<h1><AllGuests params={data.channelInfo.creator}/></h1>
					<h2>Created on</h2>
				</Grid>
				</Grid>
			</Paper>
			</Container>
			</ThemeProvider>
		</React.Fragment>
		)
}