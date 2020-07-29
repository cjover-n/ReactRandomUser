import React, { Component } from 'react';
import '../assets/css/App.css';
import '../assets/css/bootstrap.css';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    }
    this.url = "https://randomuser.me/api/";
  }

  componentDidMount() {
    fetch(this.url)
      .then(results => { return results.json() })
      .then(data => {
        data.results.map((person) => {
          this.setState({
            image: person.picture.large,
            name: person.name.title + ' ' + person.name.first + ' ' + person.name.last,
            email: person.email,
            birth: person.dob.date,
            age: person.dob.age,
            phone: person.phone
          })
        })
      })
  }


  render() {
    const datebirth = new Date(this.state.birth);
    const dateString = datebirth.toLocaleDateString('en-US', {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-9 n_card">
              <img alt="Person" className="img-fluid" src={this.state.image} />
              <div className="data">
                <h1>{this.state.name}</h1>
                <p><span role="img" aria-label="mail">📧</span> {this.state.email}</p>
                <p><span role="img" aria-label="birth">🎂</span> {dateString} ({this.state.age} years old)</p>
                <p><span role="img" aria-label="phone">☎</span> {this.state.phone}</p>
              </div>
            </div>
            <div className="col-md-3">
              <button className="btn btn-light" onClick={() => { this.url = "https://randomuser.me/api/"; this.componentDidMount(this.url); }}><span role="img" aria-label="random">🔀</span> Random</button><br />
              <button className="btn btn-light" onClick={() => { this.url = "https://randomuser.me/api/?gender=female"; this.componentDidMount(this.url); }}><span role="img" aria-label="female">👩</span> Female</button><br />
              <button className="btn btn-light" onClick={() => { this.url = "https://randomuser.me/api/?gender=male"; this.componentDidMount(this.url); }}><span role="img" aria-label="male">👨</span> Male</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
