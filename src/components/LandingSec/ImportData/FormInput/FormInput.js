import React, { Component } from 'react';
import { Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography,Paper, Table, TableHead, TableCell, TableBody, TableRow, Fab} from '@material-ui/core';
import { Send, Done, Clear, SettingsBackupRestore } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Bgloader from '../../BgLoader/Bgloader';
import Chart from '../../../Chart/Chart';
import CarModel from '../../../../resources/data/car_model_list.json';

const styles = theme => ({
    card: {
        width: 'auto',
        maxWidth: 1250,
        height: 'auto',
        marginBottom: 60, 
        margin: 'auto'
    },
    container: {
        width: 800,
        height: 'auto',
        margin: 'auto'
    },
    rightIcon: {
        marginLeft: 10
    },
    FormWidth : {
        width: 300,
       marginLeft: 15,
       marginRight: 15
    },
    buttonMargin: {
        marginTop: 20,
        marginBottom: 20
    },
    headerMargin : {
        marginTop: 20,
        marginBottom: 20
    },
    fabProgress: {
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
});

let finalJSON = [];

const cars = CarModel;

class Forminput extends Component {
    state = {
        showTable: false,
        gbDisable: false,
        rbDisable: false,
        loading: false,
        disableSendButton: false,
        proba_de_vente: '',
        json:[],
        prixList: [],
        probaList: [],
        currentDropdown: cars.SELECT,
        inputJSON : 
            {
            ID: '' * 1,
            marque_simplifié : '', 
            Nb_jours : '',
            kilometrage: '',
            prix_TTC: Number(),
            Co2: Number() ,
            codeRegion: 94,
            Prix_New2: Number(),
            dummyModel: '',
            dummyImm: ''
        },
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.inputJSON);
        this.setState({
            disableSendButton: true
        })
        
        let json = this.state.inputJSON;
        let json2string = JSON.stringify(json);
        let json2array = "[" + json2string + "]" ;
        let data = JSON.parse(json2array);
        console.log(data);
        //************** */ POST REQUEST to get the predicted price /*************** */
        axios.post('http://35.180.249.248:5001/predict', 
            data
        )
          .then(response => {
            const jsonFromInputForm = data;
            const string = JSON.stringify(response.data).replace("{","").replace("}","").replace(/"/g,"");
            const values = string.split(",");
            
            //************** */ converting array to object /*************** */
            const predictedJson = values.map((str, index) => {
                return {Prix_Predicted: str * 1, ID:index}
            });

            //************* */ Mergin both jsonFromState and predictedJson gives the finalJson /**************//
          
            jsonFromInputForm.forEach((itm, i) => {
                finalJSON.push(Object.assign({}, itm, predictedJson[i]));
                }); 
              
                this.setState({
                    json: finalJSON
                })
            axios.post('http://35.180.249.248:5003/proba_vente', 
              data
            )
            .then(response2 => {
                const jsonPredicted = this.state.json;
                
                const string = JSON.stringify(response2.data).split(":")[1].replace("}","").replace(/"/g,"");
                const values1 = string.split(",");
                
                const probaJson = values1.map((str, index) => {
                    return {Proba_vente: str * 1, ID: index}
                });
                
                jsonPredicted.forEach((itm, i) => {
                    finalJSON.push(Object.assign(itm, probaJson[i]));
                });
                finalJSON.pop();

                this.setState({
                    json: finalJSON
                },() => {
                    axios.post('http://35.180.249.248:5003/courbe_proba_vente', 
                    [this.state.json[0].Prix_Predicted, this.state.json[0].Proba_vente]
                    )
                    .then(response3 => {
                        const prix = response3.data.prix;
                        const proba = response3.data.proba;
                        const prixList = [];
                        const probaList = [];
                        
                            for(var key in prix) {
                                var value2 = prix[key];
                                prixList.push(value2);
                            }
                            for(var key1 in proba) {
                                var value3 = proba[key1];
                                probaList.push(value3);
                            }
                            
                            this.setState({
                                prixList,
                                probaList
                            })
                            // pxL = [1, 2, 3];
                            // pbL = [100, 200, 300];

                            // finalJSON[0].prixList=chartData.labels;
                            // finalJSON[0].probaList=chartData.datasets[0].data;
                    }) 
                })
            }) 
        })
        .catch(error => {
            console.log(error);
          });

        //************** */ POST REQUEST to get the probability the vente /*************** */
        

        this.setState({
            showTable: true
        })
    
    }

    handleClear = () => {
        this.setState({
            showTable: false,
            disableSendButton: false,
            currentDropdown: cars.SELECT,
            inputJSON : 
            {
            ID: '' * 1,
            marque_simplifié : '', 
            Nb_jours : '',
            kilometrage: '',
            prix_TTC: Number(),
            Co2: Number() ,
            codeRegion: 94,
            Prix_New2: Number(),
            dummyModel: '',
            dummyImm: ''
        }
        });
        finalJSON = [];
    }

    handleChange = name => event => {
        this.setState({ 
            inputJSON: {
                ...this.state.inputJSON, 
                [name]: (name === 'dummyImm' || name==='marque_simplifié' || name === 'dummyModel') ? event.target.value : event.target.value * 1
            }
        }, ()=>{
            if(name === 'marque_simplifié'){
                this.setState({
                    currentDropdown: cars[event.target.value]
                })
            }
        })
        
    };

    onClickHandler = () => {
        this.setState({
            loading: true
        })
        setTimeout(()=>{
            this.setState({
                gbDisable: this.state.gbDisable,
                rbDisable: !this.state.gbDisable,
                loading: false
            })
        }, 3000)
    }

    render(){
        const { classes } = this.props;
        const { inputJSON : { marque_simplifié, Nb_jours, kilometrage, dummyModel, dummyImm }} = this.state;
        return(
            <Card className={classes.card}>
                <CardContent style={{textAlign:'center', marginTop:'40'}}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.headerMargin}>
                    FILL THE FORM TO PREDICT PRICE
                </Typography>            
                <form 
                className={classes.container} 
                onSubmit={this.handleSubmit}
                >
                    <br/>
                    {/* <AutoComplete /> */}
                    {/* <TextField
                        required
                        type="number"
                        label="Département de d'immatriculation"
                        margin="normal"
                        value={dummyImm}
                        onChange={this.handleChange('dummyImm')}
                        variant="outlined"
                        className={classes.FormWidth}
                    /> */}
                    <FormControl className={classes.FormWidth}>
                        <InputLabel htmlFor="Marque">Département de d'immatriculation</InputLabel>
                        <Select
                        required
                        value={dummyImm}
                        onChange={this.handleChange('dummyImm')}
                        >
                            <MenuItem value="">
                                <em>SELECT</em>
                            </MenuItem>
                            <MenuItem value={'01 Ain'}>01 Ain</MenuItem>
                            <MenuItem value={'02 Aisne'}>02 Aisne</MenuItem>
                            <MenuItem value={'03 Allier'}>03 Allier</MenuItem>
                            <MenuItem value={'04 Alpes-de-Haute-Provence'}>04 Alpes-de-Haute-Provence</MenuItem>
                            <MenuItem value={'05 Hautes-Alpes'}>05 Hautes-Alpes</MenuItem>
                            <MenuItem value={'06 Alpes-Maritimes'}>06 Alpes-Maritimes</MenuItem>
                            <MenuItem value={'07 Ardèche'}>07 Ardèche</MenuItem>
                            <MenuItem value={'08 Ardennes'}>08 Ardennes</MenuItem>
                            <MenuItem value={'09 Ariège'}>09 Ariège</MenuItem>
                            <MenuItem value={'10 Aube'}>10 Aube</MenuItem>
                            <MenuItem value={'11 Aude'}>11 Aude</MenuItem>
                            <MenuItem value={'12 Aveyron'}>12 Aveyron</MenuItem>
                            <MenuItem value={'13 Bouches-du-Rhône'}>13 Bouches-du-Rhône</MenuItem>
                            <MenuItem value={'14 Calvados'}>14 Calvados</MenuItem>
                            <MenuItem value={'15 Cantal'}>15 Cantal</MenuItem>
                            <MenuItem value={'16 Charente'}>16 Charente</MenuItem>
                            <MenuItem value={'17 Charente-Maritime'}>17 Charente-Maritime</MenuItem>
                            <MenuItem value={'18 Cher'}>18 Cher</MenuItem>
                            <MenuItem value={'19 Corrèze'}>19 Corrèze</MenuItem>
                            <MenuItem value={'21 Côte-dOr'}>21 Côte-dOr</MenuItem>
                            <MenuItem value={'22 Côtes-dArmor'}>22 Côtes-dArmor</MenuItem>
                            <MenuItem value={'23 Creuse'}>23 Creuse</MenuItem>
                            <MenuItem value={'24 Dordogne'}>24 Dordogne</MenuItem>
                            <MenuItem value={'25 Doubs'}>25 Doubs</MenuItem>
                            <MenuItem value={'26 Drôme'}>26 Drôme</MenuItem>
                            <MenuItem value={'27 Eure'}>27 Eure</MenuItem>
                            <MenuItem value={'28 Eure-et-Loir'}>28 Eure-et-Loir</MenuItem>
                            <MenuItem value={'29 Finistère'}>29 Finistère</MenuItem>
                            <MenuItem value={'2A Corse-du-Sud'}>2A Corse-du-Sud</MenuItem>
                            <MenuItem value={'2B Haute-Corse'}>2B Haute-Corse</MenuItem>
                            <MenuItem value={'30 Gard'}>30 Gard</MenuItem>
                            <MenuItem value={'31 Haute-Garonne'}>31 Haute-Garonne</MenuItem>
                            <MenuItem value={'32 Gers'}>32 Gers</MenuItem>
                            <MenuItem value={'33 Gironde'}>33 Gironde</MenuItem>
                            <MenuItem value={'34 Hérault'}>34 Hérault</MenuItem>
                            <MenuItem value={'35 Ille-et-Vilaine'}>35 Ille-et-Vilaine</MenuItem>
                            <MenuItem value={'36 Indre'}>36 Indre</MenuItem>
                            <MenuItem value={'37 Indre-et-Loire'}>37 Indre-et-Loire</MenuItem>
                            <MenuItem value={'38 Isère'}>38 Isère</MenuItem>
                            <MenuItem value={'39 Jura'}>39 Jura</MenuItem>
                            <MenuItem value={'40 Landes'}>40 Landes</MenuItem>
                            <MenuItem value={'41 Loir-et-Cher'}>41 Loir-et-Cher</MenuItem>
                            <MenuItem value={'42 Loire'}>42 Loire</MenuItem>
                            <MenuItem value={'43 Haute-Loire'}>43 Haute-Loire</MenuItem>
                            <MenuItem value={'44 Loire-Atlantique'}>44 Loire-Atlantique</MenuItem>
                            <MenuItem value={'45 Loiret'}>45 Loiret</MenuItem>
                            <MenuItem value={'46 Lot'}>46 Lot</MenuItem>
                            <MenuItem value={'47 Lot-et-Garonne'}>47 Lot-et-Garonne</MenuItem>
                            <MenuItem value={'48 Lozère'}>48 Lozère</MenuItem>
                            <MenuItem value={'49 Maine-et-Loire'}>49 Maine-et-Loire</MenuItem>
                            <MenuItem value={'50 Manche'}>50 Manche</MenuItem>
                            <MenuItem value={'51 Marne'}>51 Marne</MenuItem>
                            <MenuItem value={'52 Haute-Marne'}>52 Haute-Marne</MenuItem>
                            <MenuItem value={'53 Mayenne'}>53 Mayenne</MenuItem>
                            <MenuItem value={'54 Meurthe-et-Moselle'}>54 Meurthe-et-Moselle</MenuItem>
                            <MenuItem value={'55 Meuse'}>55 Meuse</MenuItem>
                            <MenuItem value={'56 Morbihan'}>56 Morbihan</MenuItem>
                            <MenuItem value={'57 Moselle'}>57 Moselle</MenuItem>
                            <MenuItem value={'58 Nièvre'}>58 Nièvre</MenuItem>
                            <MenuItem value={'59 Nord'}>59 Nord</MenuItem>
                            <MenuItem value={'60 Oise'}>60 Oise</MenuItem>
                            <MenuItem value={'61 Orne'}>61 Orne</MenuItem>
                            <MenuItem value={'62 Pas-de-Calais'}>62 Pas-de-Calais</MenuItem>
                            <MenuItem value={'63 Puy-de-Dôme'}>63 Puy-de-Dôme</MenuItem>
                            <MenuItem value={'64 Pyrénées-Atlantiques'}>64 Pyrénées-Atlantiques</MenuItem>
                            <MenuItem value={'65 Hautes-Pyrénées'}>65 Hautes-Pyrénées</MenuItem>
                            <MenuItem value={'66 Pyrénées-Orientales'}>66 Pyrénées-Orientales</MenuItem>
                            <MenuItem value={'67 Bas-Rhin'}>67 Bas-Rhin</MenuItem>
                            <MenuItem value={'68 Haut-Rhin'}>68 Haut-Rhin</MenuItem>
                            <MenuItem value={'69 Rhône'}>69 Rhône</MenuItem>
                            <MenuItem value={'70 Haute-Saône'}>70 Haute-Saône</MenuItem>
                            <MenuItem value={'71 Saône-et-Loire'}>71 Saône-et-Loire</MenuItem>
                            <MenuItem value={'72 Sarthe'}>72 Sarthe</MenuItem>
                            <MenuItem value={'73 Savoie'}>73 Savoie</MenuItem>
                            <MenuItem value={'74 Haute-Savoie'}>74 Haute-Savoie</MenuItem>
                            <MenuItem value={'75 Paris'}>75 Paris</MenuItem>
                            <MenuItem value={'76 Seine-Maritime'}>76 Seine-Maritime</MenuItem>
                            <MenuItem value={'77 Seine-et-Marne'}>77 Seine-et-Marne</MenuItem>
                            <MenuItem value={'78 Yvelines'}>78 Yvelines</MenuItem>
                            <MenuItem value={'79 Deux-Sèvres'}>79 Deux-Sèvres</MenuItem>
                            <MenuItem value={'80 Somme'}>80 Somme</MenuItem>
                            <MenuItem value={'81 Tarn'}>81 Tarn</MenuItem>
                            <MenuItem value={'82 Tarn-et-Garonne'}>82 Tarn-et-Garonne</MenuItem>
                            <MenuItem value={'83 Var'}>83 Var</MenuItem>
                            <MenuItem value={'84 Vaucluse'}>84 Vaucluse</MenuItem>
                            <MenuItem value={'85 Vendée'}>85 Vendée</MenuItem>
                            <MenuItem value={'86 Vienne'}>86 Vienne</MenuItem>
                            <MenuItem value={'87 Haute-Vienne'}>87 Haute-Vienne</MenuItem>
                            <MenuItem value={'88 Vosges'}>88 Vosges</MenuItem>
                            <MenuItem value={'89 Yonne'}>89 Yonne</MenuItem>
                            <MenuItem value={'90 Territoire de Belfort'}>90 Territoire de Belfort</MenuItem>
                            <MenuItem value={'91 Essonne'}>91 Essonne</MenuItem>
                            <MenuItem value={'92 Hauts-de-Seine'}>92 Hauts-de-Seine</MenuItem>
                            <MenuItem value={'93 Seine-Saint-Denis'}>93 Seine-Saint-Denis</MenuItem>
                            <MenuItem value={'94 Val-de-Marne'}>94 Val-de-Marne</MenuItem>
                            <MenuItem value={"95 Val-d'Oise"}>95 Val-d'Oise</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.FormWidth}>
                        <InputLabel htmlFor="Marque">Marque</InputLabel>
                        <Select
                        required
                        value={marque_simplifié}
                        onChange={this.handleChange('marque_simplifié')}
                        >
                            <MenuItem value={'SELECT'}>
                                <em>SELECT</em>
                            </MenuItem>
                            <MenuItem value={'BMW'}>BMW</MenuItem>
                            <MenuItem value={'FORD'}>FORD</MenuItem>
                            <MenuItem value={'RENAULT'}>RENAULT</MenuItem>
                            <MenuItem value={'CITROEN'}>CITROEN</MenuItem>
                            <MenuItem value={'AUDI'}>AUDI</MenuItem>
                            <MenuItem value={'VOLVO'}>VOLVO</MenuItem>
                            <MenuItem value={'MINI'}>MINI</MenuItem>
                            <MenuItem value={'PEUGEOT'}>PEUGEOT</MenuItem>
                            <MenuItem value={'NISSAN'}>NISSAN</MenuItem>
                            <MenuItem value={'VOLKSWAGEN'}>VOLKSWAGEN</MenuItem>
                            <MenuItem value={'MERCEDES BENZ'}>MERCEDES BENZ</MenuItem>
                            <MenuItem value={'TOYOTA'}>TOYOTA</MenuItem>
                            <MenuItem value={'SKODA'}>SKODA</MenuItem>
                            <MenuItem value={'DACIA'}>DACIA</MenuItem>
                            <MenuItem value={'OPEL'}>OPEL</MenuItem>
                            <MenuItem value={'SEAT'}>SEAT</MenuItem>
                            <MenuItem value={'LEXUS'}>LEXUS</MenuItem>
                            <MenuItem value={'HYUNDAI'}>HYUNDAI</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.FormWidth}>
                        <InputLabel htmlFor="Model">Model</InputLabel>
                            <Select
                            required
                            value={dummyModel}
                            onChange={this.handleChange('dummyModel')}
                            > 
                            
                            {
                                this.state.currentDropdown.map(item =>{
                                    return <MenuItem key={item} value={item}>{item}</MenuItem>
                                })
                            }
                            </Select>
                    </FormControl>
                    {/* <TextField
                        required
                        type="number"
                        label="Model"
                        margin="normal"
                        value={dummyModel}
                        onChange={this.handleChange('dummyModel')}
                        variant="outlined"
                        className={classes.FormWidth}
                    /> */}
                    <TextField
                        required
                        type="number"
                        label="L'age de vehicule"
                        value={Nb_jours}
                        onChange={this.handleChange('Nb_jours')}
                        margin="normal"
                        variant="outlined"
                        className={classes.FormWidth}
                        InputProps={{ inputProps: { min: 40, max: 5000 } }}
                        // error={this.state.inputJSON.Nb_jours === ""}
                        // helperText={Nb_jours ? 'Empty field!' : ' '}
                    />
                    <TextField
                        required
                        type="number"
                        label="kilometrage"
                        value={kilometrage}
                        onChange={this.handleChange('kilometrage')}
                        margin="normal"
                        variant="outlined"
                        className={classes.FormWidth}
                        InputProps={{ inputProps: { min: 1000, max: 150000 } }}
                    />
                    <div>
                        <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        className={classes.buttonMargin}
                        disabled={this.state.disableSendButton}
                        >
                            Send
                            <Send className={classes.rightIcon}/>
                        </Button>
                        <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={this.handleClear}
                        className={classes.buttonMargin}
                        >
                            Reset
                            <SettingsBackupRestore className={classes.rightIcon}/>
                        </Button>
                    </div>
                </form>

                {
                    this.state.showTable ? (
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ color: 'green', fontWeight: 'bold'}}>PRIX-PREDICTED</TableCell>
                                    <TableCell align="center" style={{fontWeight: 'bold'}}>EDIT</TableCell>
                                    <TableCell align="center" style={{fontWeight: 'bold'}}>ENTER PRIX</TableCell>
                                    <TableCell align="center" style={{fontWeight: 'bold'}}>PROBABILITY</TableCell>
                                    <TableCell align="center" style={{fontWeight: 'bold'}}>COURBE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                
                                finalJSON.map((car, i)=>{

                                return( 
                                <TableRow key={car.ID}>
                                    <TableCell align="center" style={{color: 'darkgreen', fontWeight: 'bold'}}>{Math.round(car.Prix_Predicted)} €</TableCell>
                                    <TableCell align="center">
                                    <Fab 
                                        style={{backgroundColor: '#4a772f'}}
                                        disabled={this.state.gbDisable}
                                         
                                        onClick={this.onClickHandler}
                                    >
                                        <Done />
                                        {
                                            this.state.loading ? <Bgloader size={68}/> : null
                                        }
                                    </Fab>
                                    <Fab 
                                        style={{backgroundColor: '#e7455f'}}
                                        
                                        onClick={this.onClickHandler}
                                        disabled={this.state.rbDisable}
                                    >
                                        <Clear />
                                    </Fab>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <TextField
                                            id="standard-name"
                                            label="Prix*"
                                            margin="normal"
                                        />
                                    </TableCell>
                                    <TableCell align="center" style={{color: 'darkgreen', fontWeight: 'bold'}}>{Math.floor((car.Proba_vente*100))/100}</TableCell>
                                    <TableCell align="center" >
                                        
                                        <Chart prix={this.state.prixList} proba={this.state.probaList}/> 

                                    </TableCell>

                                </TableRow>)})
                            }
                            </TableBody>
                        </Table>
                    </Paper>
                    ) : null
                }
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Forminput);