import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid } from "@material-ui/core";
import moment from "moment";

export default function MultiSelectDateDropdown({ onSelect, fieldName, field }) {
  const [renderValue, setRenderValue] = React.useState("");
  const [subDropdownValue, setSubDropDownValue] = React.useState("Equals To");
  const [fromValue, setFromValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [toValue, setToValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [open, setOpen] = React.useState(false);

  const handleSubDropdownChange = (event) => setSubDropDownValue(event.target.value);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleKeyDown = (e) => {
    if (e.which === 13) {
      // Enter key pressed
      let value = `${fieldName}: ${subDropdownValue} ${fromValue}`;
      let value_return = {
        field: field,
        type: subDropdownValue,
        fromValue: moment(new Date(fromValue)).format('YYYY-MM-DD'),
        toValue: moment(new Date(toValue)).format('YYYY-MM-DD')
      }
      if (subDropdownValue === 'Range') {
        value = value + ' - ' + toValue;
      }
      setRenderValue(value);
      onSelect(value_return);
      handleClose();
    }
    e.stopPropagation(); // Prevent option search when typing into the InputBase
  };

  return (
    <div className="input-common">
      <FormControl>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value='default'
          renderValue={() => {
            if (!renderValue) {
              return <em>{fieldName}</em>;
            }
            return renderValue;
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="default">
            <em>{fieldName}</em>
          </MenuItem>
          <MenuItem value="" onClick={handleOpen}>
            <div className="sub-dropdown">
              <FormControl>
                <Select
                  value={subDropdownValue}
                  onChange={handleSubDropdownChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="Equals To">
                    Equals to
                  </MenuItem>
                  <MenuItem value="Less Than">
                    Less Than
                  </MenuItem>
                  <MenuItem value="Greater Than">
                    Greater Than
                  </MenuItem>
                  <MenuItem value="Range">
                    Range
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </MenuItem>
          <MenuItem value="" onClick={handleOpen}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-fromon"
                  label="From/On Date"
                  value={fromValue}
                  onChange={(date) => setFromValue(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  onKeyDown={handleKeyDown}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </MenuItem>
          {subDropdownValue === 'Range' ?
            <MenuItem value="" onClick={handleOpen}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    fullWidth
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-to"
                    label="To Date"
                    value={toValue}
                    onChange={(date) => setToValue(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </MenuItem> : null}
        </Select>
      </FormControl>
    </div>
  );
}
