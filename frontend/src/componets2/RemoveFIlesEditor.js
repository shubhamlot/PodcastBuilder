
import {gql, useQuery} from '@apollo/client';
import { Icon, IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import AllGuests from './AllGuests';
import {Delete} from '@material-ui/icons'

const SHOW_FILE = gql`
  query file ($roomid:String){
      files(roomid:$roomid){
        _id
        speaker
        file
        speech
      }
  }
`


const useStyles = makeStyles((theme) => ({
    box:{
      display:'block'
    },
    tab:{
      listStyleType:"none",
      borderRadius:"1px",
      backgroundColor:"#ede7f6",
      marginTop:1,
      marginLeft:5,
      fontWeight:"bold",
      fontSize:"15px",
      cursor:"pointer",
      width:"90%" 
    },
    tabhead:{
    paddingLeft:"10px",
    paddingTop:"10px",
    display:"flex"
    },
    speech:{
      fontSize:"15px",
      fontWeight:"100",
      marginLeft:1
    },
    ul:{
        width:"100%"
    },
    subdiv:{
        flex:1
    },
    icon:{
        cursor:"pointer",
        '&:hover':{
            color:"red"
        }
    },


}))


function App() {
 
  let initialList = []
  const classes = useStyles();
  const [state,setState] = useState(initialList)

  const { room } = useParams()
    
    const{ loading,err,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room},
    //   pollInterval: 500,
    })

    let audiolist =[]
    if(loading) return <p>loading</p>
    if(data){
    
    
    data.files.map((audio)=>{
        audiolist.push(audio)
    })
   
    
    
    }

    const handleRemove = (id) => {
        audiolist.pop()
        console.log(audiolist)
        return audiolist
    }



  return (
    <div className="App">
              <ul className={classes.ul} >
                
                {audiolist.map(({_id, speaker,speech,file}, index) => {
                  return (
                        <li className={classes.tab} >
                          <div className={classes.tabhead}>
                              <div className={classes.subdiv}>
                          <AllGuests params={speaker}/>
                          <div className={classes.speech}>
                            {/* <AllGuests params={voice.speaker}/> */}
                             
                            <p >{speech}</p>
                            
                            </div>
                          </div>
                          <div className={classes.icon}>
                              <IconButton onClick={()=>{handleRemove(_id)}}>
                                  <Delete/>
                              </IconButton>
                          </div>
                          
                          </div>
                         
                        </li>
                      )
                  
                })}
              
              </ul>
            

      
    </div>
  );
}

export default App;


