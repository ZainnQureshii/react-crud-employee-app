import React, { Component } from 'react';
import AddEmployee from './AddEmployee';
import EmployeesList from './EmployeesList';
import loaderImg from '../assets/images/loader.gif'
import styles from './Employees.module.css';

class Employees extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      let users = await fetch('http://localhost:3001/users', {
      });
      users = await users.json();
      this.setState({
        users,
        isLoading: false,
      })
    } catch(e) {
      console.log(e)
    }
  }

  deleteUser = async (user) => {
    try {
      if(this.state.users.some(item => item.id === user.id)) {
        await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "DELETE",
          "Content-Type": "application/json"
        });
        console.log("User Deleted")
        let allUsers = this.state.users;
        allUsers.some((item, index) => {
          if(user.id === item.id) {
            allUsers.splice(index, 1);
            this.setState({
              users: allUsers
            })
            return true;
          }
          return false;
        })
      } else {
        console.log("not found")
      }
    } catch(e) {
      console.log(e)
    }
  }

  addUser = async (form) => {
    try {
      await fetch('http://localhost:3001/users/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      console.log("User Added");
      this.getUsers();
    } catch(e) {
      console.log(e)
    }
  }

  editUser = async (userObj, id) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj)
      })
      console.log("User Updated")
      this.getUsers();
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return(
      <React.Fragment>
        <AddEmployee addUser={this.addUser} />
        <hr/>
        {
          this.state.isLoading ?
            <div className={styles.loader}>
              <img src={loaderImg} alt="loader" />
            </div> : 
            <EmployeesList users={this.state.users} editUser={this.editUser} deleteUser={this.deleteUser} />
        }
      </React.Fragment>
    )
  }
}

export default Employees