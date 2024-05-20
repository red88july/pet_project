// import React from 'react';
// import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
//
// interface Props {
//   open: boolean;
//   handleClose: () => void;
// }
//
// const OccasionDialog: React.FC<Props> = ({ open, handleClose}) => {
//
//
//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} maxWidth="lg">
//         <DialogTitle>Редактирование профиля</DialogTitle>
//         <DialogContent
//           sx={{mt: '20px'}}
//         >
//           <form autoComplete="off">
//             <Button
//               sx={{'&.MuiButton-root:hover': { background: '#D2122E' },
//                 color: 'white',
//                 background: '#9e1b32',
//                 position: 'absolute',
//                 top: 0,
//                 right: 0}}
//               onClick={handleClose}>X</Button>
//             <Grid container direction="column" spacing={2}>
//               <Grid item xs={12} container gap={'10px'} sx={{ mt: 1 }}>
//                 <TextField
//                   required
//                   id="firstName"
//                   label="Имя"
//                   // value={state.firstName}
//                   // onChange={inputChangeHandler}
//                   name="firstName"
//                 />
//                 <TextField
//                   required
//                   id="lastName"
//                   label="Фамилия"
//                   // value={state.lastName}
//                   // onChange={inputChangeHandler}
//                   name="lastName"
//                 />
//                 <TextField
//                   id="middleName"
//                   label="Отчество"
//                   // value={state.middleName}
//                   // onChange={inputChangeHandler}
//                   name="middleName"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Адрес электронной почты"
//                   // value={state.email}
//                   // onChange={inputChangeHandler}
//                   name="email"
//                 />
//               </Grid>
//
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="settlement"
//                   label="Населенный пункт"
//                   // value={state.settlement}
//                   // onChange={inputChangeHandler}
//                   name="settlement"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="address"
//                   label="Адрес"
//                   // value={state.address}
//                   // onChange={inputChangeHandler}
//                   name="address"
//                 />
//               </Grid>
//               <Grid item xs>
//                 <Button
//                   fullWidth
//                   type="submit"
//                   color="primary"
//                   variant="contained"
//                   // onClick={handleUpdateProfile}
//                 >
//                   Редактировать данные
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };
//
// export default OccasionDialog;
