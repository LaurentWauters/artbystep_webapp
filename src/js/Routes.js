import React from 'react';
import { routes } from './data';
import PDFCanvas from './PDF/pdfHandler';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../img/test_img.png';


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
            displayRoutes: true,
            displayFile: false,
            fileToDisplay: null,
            show: false,
        }

        this.renderList = this.renderList.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // handleRouteAvailability(i) {
    //     const allRoutes = routes;

    //     // const availableRoutes = allRoutes.map((value) => {
        
    //     //     return(
    //     //         <li key={value}>
    //     //             <Item />
    //     //         </li>
    //     //     )
    //     // })

    //     //const availableRoutes = allRoutes[0];

    //     return (
    //         <Item value={allRoutes[0].name}/>
    //     )
    // }

    handleClick(i) {
        const displayRoutes = this.state.displayRoutes;
        const displayFile = this.state.displayFile;
        const fileToDisplay = 1;
        this.setState({
            displayRoutes: !displayRoutes,
            displayFile: !displayFile,
            fileToDisplay: fileToDisplay,
        })
    }

    handleOverlay(i) {
        this.setState({show: !this.state.show});
    }



    renderList() {
        const allRoutes = routes;
        const routesMap = allRoutes.map((x) => {
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

            return (
                // <ul key={x.id}>
                //     <button onClick={this.handleClick}>{desc}</button>
                // </ul>
                <Col lg={4} md={4} sm={12} key={x.id}>
                    <Card className="text-black" onClick={this.handleClick} onMouseOver={() => this.handleOverlay()} onMouseLeave={() => this.handleOverlay()}>
                      <Card.Img src={logo} variant="top" alt="Card image" />
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
        if (this.state.displayRoutes) {
            return (
                <div className="wrapper">           
                    <h1>Your routes:</h1>
                    <Container>
                        <Row>
                            {/* <div className="routes-list">
                                <ol>{routesMap}</ol>
                            </div> */}
                            {routesMap}
                        </Row>
                    </Container>
                </div>
            )
        } else if (this.state.displayFile){
            console.log(allRoutes[0]);
            return (
                <div className="wrapper">
                    <button className="back" onClick={this.handleClick}>Go Back</button>
                    <h1>{allRoutes[0].name}</h1>
                    <PDFCanvas route={allRoutes[0]}/>
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