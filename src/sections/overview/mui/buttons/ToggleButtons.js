import { useState } from 'react';
// @mui
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
// components
import Iconify from '../../../../components/Iconify';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
  '& svg': { width: 24, height: 24 },
};

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(() => ['bold', 'italic']);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(false);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <Masonry columns={3} spacing={3}>
      <Block title="Exclusive selection" sx={style}>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
          <ToggleButton value="left">
            <Iconify icon="ic:round-format-align-left" />
          </ToggleButton>
          <ToggleButton value="center">
            <Iconify icon="ic:round-format-align-center" />
          </ToggleButton>
          <ToggleButton value="right">
            <Iconify icon="ic:round-format-align-right" />
          </ToggleButton>
          <ToggleButton value="justify" disabled>
            <Iconify icon="ic:round-format-align-justify" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Block>

      <Block title="Multiple selection" sx={style}>
        <ToggleButtonGroup value={formats} onChange={handleFormat}>
          <ToggleButton value="bold">
            <Iconify icon="ic:round-format-bold" />
          </ToggleButton>
          <ToggleButton value="italic">
            <Iconify icon="ic:round-format-italic" />
          </ToggleButton>
          <ToggleButton value="underlined">
            <Iconify icon="ic:round-format-underlined" />
          </ToggleButton>
          <ToggleButton value="color" disabled>
            <Iconify icon="ic:baseline-format-color-fill" />
            <Iconify icon="ic:baseline-arrow-drop-down" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Block>

      <Block title="Size" sx={style}>
        <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleAlignment}>
          <ToggleButton value="left">
            <Iconify icon="ic:round-format-align-left" />
          </ToggleButton>
          <ToggleButton value="center">
            <Iconify icon="ic:round-format-align-center" />
          </ToggleButton>
          <ToggleButton value="right">
            <Iconify icon="ic:round-format-align-right" />
          </ToggleButton>
          <ToggleButton value="justify" disabled>
            <Iconify icon="ic:round-format-align-justify" />
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup size="medium" value={alignment} exclusive onChange={handleAlignment}>
          <ToggleButton value="left">
            <Iconify icon="ic:round-format-align-left" />
          </ToggleButton>
          <ToggleButton value="center">
            <Iconify icon="ic:round-format-align-center" />
          </ToggleButton>
          <ToggleButton value="right">
            <Iconify icon="ic:round-format-align-right" />
          </ToggleButton>
          <ToggleButton value="justify" disabled>
            <Iconify icon="ic:round-format-align-justify" />
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup size="large" value={alignment} exclusive onChange={handleAlignment}>
          <ToggleButton value="left">
            <Iconify icon="ic:round-format-align-left" />
          </ToggleButton>
          <ToggleButton value="center">
            <Iconify icon="ic:round-format-align-center" />
          </ToggleButton>
          <ToggleButton value="right">
            <Iconify icon="ic:round-format-align-right" />
          </ToggleButton>
          <ToggleButton value="justify" disabled>
            <Iconify icon="ic:round-format-align-justify" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Block>

      <Block title="Vertical & Standalone buttons" sx={style}>
        <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
          <ToggleButton value="list">
            <Iconify icon="ic:round-view-list" />
          </ToggleButton>
          <ToggleButton value="module">
            <Iconify icon="ic:round-view-module" />
          </ToggleButton>
          <ToggleButton value="quilt">
            <Iconify icon="ic:round-view-quilt" />
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>
      </Block>

      <Block title="Colors" sx={style}>
        <ToggleButtonGroup color="primary" orientation="vertical" value={view} exclusive onChange={handleChange}>
          <ToggleButton value="list">
            <Iconify icon="ic:round-view-list" />
          </ToggleButton>
          <ToggleButton value="module">
            <Iconify icon="ic:round-view-module" />
          </ToggleButton>
          <ToggleButton value="quilt">
            <Iconify icon="ic:round-view-quilt" />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup orientation="vertical" color="info" value={view} exclusive onChange={handleChange}>
          <ToggleButton value="list">
            <Iconify icon="ic:round-view-list" />
          </ToggleButton>
          <ToggleButton value="module">
            <Iconify icon="ic:round-view-module" />
          </ToggleButton>
          <ToggleButton value="quilt">
            <Iconify icon="ic:round-view-quilt" />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButton
          color="primary"
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>
        <ToggleButton
          color="info"
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>
      </Block>
    </Masonry>
  );
}
