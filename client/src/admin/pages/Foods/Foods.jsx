import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getAllFoods } from "../../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { postFood } from "../../../Redux/Actions/Actions";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { putFood } from "../../../Redux/Actions/Actions";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#2a9461",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Foods = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const foods = useSelector((state) => state.foods);
  //Solo para arreglar los tres atributos en mayusculas
  const [isSaving, setIsSaving] = useState(false);
  const [tableData, setTableData] = useState(foods);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFoods());
  }, [dispatch]);
  //console.log("a", foods);

  const handleCreateNewRow = (values) => {
    console.log("handle create values", values);
    dispatch(postFood(values));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "New accessesory has been created successfully",
      showConfirmButton: true,
    });
    // tableData.push(values);
    // setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    setIsSaving(true);
    console.log("put foods", values);
    dispatch(putFood(values));
    // setTimeout(() => {
    //   tableData[row.index] = values;
    //   setTableData([...tableData]);
    //   setIsSaving(false);
    // }, 1500);
    // if (!Object.keys(validationErrors).length) {
    //   tableData[row.index] = values;
    //     c
    //   //send/receive api updates here, then refetch or update local table data for re-render
    //   setTableData([...tableData]);
    //   dispatch(putFood(values))
    //   exitEditingMode(true); //required to exit editing mode and close modal
    // }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = (row) => {
    console.log("delete",row.original.active === "valid");
    if (row.original.active === "valid") {
      Swal.fire({
        title: "Are you sure?",
        text: "You will disactive this food!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, desactived it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("delete1", row.original);
          dispatch(putFood({ id: row.id, active: "invalid" }));
          Swal.fire("Disactived!", "Your file has been desactived.", "success");
        }
      });
    } else if (row.original.active === "invalid") {
      Swal.fire({
        title: "Are you sure?",
        text: "You will active this food!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, active it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("delete2", row.original);
          dispatch(putFood({ id: row.id, active: "valid" }));
          Swal.fire("Actived!", "Your file has been actived.", "success");
        }
      });
    }
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = cell.column.id === "id";
          // ? validateEmail(event.target.value)
          // : cell.column.id === "name"
          // ? validateAge(+event.target.value)
          // : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "image",
        header: "Image",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* {console.log("box", row)} */}
            <img
              alt="avatar"
              height={40}
              width={60}
              src={row.original.image}
              loading="lazy"
              style={{ borderRadius: "30%" }}
            />
          </Box>
        ),
        size: 140,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              display: "inherit",
              maxWidth: "15px",
              height: "15px",
              backgroundColor:
                cell.getValue() === "invalid"
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              borderRadius: "50%",
              color: "#fff",
              padding: "1rem",
            })}
          ></Box>
        ),
      },
      {
        accessorKey: "available",
        header: "Available",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "boolean",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === true
                  ? theme.palette.success.light
                  : theme.palette.error.dark,
              borderRadius: "1rem",
              color: "#fff",
              width: "auto",
              padding: ".35rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "button",
            })}
          </Box>
        ),
        size: 80,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.palette.primary.dark,
              borderRadius: "0.25rem",
              fontWeight: "bold",
              maxWidth: "9ch",
              p: "0.55rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            })}
          </Box>
        ),
      },
      {
        accessorKey: "discount",
        header: "Discount(%)",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.palette.error.light,
              borderRadius: "0.25rem",
              fontWeight: "bold",
              maxWidth: "9ch",
              p: "0.55rem",
            })}
          >
            {(cell.getValue() / 100)?.toLocaleString?.("en-US", {
              style: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "Fat",
        header: "Fat",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["High", "Medium", "Low"],
      },
      {
        accessorKey: "Sodium",
        header: "Sodium",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["High", "Medium", "Low"],
      },
      {
        accessorKey: "Sugar",
        header: "Sugar",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["High", "Medium", "Low"],
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "qualification",
        header: "Qualification",
        size: 80,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Rating
              name="read-only"
              value={
                typeof row.original.qualification === "undefined"
                  ? row.original.qualification
                  : 0
              }
              readOnly
            />
          </Box>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          enableStickyHeader
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={foods}
          // state={{
          //   expanded: true,
          //   isLoading: true,
          // }}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Food
            </Button>
          )}
        />
      </ThemeProvider>

      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  //console.log(values);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Food</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {/* {console.log("column", columns)} */}
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                type={column.editVariant}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Food
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
export default Foods;
