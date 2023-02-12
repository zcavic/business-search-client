import { Component, ChangeEvent } from "react";
import BusinessDataService from "../services/business.service";
import { Link } from "react-router-dom";
import { IBusinessData } from '../types/business.type';
import React from "react";

type Props = {};

type State = {
  businesses: Array<IBusinessData>,
  currentBusiness: IBusinessData | null,
  currentIndex: number,
  searchTex: string
};

export default class BusinessList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTex = this.onChangeSearchTex.bind(this);
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      businesses: [],
      currentBusiness: null,
      currentIndex: -1,
      searchTex: ""
    };
  }

  componentDidMount() {
    this.retrieveBusinesses();
  }

  onChangeSearchTex(e: ChangeEvent<HTMLInputElement>) {
    const searchTex = e.target.value;

    this.setState({
      searchTex: searchTex
    });
    this.retrieveBusinesses(e.target.value);
  }

  retrieveBusinesses(search: string = "") {
    BusinessDataService.getAll(search)
      .then((response: any) => {
        this.setState({
          businesses: response.data.business
        });
        console.log(response.data.business);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBusinesses();
    this.setState({
      currentBusiness: null,
      currentIndex: -1
    });
  }

  retrieveBusinessDetails(business: IBusinessData, index: number) {
    this.setState({
      currentBusiness: business,
      currentIndex: index
    });
  }

  render() {
    const { searchTex, businesses } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search business entries..."
              value={searchTex}
              onChange={this.onChangeSearchTex}
            />
          </div>
        </div>
        <div className="col-md-12">
          <ul className="grid-container">
            {businesses &&
              businesses.map((business: IBusinessData, index: number) => (
                <li
                  className={
                    "list-group-item"
                  }
                  onClick={() => this.retrieveBusinessDetails(business, index)}
                  key={index}
                >
                <Link
                  to={"/businesses/" + business.id}
                >
                  <div>
                    <div>
                      <label>
                      </label>{" "}
                      {business.name}
                    </div>
                    <div>
                      <label>
                      </label>{" "}
                      {business.address}
                    </div>
                  </div>
                </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
