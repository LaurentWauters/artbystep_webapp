import React from 'react';
import { routes } from './data';
import PDFCanvas from './PDF/pdfHandler';

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

    renderList() {
        const allRoutes = routes;
        const routesMap = allRoutes.map((x) => {
            const desc = x.name ? 
            'Route: ' + x.name : 
            'No Route';

            return (
                <ul key={x.id}>
                    <button onClick={this.handleClick}>{desc}</button>
                </ul>
            )
        })
        if (this.state.displayRoutes) {
            return (
                <div className="wrapper">           
                    <h1>Your routes:</h1>
                    <div className="routes-list">
                        <ol>{routesMap}</ol>
                    </div>
                </div>
            )
        } else if (this.state.displayFile){
            console.log(allRoutes[0]);
            return (
                <div className="wrapper">
                    <button className="back" onClick={this.handleClick}>Go Back</button>
                    <h1>Nothing to see here</h1>
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