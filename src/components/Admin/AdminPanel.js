import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIcon';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import styled from 'styled-components';

import { Container,
    Typography,
    Card,
    CardContent,
    Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    containerFluid:{
        width: 100,
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    con:{
        color: '#fff',
        background: "linear-gradient(60deg, rgba(54,54,54,1) 26%, rgba(32,40,84,1) 62%)",
    },
}));
const AdminLink = styled.a`
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;
     
    &:hover {
        color: black;
        transition: 200ms ease-in;
    }
  `;
export default function AdminPanel() {

    const classes = useStyles();
    const Admin = JSON.parse(localStorage.getItem("Admin"));
    const [ counts, setCounts ] = useState({
        users:0,
        products:0,
        orders: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("https://54.250.170.185.nip.io/Admin/counts", {
                headers: {
                    "x-access-token": Admin.accessToken
                }}).then(response => {
                setCounts(response.data)
                console.log(response)
              }).catch(error => {
                console.log(error)
              })
          },5000)

          return () => {
            clearInterval(interval);
        };
    }, [])
    
    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
            <Grid item xs={12} sm={12} className={classes.containerFluid}>
                    <Card className={classes.con}>
                        <CardContent>
                        <Grid container wrap="nowrap" >
                        <FormatQuoteIcon style={{height: 80, width: 45}}/>
                            <Grid container direction="row" justify="center" alignItems="center">
                            
                                <Typography style={{padding:30}}>
                                   <span style={{fontSize: 25, fontWeight:800}}>Welcome back, Admin!</span>
                                    <span style={{display:'block', color: 'rgba(255, 255, 255, 0.5) !important;' }}>On this page, you can view stats and manage recent tasks and orders.</span>
                                </Typography>
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center">
                               <ProfileIcon />
                            </Grid>
                         
                        </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.con}>
                        <CardContent>
                        <Grid container wrap="nowrap" >
                            <Grid  direction="column" justify="center" alignItems="center">
                            <AdminLink href="/admin/Products"> <Typography style={{padding:20}}>
                                    <span style={{fontSize: 15, fontWeight: 700}}>Edit Products</span>
                                </Typography></AdminLink>
                            </Grid>
                            <Grid  direction="column" justify="center" alignItems="center" style={{ marginLeft : '40px', marginTop: "13px"}}>
                                <h2>{counts.products}</h2>
                            </Grid>
                        </Grid>    
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card className={classes.con}>
                        <CardContent>
                        <Grid container wrap="nowrap" >
                            <Grid  direction="column" justify="center" alignItems="center">
                            <AdminLink href="/admin/Users">    <Typography style={{padding:20}}>
                                    <span style={{fontSize: 15, fontWeight: 700}}>Edit Users</span>
                                </Typography></AdminLink>
                            </Grid>
                            <Grid  direction="column" justify="center" alignItems="center" style={{ marginLeft : '40px', marginTop: "13px"}}>
                                <h2>{counts.users}</h2>
                            </Grid>
                        </Grid>    
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card className={classes.con}>
                        <CardContent>
                        <Grid container wrap="nowrap" >
                            <Grid  direction="column" justify="center" alignItems="center">
                                <Typography style={{padding:20}}>
                                    <span style={{fontSize: 15, fontWeight: 700}}>Payment Received</span>
                                </Typography>
                            </Grid>
                            <Grid  direction="column" justify="center" alignItems="center" style={{ marginLeft : '40px', marginTop: "13px"}}>
                                <h2>{counts.orders}</h2>
                            </Grid>
                        </Grid>    
                        </CardContent>
                    </Card>
                </Grid>
           
            <Grid item xs={12} sm={4}>
                <Card className={classes.con}>
                        <CardContent>
                        <Grid container wrap="nowrap" >
                            <Grid  direction="column" justify="center" alignItems="center">
                                <Typography style={{padding:20}}>
                                    <span style={{fontSize: 15, fontWeight: 700}}>Delivery Made</span>
                                </Typography>
                            </Grid>
                            <Grid  direction="column" justify="center" alignItems="center" style={{ marginLeft : '40px', marginTop: "13px"}}>
                                <h2>0</h2>
                            </Grid>
                        </Grid>    
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card className={classes.con}>
                        <CardContent>
                        <Grid container wrap="nowrap" >
                            <Grid  direction="column" justify="center" alignItems="center">
                            <AdminLink href="/admin/Users">     <Typography style={{padding:20}}>
                                    <span style={{fontSize: 15, fontWeight: 700}}>Update Company Details</span>
                                </Typography></AdminLink>
                            </Grid>
                            
                        </Grid>    
                        </CardContent>
                    </Card>
                </Grid>
                </Grid>
        </Container>
    )
}