import React from 'react'
import { SpeedDial, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SpeedDialAction from '@mui/material/SpeedDialAction';// importer SpeedDialAction

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="SpeedDial playground example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<TuneIcon />}
            direction="left"
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                />
            ))}
        </CustomSpeedDial>
    )
}

export default SpeedDialTemplate

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #032803;
    
    &:hover {
      background-color: green;
    }
  }
`;