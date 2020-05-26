import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  MenuItem,
  CardHeader,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import useStyles from './styles';

// IMORTING MOCKDATA
import { countryChoices } from 'Mockdata/countryChoices.json';
import { stateChoices } from 'Mockdata/stateChoices.json';
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';

export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    values: {
      number,
      numberBelongsTo,
      address,
      municipalWard,
      city,
      district,
      state,
      pincode,
      nativeState,
      nativeCountry,
      nativeCountryExist,
      nativeStateExist,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
    editMode,
  } = props;

  const change = (name, e) => {
    console.log(e);
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };
  // var nativeStateExist = false;
  // var nativeCountryExist = false;
  const setNativePlace = (event) => {
    console.log(event, event.target.name, event.target.checked)
    if (event.target.checked) {
      if (event.target.name === 'nativeStateExist') {
        setFieldValue('nativeCountry', undefined);
        setFieldValue('nativeCountryExist', false);
        setFieldValue(event.target.name, true);
      } else if (event.target.name === 'nativeCountryExist') {
        setFieldValue('nativeState', undefined);
        setFieldValue(event.target.name, true);
        setFieldValue('nativeStateExist', false);
      }
    }
  };
  return (
  <form onSubmit={handleSubmit}>
    <Card className={classes.root} elevation={4}>
      <CardHeader className="pb-0"
        title={i18n.t('Contact Details')}
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="number"
                  type="number"
                  label={i18n.t('Phone number')}
                  fullWidth
                  value={number}
                  onChange={change.bind(null, 'number')}
                  helperText={touched.number ? errors.number : ""}
                  error={touched.number && Boolean(errors.number)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="numberBelongsTo"
                  label={i18n.t('Contact Number belongs to?')}
                  value={numberBelongsTo}
                  onChange={change.bind(null, 'numberBelongsTo')}
                  helperText={touched.numberBelongsTo ? errors.numberBelongsTo : ""}
                  error={touched.numberBelongsTo && Boolean(errors.numberBelongsTo)}
                  fullWidth
                >
                  {
                    relationshipChoices.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>))
                    }
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  name="address"
                  label={i18n.t('Address')}
                  value={address}
                  onChange={change.bind(null, 'address')}
                  helperText={touched.address ? errors.address : ""}
                  error={touched.address && Boolean(errors.address)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="municipalWard"
                  label={i18n.t('Municipal Ward')}
                  value={municipalWard}
                  onChange={change.bind(null, 'municipalWard')}
                  helperText={touched.municipalWard ? errors.municipalWard : ""}
                  error={touched.municipalWard && Boolean(errors.municipalWard)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label={i18n.t('City')}
                  value={city}
                  onChange={change.bind(null, 'city')}
                  helperText={touched.city ? errors.city : ""}
                  error={touched.city && Boolean(errors.city)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="district"
                  label={i18n.t('District')}
                  value={district}
                  onChange={change.bind(null, 'district')}
                  helperText={touched.district ? errors.district : ""}
                  error={touched.district && Boolean(errors.district)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="state"
                  label={i18n.t('State')}
                  value={state}
                  onChange={change.bind(null, 'state')}
                  helperText={touched.state ? errors.state : ""}
                  error={touched.state && Boolean(errors.state)}
                  fullWidth
                >
                  {
                    stateChoices.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                  }
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="pincode"
                  label={i18n.t('Pincode')}
                  value={pincode}
                  onChange={change.bind(null, 'pincode')}
                  helperText={touched.pincode ? errors.pincode : ""}
                  error={touched.pincode && Boolean(errors.pincode)}
                  fullWidth
                />
              </Grid>
              {nativeCountryExist}
              {nativeStateExist}
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                  <Checkbox
                    checked={nativeStateExist}
                    onChange={setNativePlace}
                    name="nativeStateExist"
                    color="primary"
                  />
                  }
                  label={i18n.t('Patient natively belongs to some other Indian state?')}
                />
              </Grid>
              {
                Boolean(nativeStateExist) &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="nativeState"
                    label={i18n.t('Native State')}
                    value={nativeState}
                    onChange={change.bind(null, 'nativeState')}
                    helperText={touched.nativeState ? errors.nativeState : ""}
                    error={touched.nativeState && Boolean(errors.nativeState)}
                    fullWidth
                  >
                    {
                      stateChoices.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>))
                    }
                  </TextField>
                </Grid>
              }
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                  <Checkbox
                    checked={nativeCountryExist}
                    onChange={setNativePlace}
                    name="nativeCountryExist"
                    color="primary"
                  />
                  }
                  label={i18n.t('Patient natively belongs to a foreign country?')}
                />
              </Grid>
              {
                Boolean(nativeCountryExist) &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="nativeCountry"
                    label={i18n.t('Native Country')}
                    value={nativeCountry}
                    onChange={change.bind(null, 'nativeCountry')}
                    helperText={touched.nativeCountry ? errors.nativeCountry : ""}
                    error={touched.nativeCountry && Boolean(errors.nativeCountry)}
                    fullWidth
                  >
                    {
                      countryChoices.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>))
                    }
                  </TextField>
                </Grid>
              }
              {
                editMode && 
                <Grid item xs={12} sm={3} className="ml-auto">
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="medium"
                  >
                    {i18n.t('Submit')}
                  </Button>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <span></span>
    </Card>
  </form>
  );
}

Form.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

Form.defaultProps = {
  profile: {}
}