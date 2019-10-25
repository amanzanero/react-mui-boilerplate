/*
Home page 
*/
import React from 'react';
import math from 'mathjs';
import { withStyles } from '@material-ui/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';

import { UNITS, GENDER, EVENTS, LIFTS, CONSTANTS } from '../../constants/constants'

const styles = (theme) => ({
  control: {
    padding: '1em',
  },
  root: {
    display: 'flex',
    margin: '0 auto',
    paddingTop: '1em'
  },
  formControl: {

  },
  group: {
    margin: 'auto',
  },
});

class HomePage extends React.PureComponent {
  /*
  constants will be dictated by the radio button component
  */
  
  state = { 
    gender: 'men',
    constantSet: CONSTANTS.men.classicThreeLift,
    eventType: 'raw',
    liftType: 'threeLift',
    bodyWeight: 64,
    total: 0,
    units: 'kilos',
    ipfScore: 0
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
    this.setState({ 'constantSet': CONSTANTS[this.state.gender][this.state.eventType][this.state.liftType] })
    console.log(this.state);
  };

  calculateScore = (total, bodyWeight, constants) => {
    var weight = bodyWeight;
    if (this.state.units === 'pounds') {
      weight = this.state.bodyWeight * 0.453592;
    };
    return ( 500 + 100 *( total - ( constants[0] * math.LN(weight) - constants[1] ))
    / ( constants[2] * math.LN(weight) - constants[3] ));
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.control}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={this.state.gender}
              onChange={this.handleChange('gender')}
            >
              {GENDER.map((option) => (
                <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Event</FormLabel>
            <RadioGroup
              aria-label="Event"
              name="event1"
              className={classes.group}
              value={this.state.eventType}
              onChange={this.handleChange('eventType')}
            >
              {EVENTS.map((option) => (
                <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Lift</FormLabel>
            <RadioGroup
              aria-label="Lift"
              name="lift1"
              className={classes.group}
              value={this.state.liftType}
              onChange={this.handleChange('liftType')}
            >
              {LIFTS.map((option) => (
                <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Units</FormLabel>
            <RadioGroup aria-label="Units" name="unit1" value={this.state.units} onChange={this.handleChange('units')} row>
              {UNITS.map((option) => (
                <FormControlLabel value={option.value} control={<Radio />} label={option.label} labelPlacement="top"/>
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>    
      </div>
    )
  }
}

export default withStyles(styles)(HomePage);
