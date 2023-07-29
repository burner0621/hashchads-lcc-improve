// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { TreeView, TreeItem, treeItemClasses } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

const TreeViewStyle = styled(TreeView)({
  height: 240,
  flexGrow: 1,
  maxWidth: 400,
});

const StyledTreeItem = styled((props) => <TreeItem {...props} />)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

// ----------------------------------------------------------------------

MUITreesView.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUITreesView() {
  return (
    <Page title="Components: Tree View">
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
              heading="Tree View"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Tree View' }]}
              moreLink="https://mui.com/components/tree-view"
            />
          </Container>
        </Box>

        <Container>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            <Block title="Basic">
              <TreeViewStyle
                defaultCollapseIcon={<Iconify icon="eva:chevron-down-fill" width={20} height={20} />}
                defaultExpandIcon={<Iconify icon="eva:chevron-right-fill" width={20} height={20} />}
                defaultEndIcon={null}
              >
                <TreeItem nodeId="1" label="Applications">
                  <TreeItem nodeId="2" label="Calendar" />
                  <TreeItem nodeId="3" label="Chrome" />
                  <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                  <TreeItem nodeId="10" label="OSS" />
                  <TreeItem nodeId="6" label="Material-UI">
                    <TreeItem nodeId="7" label="src">
                      <TreeItem nodeId="8" label="index.js" />
                      <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeViewStyle>
            </Block>

            <Block title="Multi Select">
              <TreeViewStyle
                multiSelect
                defaultCollapseIcon={<Iconify icon="eva:chevron-down-fill" width={20} height={20} />}
                defaultExpandIcon={<Iconify icon="eva:chevron-right-fill" width={20} height={20} />}
                defaultEndIcon={null}
              >
                <TreeItem nodeId="1" label="Applications">
                  <TreeItem nodeId="2" label="Calendar" />
                  <TreeItem nodeId="3" label="Chrome" />
                  <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                  <TreeItem nodeId="6" label="Material-UI">
                    <TreeItem nodeId="7" label="src">
                      <TreeItem nodeId="8" label="index.js" />
                      <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeViewStyle>
            </Block>

            <Block title="Customization">
              <TreeViewStyle defaultExpanded={['1']}>
                <StyledTreeItem nodeId="1" label="Main">
                  <StyledTreeItem nodeId="2" label="Hello" />
                  <StyledTreeItem nodeId="3" label="Subtree with children">
                    <StyledTreeItem nodeId="6" label="Hello" />
                    <StyledTreeItem nodeId="7" label="Sub-subtree with children">
                      <StyledTreeItem nodeId="9" label="Child 1" />
                      <StyledTreeItem nodeId="10" label="Child 2" />
                      <StyledTreeItem nodeId="11" label="Child 3" />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="8" label="Hello" />
                  </StyledTreeItem>
                  <StyledTreeItem nodeId="4" label="World" />
                  <StyledTreeItem nodeId="5" label="Something something" />
                </StyledTreeItem>
              </TreeViewStyle>
            </Block>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
