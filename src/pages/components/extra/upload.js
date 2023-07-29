import { useState, useCallback } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Switch,
  Container,
  CardHeader,
  Typography,
  CardContent,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// utils
import { fData } from '../../../utils/formatNumber';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { UploadAvatar, UploadMultiFile, UploadSingleFile } from '../../../components/upload';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoUpload.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoUpload() {
  const [preview, setPreview] = useState(false);

  const [files, setFiles] = useState([]);

  const [file, setFile] = useState(null);

  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  return (
    <Page title="Components: Upload">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Upload"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Upload' }]}
              moreLink="https://react-dropzone.js.org/#section-basic-example"
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={5}>
            <Card>
              <CardHeader
                title="Upload Multi File"
                action={
                  <FormControlLabel
                    control={<Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />}
                    label="Show Preview"
                  />
                }
              />
              <CardContent>
                <UploadMultiFile
                  showPreview={preview}
                  files={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Upload Single File" />
              <CardContent>
                <UploadSingleFile file={file} onDrop={handleDropSingleFile} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Upload Avatar" />
              <CardContent>
                <UploadAvatar
                  file={avatarUrl}
                  onDrop={handleDropAvatar}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
