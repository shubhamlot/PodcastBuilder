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
       rss
      }
  }
`

const useStyles = makeStyles((theme) => ({

	container:{
		padding:20,
		width:"100%",
		height:"100%",
		display:"flex",
		marginTop:50
	},
	img:{
		width:"100%",
		height:"100%",
		},
	box:{
		
		padding:20
	},
	dis:{
		height:"10px",
		overFlowY:"hidden"
	}
}))

export default function ChannelInfo(){
	const auth = useContext(AuthContext)

	const classes = useStyles();
	 const{ loading,err,data} = useQuery(SHOW_CHANNEL,{
      variables: {userId:auth.userId},
      // pollingIntrval:100
    })


	 if(loading)return<p>loading</p>
	 	console.log(data)

	 if(auth.isGuest) return <Redirect to="createchannel"/>
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
			<Navbar/>
			<Container maxWidth="lg" minHeight="100%">
			<Paper className={classes.container} >
				<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={4}>
				<img className={classes.img} src={`http://localhost:4000/images/${data.channelInfo.profileImage}`}/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={6}>
					<h2>Channel Name:{data.channelInfo.channelName}</h2>
					<div className={classes.dis}>
					<h3>Discription:</h3><p>{data.channelInfo.discription}</p>
					</div>
				</Grid>
				<Grid item xs={12} >
					<h3>Country: {data.channelInfo.country}</h3>
					<h3>Language: {data.channelInfo.language}</h3>
					<h3>Content Type: {data.channelInfo.contenttype}</h3>
					<h1>Owner:<AllGuests params={data.channelInfo.creator}/></h1>
					{/*<h2>Created on</h2>*/}
					
					
						<h4>RSSLink: {data.channelInfo.rss}</h4>
				</Grid>
				</Grid>
			</Paper>
			</Container>
			</ThemeProvider>
		</React.Fragment>
		)
}