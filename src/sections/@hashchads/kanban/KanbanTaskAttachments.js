import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
// utils
import getFileData from '../../../utils/getFileData';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import { varFade } from '../../../components/animate';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

KanbanTaskAttachments.propTypes = {
  attachments: PropTypes.array.isRequired,
};

export default function KanbanTaskAttachments({ attachments }) {
  const [files, setFiles] = useState(attachments);

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);

    if (typeof file === 'string') {
      console.log('REMOVE file typeof === string');
      setFiles(filteredItems);
    }
    setFiles(filteredItems);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  return (
    <>
      {files.map((file, index) => {
        const { key } = getFileData(file, index);

        return <UploadFilePreview key={key} file={file} onRemove={() => handleRemove(file)} />;
      })}

      <UploadFile onDrop={handleDrop} />
    </>
  );
}

// ----------------------------------------------------------------------

UploadFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onRemove: PropTypes.func,
};

function UploadFilePreview({ file, onRemove }) {
  const { preview } = getFileData(file);

  return (
    <Box
      {...varFade().inRight}
      sx={{
        p: 0,
        m: 0.5,
        width: 64,
        height: 64,
        borderRadius: 1.25,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image
        alt="preview"
        src={preview}
        sx={{
          height: 1,
          position: 'absolute',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
        <IconButton
          size="small"
          onClick={onRemove}
          sx={{
            p: '2px',
            color: 'common.white',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon={'eva:close-fill'} />
        </IconButton>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function UploadFile({ ...other }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...other,
  });

  return (
    <DropZoneStyle
      {...getRootProps()}
      sx={{
        ...(isDragActive && { opacity: 0.72 }),
      }}
    >
      <input {...getInputProps()} />

      <Iconify icon="eva:plus-fill" sx={{ color: 'text.disabled' }} />
    </DropZoneStyle>
  );
}
