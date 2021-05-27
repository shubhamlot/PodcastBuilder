
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
 

  const classes = useStyles();
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = audioList
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    audioList=items
  }

  const { room } = useParams()
    
    const{ loading,err,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room},
    //   pollInterval: 500,
    })

    let audioList =[]
    if(loading) return <p>loading</p>
    if(data){
    
    data.files.map((audio)=>{
        audioList.push(audio)
    })
    
    }

    const onClick = (title) => {
        let list = audioList
        list.pop()
        audioList = list
    }



  return (
    <div className="App">

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className={classes.ul} {...provided.droppableProps} ref={provided.innerRef}>
                {audioList.map(({_id, speaker,speech,file}, index) => {
                  return (
                    <Draggable  key={_id} draggableId={_id} index={index}>
                      {(provided) => (
                        <li className={classes.tab} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className={classes.tabhead}>
                              <div className={classes.subdiv}>
                          <AllGuests params={speaker}/>
                          <div className={classes.speech}>
                            {/* <AllGuests params={voice.speaker}/> */}
                             
                            <p >{speech}</p>
                            
                            </div>
                          </div>
                          
                          </div>
                         
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>

        </DragDropContext>
        
      
    </div>
  );
}

export default App;


