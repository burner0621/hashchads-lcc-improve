// @mui
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
// _mock_
import { _dataGrid } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 160,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 160,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    flex: 1,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton>
        <Iconify icon={'eva:more-vertical-fill'} sx={{ width: 20, height: 20 }} />
      </IconButton>
    ),
  },
];

export default function DataGridBasic() {
  return <DataGrid columns={columns} rows={_dataGrid} checkboxSelection disableSelectionOnClick />;
}
