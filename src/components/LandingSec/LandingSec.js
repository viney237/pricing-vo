import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import CircularProgress from '@material-ui/core/CircularProgress';
import CardSec from './CardSec/CardSec';
import DetailView from '../DetailView/DetailView';
import './LandingSec.css';

const data = "http://35.180.249.248:5002/data"

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
  };
  
function Transition(props) {
return <Slide direction="up" {...props} />;
}

class LandingSec extends Component {

    constructor(props) {
        super(props)
        this.state = {
          cars: [],
          pageSize: 16,
          currentPage: 1,
          loading: true,
          open: false,
          carDetails: {}
        }
    }

    clickHandler = (car) => {
       return car;
    }

    handleClick = (event) => {
        this.setState({
          currentPage: event.target.id
        });
      }

    componentDidMount() {
        axios.get(data, {
            "access-control-allow-origin" : "*",
        }
        )
        .then(res => {
        this.setState({ cars: res.data, loading: false })
        })
    }
    
    handleClickOpen = (index) => {
        this.setState({ 
            open: true,
            carDetails: index 
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        const { classes } = this.props;
        const { cars, currentPage, pageSize } = this.state
        // const pageNo = Math.ceil(cars.length / pageSize)
        const indexOfLastTodo = currentPage * pageSize;
        const indexOfFirstTodo = indexOfLastTodo - pageSize;
        const carsToDisplay = cars.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTools = carsToDisplay.map((car) => {
            return(
            
                <Grid
                item key={car.Index} 
                onClick={()=>this.handleClickOpen(car)}
                
                >
                    <CardSec 
                    name={car.marque.toUpperCase()}  
                    model={car.mod\u00e8le.toUpperCase()}
                    version={car.version} 
                    carburant={car.carburant}
                    image={"https://dynamic-pricing-intern.s3.eu-west-3.amazonaws.com/images/" + car.Location_Image.substring(25) }
                    kilometrage={car.kilometrage}
                    annee={car.annee}
                    boite_de_vitesse={car.boite_de_vitesse}
                    click={()=>this.clickHandler(car)}
                    price={Math.round(car.prediction)}
                    />
                </Grid>
            )   
        })
        
        const pageNumbers = [];
        let  k = Number(currentPage);
        
        for(let i=k-1; i<k+6; i++){
            pageNumbers.push(i);
        }
        
        
        // console.log(k)
        // console.log(pageNumbers);


        const renderPageNumbers = pageNumbers.map(number => {
            return (
                    <span 
                    
                    className="span" 
                    key={number}
                    id ={number}
                    onClick={this.handleClick}
                    >
                    {number}
                    </span>
            );
          });

        return(
            <div className="HomeSection">
                <Grid 
                 container
                 direction="row"
                 justify="center"
                 alignItems="flex-start"
                 spacing={4}
                 >     

                    {
                        this.state.loading ? (
                            <CircularProgress 
                            size={130}
                            color='primary'
                            variant="indeterminate"
                            />
                        ) : renderTools
                    }   
    
                </Grid>
                
                <div className="pagination">
                    {
                        this.state.loading ? null: renderPageNumbers
                    }
                </div>

                <div>
                <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            TNP-DYNAMIC-PRICING
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <DetailView car={this.state.carDetails}/>
                </Dialog>
                </div>
                    
            </div>
             
         );
    }
    
}

LandingSec.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(LandingSec);