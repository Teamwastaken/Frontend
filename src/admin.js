import React from "react";
import Form from "./components/common/form";
import "./css/admin.css";
import "./css/login.css";
import config from "./config/config.json";
import { Navigate } from "react-router-dom";
import http from "./services/httpService";
import { getCustomers } from "./services/customerService";
import SearchBox from "./components/common/searchBox";

class AdminPanel extends Form {
  state = {
    customers: [],
    NewCustomerPopup: false,
    checkIn: false,
    data: { name: "", email: "", _id: "" },
    errors: { name: "" },
    checkinData: { _id: "", name: "", email: "", checkedIn: "false" },
    CheckInPopUp: false,
    searchQuery: "",
    selectedFilter: null,
  };
  doSubmit = () => {
    this.handlePost();
  };

  handlePost = async () => {
    const customers = [...this.state.customers];
    try {
      const customers = [...this.state.customers];
      const customer = {
        name: this.state.data.name,
        email: this.state.data.email,
        checkedIn: false,
      };
      customers.push(customer);
      this.setState({ customers });

      await http.post(config.apiUrl + "/api/customer", customer);
    } catch (ex) {
      this.setState({ customers });
      console.log(ex.response.data);
    }
  };
  handleDelete = async (customer) => {
    const originalCustomors = this.state.customers;
    const customers = this.state.customers.filter(
      (c) => c._id !== customer._id
    );
    this.setState({ customers });
    const url = config.apiUrl + `/api/customer/${customer._id}`;

    try {
      await http.delete(url);
    } catch (ex) {
      this.setState({ customers: originalCustomors });
    }
  };

  getPagedData = () => {
    const { customers, searchQuery } = this.state;

    let filtered = customers;
    if (searchQuery)
      filtered = customers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
  };

  handleCheckIn = async (customer) => {
    console.log(customer);

    const originalCustomors = this.state.customers;

    const url = config.apiUrl + `/api/customer/${customer._id}`;

    try {
      const { data: customer } = await http.patch(url);
      const checkedIn = { ...this.state.checkinData };
      checkedIn._id = customer._id;
      checkedIn.name = customer.name;
      checkedIn.email = customer.email;
      checkedIn.checkedIn = customer.checkedIn;
      this.setState({ checkinData: customer });
      this.setState({ CheckInPopUp: true });
    } catch (ex) {
      this.setState({ customers: originalCustomors });
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedFilter: null });
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  render() {
    const {
      searchQuery,
      checkinData,
      CheckInPopUp,
      checkIn,
      NewCustomerPopup,
    } = this.state;

    if (localStorage.getItem("logedIn") !== "true")
      return <Navigate to='/login' replace={true} />;
    const { customers } = this.state;

    let filtered = customers;
    if (searchQuery)
      filtered = customers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    return (
      <div>
        <p>{`Showing ${customers.length} customers.`}</p>
        <button onClick={() => this.setState({ NewCustomerPopup: true })}>
          Add Customer
        </button>
        <button onClick={() => this.setState({ checkIn: true })}>
          Check In
        </button>
        {NewCustomerPopup ? (
          <form className='form-items' onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            <div className='form-items button-container'>
              <button className='button blue' type='submit'>
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div></div>
        )}
        {checkIn ? (
          <div className='form-items'>
            {this.renderInput("_id", "Id")}

            <div className='form-items button-container'>
              <button
                className='button blue'
                onClick={() => this.handleCheckIn(this.state.data)}
              >
                Check In
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {CheckInPopUp ? (
          <div className={checkinData.checkedIn ? "red" : "green"}>
            <p>
              {this.state.checkinData.checkedIn
                ? "Already Checked In"
                : "Now Checked In"}
            </p>
            <p>{checkinData._id}</p>
            <p>{checkinData.name}</p>
            <p>{checkinData.email}</p>
            <p>{String(checkinData.checkedIn)}</p>
          </div>
        ) : (
          <div></div>
        )}

        <div className='form-items'>
          <SearchBox
            className='input-container'
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Checked In</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer._id || 0}>
                <td>{customer._id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{String(customer.checkedIn)}</td>
                <td>
                  {" "}
                  <button
                    className='blue delete'
                    onClick={() => this.handleCheckIn(customer)}
                  >
                    Check In
                  </button>
                </td>
                <td>
                  <button
                    className='delete red'
                    onClick={() => this.handleDelete(customer)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminPanel;
