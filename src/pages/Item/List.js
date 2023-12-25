import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// @mui

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';


import { getItems, deleteItem} from '../../api/item';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'photo', label: 'Photo', alignRight: false },
  { id: 'reference', label: 'Reference', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  
  // { id: 'edit', label: '', alignRight: true },
  // { id: 'delete', label: '', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, { name, reference, price }) {
  let stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  stabilizedThis = stabilizedThis.map((el) => el[0]);

  if (query) {
    return filter(array, (order) =>
      Object.values(order).some((value) => String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1)
    );
  }

  // Filter
  // ------
  // ------
  // ------

  if (name) {
    stabilizedThis = stabilizedThis.filter((it) => name === it.name._id);
  }

  if (reference) {
    stabilizedThis = stabilizedThis.filter((it) => it.reference && reference === it.reference._id);
  }

  if (price) {
    console.log(price);
    stabilizedThis = stabilizedThis.filter((it) => it.price && price === it.price._id);
  }
  console.log(stabilizedThis);
  // Return ----
  return stabilizedThis;
}

export default function EnvoiPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [items, setItems] = useState([]);


  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ name: '', reference: '', price: ''});


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((e) => e._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        const it = items.filter((it) => it._id !== itemId);
        setItems(it);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSelected = async () => {
    try {
      await deleteItem(selected);
      const res = await getItems();
      setItems(res.data);
      setSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const filteredItems = applySortFilter(items, getComparator(order, orderBy), filterName, filters);

  const isNotFound = !filteredItems.length && !!filterName;

  const [openModalFilter, setOpenModalFilter] = useState(false);

  const handleCloseModalModalFilter = () => {
    setOpenModalFilter(false);
  };

  const handleOpenModalFilter = async () => {
    setOpenModalFilter(true);
    try {
      if (!items.length > 0) {
        console.log('HERE');
        const it = await getItems();
        setItems(it.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFilterForm = (event) => {
    const { name, value } = event.target;
    const newFilter = { ...filters };
    newFilter[name] = value;
    setFilters({ ...newFilter });
  };

  const handleRestaureFilter = () => {
    setFilters({ name: '', reference: '', price: '' });
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Items List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Items
          </Typography>
          <Link to="/dashboard/item/create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Item
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar
            deleteSelected={deleteSelected}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleOpenModalFilter={handleOpenModalFilter}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, maxHeight: 440 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={items.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : isNotFound ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No matching records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                      const {
                        _id,
                        name,
                        photo,
                        reference,
                        description,
                        price, 
                      } = item;
                      const isItemSelected = selected.indexOf(_id) !== -1;
                      console.log(isItemSelected);

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                          </TableCell>

                          <TableCell align="left">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Avatar />
                              &nbsp;&nbsp;&nbsp;
                              {name}
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{photo}</TableCell>

                          <TableCell align="left">{reference}</TableCell>

                          <TableCell align="left">{price}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Item?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              // to="/impression"
                              to="/dashboard/Item/Update"
                              state={{
                                id: _id,
                                Name: name,
                                Photo: photo,
                                Reference: reference,
                                Description: description,
                                Price: price,
                              }}
                            >
                              <IconButton sx={{ color: '#4CAF50', '&:hover': { bgcolor: '#4CAF50', color: '#fff' } }}>
                                <Iconify icon="feather:edit-2" width={20} height={20} stroke="green" />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Dialog open={openModalFilter} onClose={handleCloseModalModalFilter}>
        <DialogTitle>Items Filtering</DialogTitle>
        <DialogContent>
          <DialogContentText>Please apply the changes, then press validate.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestaureFilter}>Restore</Button>
          <Button onClick={handleCloseModalModalFilter}>Close</Button>
        </DialogActions>
      </Dialog>

      
    </>
  );
}
