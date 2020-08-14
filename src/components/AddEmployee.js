import React, { Component } from 'react';
import styles from './AddEmployee.module.css';

class AddEmployee extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        gender: "Male",
        avatar: "https://robohash.org/praesentiumodioasperiores.bmp?size=200x200&set=set1",
      }
    }
  }

  changeHandler = (event) => {
    let key = event.target.name;
    let prop = event.target.value;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [key]: prop
      }
    }));
  }

  submitHandler = (event) => {
    event.preventDefault();
    if(!Object.values(this.state.form).some(value => value === '')) {
      this.setState(prevState => ({
        form: {
          ...prevState.form,
          status: false,
        }
      }), 
      async () => {
        try {
          await this.props.addUser(this.state.form);
          this.setState({
            form: {
              first_name: "",
              last_name: "",
              email: "",
              gender: "",
              avatar: "https://robohash.org/praesentiumodioasperiores.bmp?size=200x200&set=set1",
            }
          })
        } catch(e) {
          console.log(e)
        }
      });
    }
  }

  render() {
    return(
      <div className={styles.addEmployee}>
        <h2>Add An Employee</h2>
        <form onSubmit={this.submitHandler}>
          <div>
            <label>Firstname:</label>
            <input type="text" name="first_name" value={this.state.form.first_name} onChange={this.changeHandler} />
          </div>
          <div>
            <label>Lastname:</label>
            <input type="text" name="last_name" value={this.state.form.last_name} onChange={this.changeHandler} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.form.email} onChange={this.changeHandler} />
          </div>
          <div>
            <label>Gender:</label>
            <div onChange={this.changeHandler}>
              <input type="radio" name="gender" defaultChecked  value="Male" />Male
              <input type="radio" name="gender" value="Female" />Female
            </div>
          </div>
          <div>
            <label>Avatar:</label>
            <input type="file" />
          </div>
          <hr />
          <button type="submit">Add Employee</button>
        </form>
      </div>
    )
  }
}

export default AddEmployee;