import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class OutputList extends Component {
    render(){
        const data = this.props.json
        console.log(data)
        return (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>marque_simplifié</TableCell>
                    <TableCell align="right">Nb_jours</TableCell>
                    <TableCell align="right">kilometrage</TableCell>
                    <TableCell align="right">prix_TTC</TableCell>
                    <TableCell align="right">Co2</TableCell>
                    <TableCell align="right">codeRegion</TableCell>
                    <TableCell align="right">Prix_Predicted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.data.length !== 0 ? (
                            data.map(row => (
                                <TableRow key={row.id}>
                                  <TableCell component="th" scope="row">
                                    {row.marque_simplifié}
                                  </TableCell>
                                  <TableCell align="right">{row.Nb_jours}</TableCell>
                                  <TableCell align="right">{row.kilometrage}</TableCell>
                                  <TableCell align="right">{row.prix_TTC}</TableCell>
                                  <TableCell align="right">{row.Co2}</TableCell>
                                  <TableCell align="right">{row.codeRegion}</TableCell>
                                  <TableCell align="right">{row.Prix_Predicted}</TableCell>
                                </TableRow>
                              ))
                        ) : (
                            null
                        )
                    } 
                  
                </TableBody>
              </Table>
            </Paper>
          );
    }
}

export default OutputList;
