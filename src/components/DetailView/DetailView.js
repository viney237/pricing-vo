import React from 'react';
import {Grid} from '@material-ui/core';

import './DetailView.css';

import ImageSec from './ImageSec/ImageSec';

import './DetailView.css';

const DetailView = (props) => {

    return(
       <div className="HomeSection">
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid item sm={12}>
                    <ImageSec 
                    image={"https://dynamic-pricing-intern.s3.eu-west-3.amazonaws.com/images/" + props.car.Location_Image.substring(25)}
                    price={Math.round(props.car.prediction)}
                    name={props.car.marque.toUpperCase()}
                    model={props.car.mod\u00e8le.toUpperCase()}
                    version={props.car.version}
                    kilometers={props.car.kilometrage}
                    carburant={props.car.carburant}
                    annee={props.car.annee}
                    boite_de_vitesse={props.car.boite_de_vitesse}
                    />
                </Grid>
            </Grid>
            <h3>Vehicle Details</h3>
            <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="DescriptionSec"
            >
                <Grid item sm={3} xs={6} className="grid">
                    <div className="spacing_div">
                        <div>Marque</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.marque.toUpperCase()}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Couleur</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.couleur}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Modele</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.mod\u00e8le.toUpperCase()}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Kilométrage</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.kilometrage}</div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={6} className="grid">
                    <div className="spacing_div">
                        <div>Boîte de vitesse</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.boite_de_vitesse}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Année</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.annee}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Prix TTC</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.prix_TTC}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Puissance Fiscale</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.Puissance_fiscale}</div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={6} className="grid">
                    <div className="spacing_div">
                        <div>Type de véhicule</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.type_de_vehicule}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Certificat CRIT'AIR</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.certificat_critic_air}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Co2</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.Co2}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Puissance Réelle</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.puissance_reelle}</div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={6} className="grid">
                    <div className="spacing_div">
                        <div>Type</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.type}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Carburant</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.carburant}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Portes</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.portes}</div>
                    </div>

                    <div className="spacing_div">
                        <div>Places</div>
                        <div style={{fontWeight: 'bold'}}>{props.car.places}</div>
                    </div>
                </Grid>
            </Grid>
       </div>
        
    );
}

export default DetailView;

