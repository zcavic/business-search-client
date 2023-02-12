import { Component } from "react";
import { RouteComponentProps } from 'react-router-dom';
import * as _ from "lodash";

import BusinessDataService from "../services/business.service";
import { IBusinessDetailsData } from "../types/business.type";
import React from "react";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentBusiness: IBusinessDetailsData;
  message: string;
}

export default class Business extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getBusiness = this.getBusiness.bind(this);

    this.state = {
      currentBusiness: {
        id: "",
        name: "",
        address: "",
        website: "",
        phone:"",
        openingHours:   {        
          days: {
            monday: [{ start: "", end: "", type: "" }],
            tuesday:  [{ start: "", end: "", type: "" }],
            wednesday:  [{ start: "", end: "", type: "" }],
            thursday:  [{ start: "", end: "", type: "" }],
            friday: [{ start: "", end: "", type: "" }],
            saturday:  [{ start: "", end: "", type: "" }],
            sunday:  [{ start: "", end: "", type: "" }],
          }
        }
      },
      message: "",
    };
  }

  renderOpeningHours = () => {
    const openings = _.get(this.state.currentBusiness, "openingHours.days");
    if (!openings) return (<div></div>);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const combined = [];

    for(let i = 0; i < days.length;i++){
      const findSame = () =>{
        if(i >= days.length - 1) return;
        const next = _.get(openings, days[i+1].toLowerCase());
        if(_.isEqual(opening, next)) {
          i++;
          findSame();
        }
      };
      const opening = _.get(openings, days[i].toLowerCase(), []) as Array<{ type: string, start: string, end:string}>;
      const open = opening.filter(o => o.type == "OPEN");
      if(open.length === 0) {
        combined.push(          
          <div className="grid-container">
            <div className="grid-item item1">{days[i]}</div>
            <div className="grid-item item2">CLOSE</div>
          </div>
          );
          continue;
      }
      const j = i;
      findSame();
      if(j == i){
        combined.push(          
          <div className="grid-container">
          <div className="grid-item item1">{days[i]}</div>
          <div className="grid-item item2">{open.map(interval =>  <div> {interval.start} - {interval.end}</div>)}</div>
        </div>
          );
      } else {

        combined.push(          
          <div className="grid-container">
          <div className="grid-item item1">{days[j]} - {days[i]}</div>
          <div className="grid-item item2">{open.map(interval =>  <div> {interval.start} - {interval.end}</div>)}</div>
        </div>
          );


      }
    }

    return combined;
  };

  componentDidMount() {
    this.getBusiness(this.props.match.params.id);
  }

  getCombined(){
    const days = this.state.currentBusiness.openingHours.days;
    Object.keys(days).reduce((combined, day) => combined = [], []);
  }

  getBusiness(id: string) {
    BusinessDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentBusiness: response.data.business,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentBusiness } = this.state;

    return (
      <div>
        <h2>{currentBusiness.name}</h2>
        <div className="grid-container">
          <div>
            <h6>Address</h6>
            <div>{currentBusiness.address}</div>
            <h6>Website</h6>
            <div>{currentBusiness.website}</div>
            <h6>Phone</h6>
            <div>{currentBusiness.phone}</div>
          </div>
          <div>
            <h6>Opening hours</h6>
            {this.renderOpeningHours()}
          </div>
        </div>
    </div>
    );
  }
}
