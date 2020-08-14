import React, { Component } from 'react';
import styles from './EmployeesList.module.css';

class EmployeesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
      },
      isEdit: false,
      currId: 0,
    }
  }

  activateEdit(user) {
    this.setState({ isEdit: true, currId: user.id });
  }

  changeHandler = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [key]: value,
      }
    }))
  }

  async editUser(id) {
    if(!Object.values(this.state.form).some(item => item === '')) {
      let userObj = {
        ...this.state.form
      };
      this.props.users.some(item => {
        if(item.id === id) {
          userObj.avatar = item.avatar;  
          return true
        }
        return false;
      })
      try {
        await this.props.editUser(userObj, id);
        this.setState({
          isEdit: false,
          currId: 0
        })
      } catch(e) {
        console.log(e)
      }
    }
  }

  closeEdit = () => {
    this.setState({ 
      isEdit: false,
      currId: 0,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
      }
    })
  }

  render() {
    return(
      <div className={styles.employees}>
        <div className={styles.employeesList}>
          <h2>
            List Of All Employees
            <button>Refresh</button>  
          </h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Avatar</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.users.map(item => {
                  return (
                    <React.Fragment key={item.id}>
                      <tr key={item.id}>
                        <td>{ item.id }</td>
                        <td>{ item.first_name }</td>
                        <td>{ item.last_name }</td>
                        <td>{ item.email }</td>
                        <td>{ item.gender }</td>
                        <td>
                          <img src={ item.avatar }  alt="avatar"/>
                        </td>
                        <td>{ item.status ? 'Active' : 'Not-Active' }</td>
                        <td>
                        <button type="button" onClick={() => this.activateEdit(item)}>Edit</button>
                        <button type="button" onClick={() => this.props.deleteUser(item)}>Delete</button>
                        </td>
                      </tr>

                      { this.state.isEdit ? 
                          this.state.currId === item.id ?
                          <tr className={styles.editUser}>
                            <td name="cancel" onClick={this.closeEdit}>
                              <span></span>
                              <span></span>
                            </td>
                            <td><input type="text" name="first_name" onChange={this.changeHandler} placeholder="Enter First Name" /></td>
                            <td><input type="text" name="last_name" onChange={this.changeHandler} placeholder="Enter Last Name" /></td>
                            <td><input type="text" name="email" onChange={this.changeHandler} placeholder="Enter Email" /></td>
                            <td onChange={this.changeHandler}>
                              <span><input type="radio" name="gender" value="Male" />Male</span>
                              <span><input type="radio" name="gender" value="Female" />Female</span>
                            </td>
                            <td></td>
                            <td></td>
                            <td><button type="button" onClick={() => this.editUser(item.id)}>Submit</button></td>
                          </tr>
                        : <tr style={{ display: "none" }}></tr>
                        : <tr style={{ display: "none" }}></tr>
                      
                      }
                    </React.Fragment>
                  )
                })
              }
            </tbody>
          </table>
        </div>   
      </div>
    )
  }

}

export default EmployeesList;