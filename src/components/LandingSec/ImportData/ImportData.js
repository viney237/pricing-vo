import React, {Component} from 'react';
import { Grid, Card, CardContent, Typography, Fab, Button, Table, Paper, TableHead, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Send, Done, Clear } from '@material-ui/icons';
import axios from 'axios';

import './ImportData.css';

const styles = theme=>({
    card: {
        width: 'auto',
        minWidth: 800,
        height: 'auto',
        marginBottom: 20, 
    },
    margin:{
        marginTop: 30
    },
    iconSmall: {
        fontSize: 20,
        marginRight: 5
    },
    rightIcon: {
        marginLeft: 10,
    },
    fab: {
        margin: 30
    },
    typography: {
        fontWeight: 'bold'
    }
});


class ImportData extends Component {

    

    state = {
        csv: '',
        json: [],
        button: [],
        button2: [],
        textField: [],
        tableList: null,
        value: '',
        finalJson : []
    }

    importCSV = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        console.log(file);
        reader.onload = (e)=>{
            this.setState({
                csv: e.target.result
            },() => {
                let json = this.csv2json(this.state.csv);
                this.setState({
                    json
                })
            },()=>{
                this.onClickSend();
                e.target.value = null;
            });
        }
    }

    buttonClicked(i){
        let button3 = [...this.state.button];
        let button4 = [...this.state.button2];
        let text1 = [...this.state.textField];

        if(this.state.button[i] === false){
            button3.splice(i, 1, false)
            button4.splice(i, 1, true)
            text1.splice(i, 1, true)
        }
        this.setState({button:button3, button2:button4, textField:text1, value: ''})
        
    }

    buttonClicked1(i){
        let button3 = [...this.state.button];
        let button4 = [...this.state.button2];
        let text2 = [...this.state.textField];

        console.log(button4);

        if(this.state.button2[i] === false){
            button4.splice(i, 1, false)
            button3.splice(i, 1, true)
            text2.splice(i, 1, false)
        }
        console.log(button4)
        this.setState({button:button3, button2:button4, textField:text2})
    } 

    textFieldClicked(e, i){
        console.log('Hello text field');
        let value = e;
        console.log(value);
        this.setState({
            value
        })
        let button5 = [...this.state.button];
        let button6 = [...this.state.button2];

        if(this.state.button[i] === true){
            button5.splice(i, 1, false)
            button6.splice(i, 1, true)
        }
        this.setState({button:button5, button2:button6})
    }

    // **************** Convert CSV2JSON ***************//

            csv2json = (csvText) => {
                //Split all the text into seperate lines on new lines and carriage return feeds
                var allTextLines = csvText.split(/\r\n|\n/);
                //Split per line on tabs and commas
                var headers = allTextLines[0].split(/\t|,/);
                var locations = [];

                for (var i=1; i<allTextLines.length; i++) {
                    var data = allTextLines[i].split(/\t|,/);

                    if (data.length === headers.length) {

                    var location = {"ID":Number(data[1]), "marque_simplifié":data[2],
                    "Nb_jours":Number(data[3]),
                    "kilometrage":Number(data[4]),
                    "prix_TTC":Number(data[5]),
                    "Co2":Number(data[6]),
                    "codeRegion":Number(data[7]),
                    "Prix_New2": (data[8])};

                    locations.push(location);

                    }

                }
                return JSON.stringify(locations);
            }

    // ****************Making a POST request on the API: http://ec2-35-180-119-230.eu-west-3.compute.amazonaws.com:5000/predict ***************//
    sendToAPI = () => {
        const data = JSON.parse(this.state.json);
        this.setState({
            buttonClicked: true
        });

        axios.post('http://35.180.249.248:5001/predict', 
            data 
        )
          .then(response => {
                const jsonFromState = JSON.parse(this.state.json);
                const string = JSON.stringify(response.data).replace("{","").replace("}","").replace("\"","");
                const values = string.split(",");
                
                //************** */ converting array to object /*************** */
                const predictedJson = values.map((str, index) => {
                    return {Prix_Predicted: str, ID:index}
                  });

                //************* */ Mergin both jsonFromState and predictedJson gives the finalJson /**************//
                jsonFromState.forEach((itm, i) => {
                    this.state.finalJson.push(Object.assign({}, itm, predictedJson[i]));
                  });
                  this.setState({
                    json: this.state.finalJson
                  },()=>{

                      //pushin the NULL array to the button
                    let buttonFalse = []
                    let textFieldTrue = []
                    for(let k=0; k<this.state.finalJson.length; k++){
                        buttonFalse.push(false);
                        textFieldTrue.push(true);
                    }
                    this.setState({
                        button: buttonFalse,
                        button2: buttonFalse,
                        textField: textFieldTrue
                    })
                  });
          })
          .catch(error => {
            console.log(error);
          });
    }


    onClickSend = () => {
        let data = JSON.parse(this.state.json);  
        console.log(data);
    }

    resetHandler = () => {
        this.setState({
            finalJson:[],
            buttonClicked: false,
        })
    }


    render(){
        
        const { classes } = this.props;
        return(
            
            <Grid container
            direction="row"
            justify="center"
            alignItems="center">
                <Card className={classes.card}>
                    <CardContent style={{textAlign:'center', marginTop:'40'}}>
                        <Typography gutterBottom variant="h5" component="h2" style={{ marginTop: 20}}>
                            IMPORT DATA
                        </Typography>
                        <Typography component="p">
                            Import your CSV by clicking on the button below:
                        </Typography>

                            <div>
                                <input id="myInput" 
                                type="file"
                                onChange={(e)=>this.importCSV(e)}
                                ref={(ref) => this.myInput = ref} 
                                style={{ display: 'none' }} />
                                    <Fab
                                    variant="extended" 
                                    aria-label="upload" 
                                    className={classes.fab}
                                    onClick={() => this.myInput.click() }
                                    >

                                        <CloudUploadIcon className={classes.iconSmall}/>
                                        <Typography className={classes.typography}>
                                            Upload CSV
                                        </Typography>
                                    </Fab>
                            </div>
                               
                                    
                                        <div>
                                            <Button onClick={this.sendToAPI} variant="contained" color="primary" className={classes.button}>
                                                Send
                                                <Send className={classes.rightIcon}></Send>
                                            </Button>
                                        </div>
                                  
                                 
                    </CardContent>

                    <CardContent>
                        {
                            this.state.buttonClicked ? (
                            <div>
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>MARQUE</TableCell>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>N.O DU JOUR</TableCell>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>KILOMETRAGE</TableCell>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>Co2</TableCell>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>CODE REGION</TableCell>
                                                <TableCell align="center" style={{ color: 'green', fontWeight: 'bold'}}>PRIX-PREDICTED</TableCell>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>EDIT</TableCell>
                                                <TableCell align="center" style={{fontWeight: 'bold'}}>ENTER PRIX</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {
                                            
                                            this.state.finalJson.map((car, i)=>{

                                            return( 
                                            <TableRow key={car.ID}>
                                                <TableCell component="th" scope="row">{car.marque_simplifié}</TableCell>
                                                <TableCell align="center">{car.Nb_jours}</TableCell>
                                                <TableCell align="center">{car.kilometrage}</TableCell>
                                                <TableCell align="center">{car.Co2}</TableCell>
                                                <TableCell align="center">{car.codeRegion}</TableCell>
                                                <TableCell align="center" style={{color: 'darkgreen', fontWeight: 'bold'}}>{Math.round(car.Prix_Predicted)} €</TableCell>
                                                <TableCell align="center" style={{width: '20%'}}>
                                                    <Button 
                                                    variant="contained" 
                                                    style={{marginRight: '10px', backgroundColor:'green'}}
                                                    onClick={()=>this.buttonClicked(i)}
                                                    disabled={this.state.button[i]}
                                                    >
                                                        <Done/>
                                                    </Button>
                                                    <Button 
                                                    variant="contained"
                                                    style={{backgroundColor: 'red'}}
                                                    onClick={()=>this.buttonClicked1(i)}
                                                    disabled={this.state.button2[i]}
                                                    >
                                                        <Clear/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="center" >
                                                    <TextField
                                                        id="standard-name"
                                                        label="Prix*"
                                                        value={this.state.value.length < 5 ? this.state.value[6] : null}
                                                        disabled={this.state.textField[i]}
                                                        onChange={(e)=>this.textFieldClicked(e.target.value, i)}
                                                        margin="normal"
                                                        InputProps={{ inputProps: { min: 1000, max: 20000 } }}
                                                    />
                                                </TableCell>

                                            </TableRow>)})
                                        }
                                        </TableBody>
                                    </Table>
                                </Paper>
                                <div className="sendToDB">
                                    <Button variant="contained" onClick={this.resetHandler} color="primary" className={classes.button} style={{backgroundColor: 'lightgreen'}}>
                                        Send To DATABASE
                                        <Send className={classes.rightIcon}></Send>
                                    </Button>
                                </div>
                                
                            </div>
                            ) : ( 
                                null
                            )
                        }


                        
                    </CardContent>
                     
                    
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(ImportData);