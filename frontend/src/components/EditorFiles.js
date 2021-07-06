
import {gql, useMutation, useQuery} from '@apollo/client';
import { Button, IconButton, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {  useParams } from 'react-router';
import AllGuests from './AllGuests';
import {Delete} from '@material-ui/icons'
import Loading from './loading'

const COMBINE = gql`
mutation CombineFiles($list:[String]){
  CombineFiles(list:$list)
   }
`

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
      // fontWeight:"bold",
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
    paperextra:{
      overflow:'auto',
      height: 300,
     
    },
    button:{
     
      padding:5,
      margin:5,
    
    },
    small:{
      fontSize:10
    }

}))



function App( props ) {
 
  
  const classes = useStyles();
  const [list,setList] = useState([])
  const [check,setCheck] = useState(0)
  const [combined,setCombined] =useState(false)
  const [file,setFile]=useState('')
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = list
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items)
  }

  const { room } = useParams()
    
    const{ loading,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room},
    //   pollInterval: 500,
    })

    const [combine] = useMutation(COMBINE,{
      onCompleted:(data)=>{
        props.parentCallback(data)
        setCombined(true)
        setFile(data)

      }
    })
    
    if(data.files[0] === undefined){
        return <h1>you dont have any file to combine</h1>
    }
    else{

    let audioList =[]
    if(loading) return <Loading/>
    if(data){
    
    data.files.map((audio)=>{
        audioList.push({_id:audio._id,speaker:audio.speaker,file:audio.file,apeech:audio.speech})
    })
    
    }
    const handleRemove=(id)=>{
      const newList = list.filter((list) => list._id !== id);
      console.log(list)
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
    const combineFunction=(e)=>{
      let temp=[]
      let audio = list
      audio.forEach((item)=>{temp.push(item.file)})
      
      combine({variables:{list:temp}})
      
      
    }

    if(!check){
      return( <div>
         <Button onClick={handleLoad}>Load</Button>
       </div>)
     }
     else{

      if(!combined){

  return (
    <Paper elevation={0} >

    <Paper className={classes.paperextra} elevation={0}>
    <div className="App">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className={classes.ul} {...provided.droppableProps} ref={provided.innerRef}>
                {list.map(({_id, speaker,speech,file}, index) => {
                  return (
                    <Draggable  key={_id} draggableId={_id} index={index}>
                      {(provided) => (
                        <li className={classes.tab} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className={classes.tabhead}>
                              <div className={classes.subdiv}>
                          <AllGuests params={speaker}/>
                       
                          {/* </div>
                         
                          <div className={classes.speech}> */}
                            {/* <AllGuests params={voice.speaker}/> */}
                             
                            <p >{speech}</p>
                            
                            </div>
                            <div className={classes.icon}>
                              <IconButton onClick={()=>handleRemove(_id)}>
                                  <Delete/>
                              </IconButton>
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
   </Paper>
   <Button onClick={combineFunction}  variant="contained" color="secondary">combine</Button>
    </Paper>
  )
  }
  
  else{
    
     return(<div className={classes.tab}>
        <div className={classes.tabhead}>{file.CombineFiles}</div>
        <p classesName={classes.small}>your file is combined and now ready to add in episodes</p>
      </div>)
  }

    }
  }

}



export default App;


