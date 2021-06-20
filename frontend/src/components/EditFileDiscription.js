import { TextField,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    uploadbutton:{
        width:'25%',
        backgroundColor:'#ffd54f',
    }
  }));

export default function Discription(){
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
             <TextField  label="Audiofile" variant="outlined" disabled />
            <TextField  label="Episode Name" variant="outlined" />
            <TextField  label="Discription" variant="outlined" multiline rows={4} />
            <Button className={classes.uploadbutton} variant="contained" component="label">Cover Pic
            <input type="file" accept="image/png, image/jpeg" hidden 
            name="file" />
            </Button>
        </form>
    )
}