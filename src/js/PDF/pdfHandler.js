import React, { useCallback, useRef } from 'react';
import pdfjsLib from 'pdfjs-dist/build/pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

function pdfRender(url) {
    // var loadingtask = pdfjsLib.getDocument(url);
    // loadingtask.promise.then(function(pdf) {
    //   //Fetch page
    //   for(var num = 1; num <= pdf.numPages; num++) {
    //     pdf.getPage(num).then(function(page) {
    //       var scale = 1.5;
    //       var viewport = page.getViewport({ scale: scale, });
    //       // Prepare canvas using PDF page dimensions
    //       //
    //       var canvasContainer = document.getElementById("holder");
    //       var wrapper = document.createElement("div");
    //       wrapper.className = "canvas-wrapper";
    //       var canvas = document.createElement("canvas");
    //       var context = canvas.getContext('2d');
    //       canvas.height = viewport.height;
    //       canvas.width = viewport.width;
    //       // Render PDF page into canvas context
    //       //
    //       var renderContext = {
    //         canvasContext: context,
    //         viewport: viewport,
    //       };
    //       wrapper.appendChild(canvas);
    //       canvasContainer.appendChild(wrapper);
    //       page.render(renderContext);
    //   })
    //  }

    // })
    // return (
    //     <div className="holder">
    //         <div className="canvas-wrapper">
    //             <canvas context="2d">

    //             </canvas>
    //         </div>

    //     </div>
    // );
    //===========================================================
    const canvasRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
            for(var num = 1; num <= pdf.numPages; num++) {
                pdf.getPage(num).then(function(page) {
                    const viewport = page.getViewport({scale: 1.5});
                    const canvas = canvasRef.current;
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: viewport,
                    };
                    page.render(renderContext);
                })
            }
    })

    return (
        <canvas ref={canvasRef}></canvas>
    )
}



export default class PDFCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.route,
        }
    }


    render() {
        const route = this.props;
        return (
            <div>
                {pdfRender(route.route.url)}
            </div>
        );
    }
    // render() {
    //     const route = this.props;
    //     return (
    //         <div>
    //            <h1>{route.route.name}</h1>
    //         </div>
    //     );
    // }
}