import React from 'react';
import './PreviewEstimates.css'

const PreviewEstimate = () =>{
    return(
        <div className="HomeContainer__">
            <div className="LeftHeaderPreview">
                <p className="MajorHeader_PreviewEstimate__">Estimate Preview</p>
            </div>
            <div className="MajorHeader_bg_Image__">
            </div>
            <div className="RockImagebgHeader__">
                <p className="MountainSky_Proposal__">Mountain Sky Proposal</p>
            </div>
            <div className="NameAreaForEstimates__">
                <p className="EstimatesCxfullNameArea__">Leslie Alexander</p>
                <p className="EstimatesCxSalesArea__">Sales: Shiloh Churchill</p>
                <p className="EstimatesCxDatesArea__">Dates: 11-02-2021</p>
            </div>
            <div>
                <hr className="hrMainRule"></hr>
            </div>
        </div>
    );
}

export default PreviewEstimate;