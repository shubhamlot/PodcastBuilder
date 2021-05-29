
import {gql, useQuery} from '@apollo/client';
import { Button, Icon, IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import AllGuests from './AllGuests';
import {Delete, SettingsSharp} from '@material-ui/icons'

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
 
  
  const classes = useStyles();
  const [list,setList] = useState([])
  const [check,setCheck] = useState(0)
  const { room } = useParams()

  const {loading,data,error} = useQuery(SHOW_FILE,{
    variables:{roomid:room}
  })

  let audiolist =[]
  // console.log(data)
  if(loading) return <p>loading</p>
  data.files.map((item,index)=>{
    audiolist.push(item)
    
  })

  const handleRemove=(id)=>{
    const newList = list.filter((list) => list._id !== id);
 
    setList(newList);
  }

  const handleLoad=()=>{
    let temp =[]
    data.files.map((item,index)=>{
      temp.push(item)
      setList(temp)
    })
    
    if(list === []){
      console.log(list)
    }
    else{
      setCheck(true)
    }
    
  }

  if(!check){
   return( <div>
      <Button onClick={handleLoad}>Load</Button>
    </div>)
  }
  else{
  return (
    <div className="App">
              <ul className={classes.ul} >
                
                {list.map(({_id, speaker,speech,file}, index) => {
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
                              <IconButton onClick={()=>handleRemove(_id)}>
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
}

export default App;


