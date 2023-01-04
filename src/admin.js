import React from "react";
import Form from "./components/common/form";
import "./css/admin.css";
import "./css/login.css";
import config from "./config/config.json";
import { Navigate } from "react-router-dom";
import http from "./services/httpService";
import { getCustomers } from "./services/customerService";

class AdminPanel extends Form {
  state = {
    customers: [],
    NewCustomerPopup: false,
    checkIn: false,
    data: { name: "", email: "", _id: "" },
    errors: { name: "" },
    checkinData: { _id: "", name: "", email: "", checkedIn: "false" },
    CheckInPopUp: false,
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
  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  render() {
    if (localStorage.getItem("logedIn") !== "true")
      return <Navigate to='/login' replace={true} />;
    const { customers } = this.state;

    return (
      <div>
        <p>{`Showing ${customers.length} customers.`}</p>
        <button onClick={() => this.setState({ NewCustomerPopup: true })}>
          Add Customer
        </button>
        <button onClick={() => this.setState({ checkIn: true })}>
          Check In
        </button>
        {this.state.NewCustomerPopup ? (
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
        {this.state.checkIn ? (
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
        {this.state.CheckInPopUp ? (
          <div className={this.state.checkinData.checkedIn ? "red" : "green"}>
            <p>
              {this.state.checkinData.checkedIn
                ? "Already Checked In"
                : "Now Checked In"}
            </p>
            <p>{this.state.checkinData._id}</p>
            <p>{this.state.checkinData.name}</p>
            <p>{this.state.checkinData.email}</p>
            <p>{String(this.state.checkinData.checkedIn)}</p>
          </div>
        ) : (
          <div></div>
        )}
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
            {customers.map((customer) => (
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
