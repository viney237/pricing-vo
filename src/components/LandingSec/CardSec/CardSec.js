import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} onClick={props.click}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Voiture"
          className={classes.media}
          height="160"
          width="150"
          image={props.image}
          title="car details"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.name} {props.model}  <span style={{fontWeight: 'bold', float:'right', color: '#553c8b'}}>{props.price}€</span>
          </Typography>
          <Typography gutterBottom component="p" variant="subtitle2">
            {props.version}
          </Typography>
          <Typography component="h1" >
            {props.carburant} / {props.kilometrage} / {props.annee} / {props.boite_de_vitesse}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
