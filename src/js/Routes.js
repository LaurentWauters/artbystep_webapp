import React from 'react';
import { routes } from './data';
import PDFCanvas from './PDF/pdfHandler';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import "bootstrap/dist/css/bootstrap.min.css";

import { accounts } from './dbconn/mockAccounts';
//import InitiateConnection from './dbconn/DBHandler';
//import GalleryTimeTable from './PDF/galleryTimeTable';


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: null,
            routeID: 0,
        }
    }
    
    render() {
        return (
            <div>
                <div>

                </div>
            </div>
        )
    }

}

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginscreen: true,
            displayRoutes: false,
            displayFile: false,
            fileToDisplay: null,
            show: false,
            value: '',
            activeUser: {},
            languages: [],
            routes: [],
        }

        this.renderList = this.renderList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //activates when clicking on a route
    handleClick(i) {
        const displayRoutes = this.state.displayRoutes;
        const displayFile = this.state.displayFile;
        const fileToDisplay = i;

        if (displayRoutes) {
            this.setState({
                displayRoutes: !displayRoutes,
                displayFile: !displayFile,
                fileToDisplay: fileToDisplay,
            })
        } else if (displayFile) {
            this.setState({
                displayRoutes: !displayRoutes,
                displayFile: !displayFile,
                fileToDisplay: fileToDisplay,
            })
        } else {
            console.log("bork");
        }
    }

    //input textbox fill
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    //checks if the date of purchase is still within the 31days time period
    checkIfValid(user) {
        const startDate = user.startDate;
        const now = Date.now();
        const dateDifference = now - startDate
        //check if more than 31 days (in milliseconds)
        if (dateDifference > 2678400000) {
            return false;
        }
        return true;
    }

    //checks if the user code is in our DB
    handleSubmit(event) {
        const loginscreen = this.state.loginscreen;
        const displayRoutes = this.state.displayRoutes;
        const code = this.state.value;

        const mockAccounts = accounts;

        mockAccounts.forEach((x) => {
            if(x.id === code) {
                if(this.checkIfValid(x)) {
                    this.setState({
                        loginscreen: !loginscreen,
                        displayRoutes: !displayRoutes,
                        activeUser: x,
                        languages: x.lang,
                        routes: x.routes,
                    })
                } else {
                    alert("this code is not valid anymore");
                }
            } else {
                console.log('error');
            }
        })


        event.preventDefault();
    }

    handleOverlay(i) {
        this.setState({show: !this.state.show});
    }


    getLanguagesFromAccount(param) {
        const languages = param.lang;
        this.setState({languages: languages});
    };


    getRoutesFromAccount(param) {
        const selectRoutes = param.routes;
        this.setState({routes: selectRoutes});

    };

    renderList() {
        
        // const query = new URLSearchParams(window.location.search);
        // const languages = this.getLanguages(query);
        // const selectRoutes = this.getRoutes(query);

        //const allRoutes = routes;
        //const languages = [];
        //const routesMap = allRoutes.map((x) => {
        //InitiateConnection();
        const selectRoutes = [];
        
        this.state.routes.forEach((x) => selectRoutes.push(routes[x]));

        const routesMap = selectRoutes.map((x) => {
            const title = x.name ? 
            'Route: ' + x.name : 
            'No Route';
            const desc = x.desc ?
            x.desc :
            'no description available';
            const distance = x.distance ?
            'Estimated distance: ' + x.distance :
            "no duration available";
            const amountGalleries = x.amountGalleries ?
            'Amount of Galleries: ' + x.amountGalleries :
            'no galleries available';
            const image = x.image;

            return (
                <Col lg={4} md={4} sm={12} key={x.id}>
                    <Card value={x}className="text-black" onClick={this.handleClick.bind(this, x)} onMouseOver={() => this.handleOverlay()} onMouseLeave={() => this.handleOverlay()}>
                      <Card.Img src={image} variant="top" alt="Card image" />
                        <Overlay show={this.state.show}>
                            <Card.ImgOverlay>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{desc}</Card.Text>
                                <Card.Text>{distance}</Card.Text>
                                <Card.Text>{amountGalleries}</Card.Text>
                            </Card.ImgOverlay>
                        </Overlay>
                    </Card>
                </Col>
            )
        })
        if (this.state.loginscreen) {
            //Login Screen
            return (
                <form>
                    <h1>Enter code</h1>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            )
        }
        else if (this.state.displayRoutes) {
            //Render of all the routes
            return (
                <div className="wrapper">           
                    <h1>Your routes:</h1>
                    <Container>
                        <Row>
                            {routesMap}
                        </Row>
                    </Container>
                </div>
            )
        } else if (this.state.displayFile){
            //Render of the PDF's
            const num = selectRoutes.indexOf(this.state.fileToDisplay);

            return (
                <div className="wrapper">
                    <button className="back" onClick={this.handleClick}>Go Back</button>
                    <h1>{selectRoutes[num].name}</h1>
                    <PDFCanvas route={selectRoutes[num]}/>
                </div>
            )
        }
    }

    render() {

        return (
            <div>
                { this.renderList() }
            </div>        
        )
    }
}