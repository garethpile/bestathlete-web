import React, { useState } from 'react';
import { Box, Typography, Slider, Tooltip } from '@mui/material';
import { format, addWeeks } from 'date-fns';

const RacePhasePlanner = () => {
  const totalWeeks = 48;
  const startDate = new Date(2025, 4, 19); // May 19, 2025
  const endDate = addWeeks(startDate, totalWeeks);

  const [phases, setPhases] = useState({
    Prep: 4,
    Base: 18,
    Build: 14,
    Peak: 6,
    Taper: 6,
  });

  const getSliderMarks = () => {
    let marks = [];
    let cumulativeWeeks = 0;
    const phaseData = getPhaseDates();

    phaseData.forEach(({ name, start, end, weeks }) => {
      marks.push({
        value: cumulativeWeeks,
        label: (
          <Tooltip
            title={`${name} Phase (${weeks} weeks): ${start} → ${end}`}
            arrow
          >
            <span>{name}</span>
          </Tooltip>
        ),
      });
      cumulativeWeeks += weeks;
    });

    return marks;
  };

  const handleSliderChange = (_, values) => {
    const [prepEnd, baseEnd, buildEnd, peakEnd] = values;
    const newPhases = {
      Prep: prepEnd,
      Base: baseEnd - prepEnd,
      Build: buildEnd - baseEnd,
      Peak: peakEnd - buildEnd,
      Taper: totalWeeks - peakEnd,
    };
    setPhases(newPhases);
  };

  const phaseEnds = [
    phases.Prep,
    phases.Prep + phases.Base,
    phases.Prep + phases.Base + phases.Build,
    phases.Prep + phases.Base + phases.Build + phases.Peak,
  ];

  const getPhaseDates = () => {
    const phaseKeys = Object.keys(phases);
    let phaseStart = startDate;

    return phaseKeys.map((key) => {
      const duration = phases[key];

      const phaseStartMonday = new Date(phaseStart);
      phaseStartMonday.setDate(
        phaseStartMonday.getDate() - ((phaseStartMonday.getDay() + 6) % 7)
      );

      let phaseEnd = addWeeks(phaseStartMonday, duration);
      phaseEnd.setDate(phaseEnd.getDate() - 1);
      if (key === 'Taper') phaseEnd = endDate;

      const formattedStart = format(phaseStartMonday, 'dd/MM/yyyy');
      const formattedEnd = format(phaseEnd, 'dd/MM/yyyy');

      phaseStart = addWeeks(phaseStart, duration);

      return {
        name: key,
        weeks: duration,
        start: formattedStart,
        end: formattedEnd,
      };
    });
  };

  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        Training Phases (Total Weeks: {totalWeeks})
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body2">
          Start: {format(startDate, 'dd MMM yyyy')}
        </Typography>
        <Typography variant="body2">
          Race Day: {format(endDate, 'dd MMM yyyy')}
        </Typography>
      </Box>

      <Slider
        value={phaseEnds}
        min={0}
        max={totalWeeks}
        step={1}
        onChange={handleSliderChange}
        marks={getSliderMarks()}
        valueLabelDisplay="auto"
        disableSwap
      />

      <Box mt={4}>
        {getPhaseDates().map(({ name, weeks, start, end }) => (
          <Typography key={name}>
            <strong>{name}:</strong> {weeks} weeks ({start} → {end})
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default RacePhasePlanner;