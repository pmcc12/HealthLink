import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider(props) {
  const {radiusChanger} = props;  
  const [value, setValue] = React.useState(1);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    radiusChanger(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 50) {
      setValue(50);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Mobilization Availability:
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SocialDistanceIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max = {50}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 50,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
