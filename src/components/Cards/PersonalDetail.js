import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Tooltip,
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import patientMale from 'Assets/images/patient-male.svg';
import patientFemale from 'Assets/images/patient-female.svg';
import { PropTypes } from 'prop-types';
import { GENDER_CHOICES } from 'Constants/app.const';

const useStyles = makeStyles(theme =>
  createStyles({
    input: {
      display: 'none',
    },
    image: {
      background: '#ececec',
      width: '150px',
      height: '150px',
      overflow: 'hidden',
    },
    img: {
      width: '100%'
    },
    imgNull: {
      opacity: .5,
      width: '70%'
    },
    action: {
      position: 'absolute',
      right: '.2em',
      top: '.2em',
    },
  })
);

export default function PersonalDetail(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile, handleEdit, medicationDetails } = props;
  
  return (
    <Card elevation={4}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={`auto`} className="p-0">
            <div className={`${classes.image} flex-center`}>
              <img className={`${classes.img} + ${profile.imageSrc ? '' : classes.imgNull}`} src={profile.imageSrc ? profile.imageSrc : GENDER_CHOICES[profile.gender] === 'Male' ? patientMale: patientFemale} alt={profile.name} />
            </div>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="primary">
              {profile.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {i18n.t(GENDER_CHOICES[profile.gender])}, {profile.age_years ? profile.age_years + ' ' + i18n.t('years'): '' } {profile.ageMonths? profile.ageMonths + ' ' + i18n.t('months'): '' }
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {i18n.t('Govt. ID')}: {profile.govt_id}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {i18n.t('ICMR ID')}: {profile.icmr_id}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {i18n.t('Cluster group')}: {medicationDetails.cluster_group}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      { !props.hideEdit &&
          <Tooltip title={i18n.t('Edit')}>
          <IconButton className={classes.action} onClick={handleEdit}>
            <EditOutlined fontSize="large"/>
          </IconButton>
        </Tooltip>
      }
    </Card>
  );
}

PersonalDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

PersonalDetail.defaultProps = {
  profile: {}
}
