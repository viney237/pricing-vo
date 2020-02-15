import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {Stars} from '@material-ui/icons';

import Data from '../../../resources/data/data100.json';

class StarRatingSec extends  Component {
    
    state = { 
        etoile: 0
    };

    
    render(){ 
        let index = localStorage.getItem("pageopen");
        let etoile = Data.data[index].etoile;

        const rater = (p)=>{
            if(p >= 0 && p<5){
                return 5;
            }else if(p>=5 && p<10){
                return 4;
            }else if(p>=10 && p<15){
                return 3;
            }else if(p>=15 && p<20){
                return 2;
            }else if(p>=20){
                return 1;
            }
        }

        return(
            <div>
                <StarRatingComponent 
                name="rate2" 
                editing={false}
                renderStarIcon={() => <span><Stars/></span>}
                starCount={5}
                value={rater(etoile)}
                starColor={"green"}
                />
            </div>
        );
    }
    
}

export default StarRatingSec;