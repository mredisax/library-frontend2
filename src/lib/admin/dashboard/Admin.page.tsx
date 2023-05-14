import {
  AppBar,
  Typography,
  Paper,
  Grid,
  CardContent,
  Card,
  Avatar,
  CardActionArea,
} from '@mui/material';
import { Paperbase } from '../../../core';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link as RouterLink } from 'react-router-dom';

export const AdminDashboardPage = () => {
  return (
    <Paperbase>
      <Paper sx={{ maxWidth: '80%', margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            padding={5}
          >
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={RouterLink} to={'books'}>
                  <CardContent>
                    <Grid container direction="row" justifyContent="center">
                      <Grid item>
                        <Avatar alt="Remy Sharp" sx={{ width: 48, height: 48 }}>
                          <LibraryBooksIcon fontSize="large"></LibraryBooksIcon>
                        </Avatar>
                      </Grid>
                    </Grid>
                    <Typography gutterBottom variant="h5" component="div">
                      Books
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available actions: View, Add, Remove, Modify.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={RouterLink} to={'users'}>
                  <CardContent>
                    <Grid container direction="row" justifyContent="center">
                      <Grid item>
                        <Avatar alt="Remy Sharp" sx={{ width: 48, height: 48 }}>
                          <PeopleIcon fontSize="large"></PeopleIcon>
                        </Avatar>
                      </Grid>
                    </Grid>
                    <Typography gutterBottom variant="h5" component="div">
                      Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available actions: View, Add, Remove, Modify.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </Paperbase>
  );
};
