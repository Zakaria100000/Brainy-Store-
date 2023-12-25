import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock

import { getOrders, deleteOrder } from '../../api/order';
import { Request } from '../../api/config';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'num', label: 'Num', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'items', label: 'Items', alignRight: false },
  { id: 'payment', label: 'Payment', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'totalprice', label: 'Totalprice', alignRight: false },
  { id: 'edit', label: '', alignRight: true },
  { id: 'delete', label: '', alignRight: true },
];

const ORDER_STATUS = {
  NonPaid: 'error',
  Validate: 'secondary',
  Paid: 'success',
};


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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (order) =>
      Object.values(order).some((value) => String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderPage() {
  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('wilaya');

  const [filterName, setFilterName] = useState('');

  const [order, setOrder] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  const [openModalUpdateStatus, setOpenModalUpdateStatus] = useState(false);

  const [isFetchingIsPayed, setIsFetchingIsPayed] = useState(false);

  const [selectedToUpdateStatus, setSelectedToUpdateStatus] = useState(0);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = order.map((r) => r._id);
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

  const updateIsPayed = async (id, isPayed) => {
    if (isFetchingIsPayed) return;
    try {
      setIsFetchingIsPayed(true);
      await Request.put(`/order/ispayed/${id}`, { isPayed });
      const res = await getOrders();
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingIsPayed(false);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - order.length) : 0;

  const filteredorders = applySortFilter(order, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredorders.length && !!filterName;

  // modal
  // Modal
  const handleCloseModalUpdateStatus = () => {
    setOpenModalUpdateStatus(false);
  };

  const handleOpenModalUpdateStatus = (id) => {
    const index = order.findIndex((r) => r._id === id);
    setSelectedToUpdateStatus(index);
    setOpenModalUpdateStatus(true);
  };

  const handleListItemClick = async (status) => {
    try {
      const id = order[selectedToUpdateStatus]?._id;
      await Request.put(`/order/status/${id}`, { status });
      const res = await getOrders();
      setOrder(res.data);
      handleCloseModalUpdateStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItems = (items) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <strong>{item.designation}</strong> (Ref: {item.reference}), {item.nbrOfItems} x {item.unitPrice} = {item.totalPrice}
        </div>
      ))}
    </div>
  );
};

  return (
    <>
      <Helmet>
        <title> Orders List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            orders
          </Typography>
          <Link to="/dashboard/order/Create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Order
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, maxHeight: 440 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={order.length}
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
                    filteredorders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((order, index) => {
                        const { _id, num, client, items, payment, status, totalprice } = order;
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        console.log(index, order);

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

                            <TableCell align="left">{num}</TableCell>

                            <TableCell align="left">
                            {renderItems(order.items)}
          </TableCell>


                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Avatar />
                                &nbsp;&nbsp;&nbsp;
                                {client ? `${client.firstname} ${client.lastname}` : ''}
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{payment}</TableCell>

                            <TableCell align="left">{status}</TableCell>

                            <TableCell align="left">{totalprice}</TableCell>

                            {/* <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this order?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              to="/dashboard/order/Update"
                              state={{
                                id: _id,
                                Client: client,
                                Adresse: adresse,
                                Date: date,
                                Wilaya: wilaya,
                                Commune: commune,
                                Comment: comment,
                              }}
                            >
                              <IconButton sx={{ color: '#4CAF50', '&:hover': { bgcolor: '#4CAF50', color: '#fff' } }}>
                                <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                              </IconButton>
                            </Link>
                          </TableCell> */}
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
            count={order.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
