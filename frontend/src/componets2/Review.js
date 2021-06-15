import { Box,makeStyles,Grid } from '@material-ui/core'
import logo from '../logo.svg'
const useStyles = makeStyles((theme) => ({
    box:{
        padding:10,
        borderRadius:5
    },
    root:{
        display:'flex'
    },
    item:{
        flex:1,
        margin:2,
        padding:5,

        
    },

    img:{
        
        width:150,
        height:150
    }
  }));

export default function Review(){
    const classes = useStyles()
    return (
        <Box border={1} className={classes.box}>
            <Grid container className={classes.root}>
                <Grid item className={classes.item}>
                    <div>
                    <img className={classes.img} src={logo} alt="image"/>
                    </div>
                    <div>
                        <p>participants</p>
                    </div>
                </Grid>
                <Grid item className={classes.item}>
                    <div>
                        <h1>Header</h1>
                    </div>
                    <div>
                        <p>discription</p>
                    </div>
                </Grid>
                <Grid item>
                    <audio controls>

                    </audio>
                </Grid>
            </Grid>
        </Box>
    )
}