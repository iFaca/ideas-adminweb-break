// import { ReactMeteorData } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import IndividualFile from './FileIndividualFile';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'lodash';

import Files from '../../../api/files/files';

class FileUploadComponent extends Component {

    state = {
        uploading: [],
        progress: 0,
        inProgress: false
    }

    componentDidMount() {
        $('#fileinput').on('change', () => {
            $('#inputval p').text($('#fileinput').val());
            console.log($('#fileinput'))
        });
    }

    uploadIt = e => {
        // "use strict";
        e.preventDefault();

        let self = this;

        const { fileLocator } = this.props;

        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // there was multiple files selected
            var file = e.currentTarget.files[0];

            if (file) {
                let uploadInstance = Files.insert({
                    file: file,
                    meta: {
                        locator: fileLocator,
                        userId: Meteor.userId() // Optional, used to check on server for file tampering
                    },
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: false // If you see issues with uploads, change this to false
                }, false);

                self.setState({
                    uploading: uploadInstance, // Keep track of this instance to use below
                    inProgress: true // Show the progress bar now
                });

                // These are the event functions, don't need most of them, it shows where we are in the process
                uploadInstance.on('start', function () {
                     console.log('Starting');
                });

                uploadInstance.on('end', function (error, fileObj) {
                    console.log('ERRRRRRROR macho', error)
                    self.props.saveData(fileObj._id, fileObj.name);
                    Bert.alert(`El archivo ${fileObj.name}, se subió correctamente.`, 'success');
                });

                uploadInstance.on('uploaded', function (error, fileObj) {
                    // console.log('uploaded: ', fileObj);

                    // Remove the filename from the upload box
                    self.refs['fileinput'].value = '';

                    // Reset our state for the next file
                    self.setState({
                        uploading: [],
                        progress: 0,
                        inProgress: false
                    });
                    $('#inputval p').text("Archivo subido correctamente");
                });

                uploadInstance.on('error', function (error, fileObj) {
                    console.log('Error during upload TE tengo: ' + error);
                });

                uploadInstance.on('progress', function (progress, fileObj) {
                    console.log('Upload Percentage: ' + progress);
                    // Update our progress bar
                    self.setState({
                        progress: progress
                    })
                });

                uploadInstance.start(); // Must manually start the upload
            }
        }
    }

    // This is our progress bar, bootstrap styled
    // Remove this function if not needed
    showUploads() {

        if (!_.isEmpty(this.state.uploading)) {
            return <div className="progress-bar-container">
                <div className="progress progress-striped active">
                    <div style={{ width: this.state.progress + '%' }} aria-valuemax="100"
                        aria-valuemin="0"
                        aria-valuenow={this.state.progress || 0} role="progressbar"
                        className="progress-bar progress-bar-success">
                        {/* <span className="sr-only">{this.state.progress}% Complete (success)</span>
                        <span>{this.state.progress}%</span> */}
                    </div>
                </div>
            </div>
        }
    }

    render() {

        // let { docs } = this.props;

        // Run through each file that the user has stored
        // (make sure the subscription only sends files owned by this user)
        //let display = _.map(docs, (aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'));
        // let link = Files.findOne({ _id: aFile._id }).link();  //The "view/download" link

        // Send out components that show details of each file
        //     return <div key={'file' + key}>
        //         <IndividualFile
        //             fileName={aFile.name}
        //             fileUrl={link}
        //             fileId={aFile._id}
        //             fileSize={aFile.size}
        //         />
        //     </div>
        // });

        return (
            <div>
                {/* {display} */}
                <div className="row">
                    <div className="col-md-12 file-loader-container">
                        <label htmlFor="fileinput" className="file-label">
                            <i className="fa fa-folder-open"></i>
                            <div id="inputval" className="input-value"><p>No hay archivos seleccionados</p></div>
                        </label>
                        <input
                            type="file"
                            name="fileinput"
                            id="fileinput"
                            disabled={this.state.inProgress} ref="fileinput"
                            onChange={this.uploadIt} />
                        {this.showUploads()}
                    </div>
                </div>
            </div>
        )
    }
};

export default FileUploadComponent;