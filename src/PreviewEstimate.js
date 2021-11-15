import React from 'react';
import './PreviewEstimates.css'

const PreviewEstimate = () => {
    return (
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
            <div className="hr_Demacate__">
                <hr className="hrWebClass___"></hr>
            </div>

            <div className="EstimateOverViewRect__">
                <p className="EstOverHeaderAreaNow__">&nbsp;&nbsp;Estimate Overview</p>
            </div>
            <div className="EstimateOverViewInputForm__">
                <p className="midgLabel__">Total Project Price &nbsp;<input type="text" className="InputExtArea1__" /><span className="toTheRight__">Man Hours &nbsp;<input type="text" className="InputExtArea1__" /></span></p>
                <p className="midgLabel__">Total Project Cost &nbsp;<input type="text" className="InputExtArea1__" /><span className="toTheRight__">Days &nbsp;<input type="text" className="InputExtArea1__" /></span></p>
                <p className="midgLabel__ ">Labor Cost &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;<input type="text" className="InputExtArea1__" /><span className="toTheRight__">Subcontractor Cost &nbsp;<input type="text" className="InputExtArea1__" /></span></p>
                <p className="midgLabel__">Material Cost &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<input type="text" className="InputExtArea1__" /><span className="toTheRight__">Expected Overthread &nbsp;<input type="text" className="InputExtArea1__" /></span></p>
                <p className="midgLabel__">Gross Profit &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<input type="text" className="InputExtArea1__" /><span className="toTheRight__">Net Profit &nbsp;<input type="text" className="InputExtArea1__" /></span></p>
                <p className="midgLabel__">Gross Profit % &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<input type="text" className="InputExtArea1__" /><span className="toTheRight__">Net Profit % &nbsp;<input type="text" className="InputExtArea1__" /></span></p>

            </div>
            <div className="EstimateOverViewRect__">
                <p className="EstOverHeaderAreaNow__">&nbsp;&nbsp;Demolition & Prep</p>
            </div>
            <div className="DemolitionArea__">
                <p className="instructionText__">"Remove the current landscape as discussed<br />
                    Prep area for landscape/hardscape to be installed<br />
                    Haul off and dispose of all materials"</p>
            </div>
            <div className="EstimateOverViewRect__">
                <p className="EstOverHeaderAreaNow__">&nbsp;&nbsp;Grading</p>
            </div>
            <div className="GradingArea__">
                <p className="GradingAreaText___">"Grade area as discussed<br />
                    Bring in __ tons of fill dirt and __ tons of topsoil for grading<br />
                    Haul off dirt as needed"</p>
            </div>
            <div className="EstimateOverViewRect__">
                <p className="EstOverHeaderAreaNow__">&nbsp;&nbsp;Total Estimate</p>
            </div>
            <div className="SubTotalCalcRS__">
                <p className="SubTotalCalcResults__">Subtotal : 	&nbsp;	$327,496.22<br />
                    Taxes / Discount: &nbsp;	$0.00<br />
                    Contract Total : &nbsp;	$327,496.22</p>
            </div>

            <div align="center" className="ButtonEndArea__">
                <input type="button" value="Close" className="closeButton__" /> &nbsp;&nbsp;
                <input type="button" value="Send to Customer" className="sendCustomer__" />
            </div>

        </div>
    );
}

export default PreviewEstimate;