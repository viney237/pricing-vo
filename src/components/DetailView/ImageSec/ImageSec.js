import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Typography, Grid} from '@material-ui/core';
import { LocalGasStation, CalendarToday, TimeToLeave, Timeline } from '@material-ui/icons';

import StarRatingSec from '../StarRatingSec/StarRatingSec';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    height: '500px'
  },
  controls: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
});

const MediaControlCard = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Grid item sm={8}>
                <CardMedia
                className={classes.cover}
                image={props.image}
                title="carImage"
                />
            </Grid>
            <Grid item sm={4}>
                <div className={classes.details} style={{textAlign:'center'}}>
                    <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h4" component="h5">
                        {props.name} {props.model} 
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="h5">
                        {props.version} 
                    </Typography>
                    <div className={classes.controls}>
                        <CardContent>
                            <LocalGasStation/>
                            <Typography>{props.carburant}</Typography>
                        </CardContent>
                        <CardContent>
                            <TimeToLeave/>
                            <Typography>{props.kilometers}</Typography>
                        </CardContent>
                        <CardContent>
                            <CalendarToday/>
                            <Typography>{props.annee}</Typography>
                        </CardContent>
                        <CardContent>
                            <Timeline/>
                            <Typography>{props.boite_de_vitesse}</Typography>
                        </CardContent>
                    </div>
                    <hr></hr>
                    <Typography component="h5" variant="h5" style={{marginTop: '20px'}}>
                        PRIX: 
                        <span style={{color:'#553c8b', fontWeight:'bold'}}>{props.price}€</span>
                    </Typography>
                    </CardContent>

                    {/********** STAR-RATING-SECTION ***********/}
                      <StarRatingSec rating={props.rating}/>
                </div>
            </Grid>
            </Grid>
        
       
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
