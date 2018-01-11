import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addReminder, deleteReminder} from '../actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
// import {bindActionCreators} from 'redux';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: moment()
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date){
    this.setState({
      dueDate: date
    });
    console.log('date', this.state.dueDate);
  }
  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  deleteReminder(id){
    console.log('deleting in app', id);
    console.log('props', this.props);
    this.props.deleteReminder(id);
  }
  renderReminders() {
    const {reminders} = this.props;
    return(
      <ul className='list-group col-sm-4'>
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item reminderI">
                <div className="list-item">{reminder.text}</div>
                <div
                  className="list-item delete-button"
                  onClick={() => this.deleteReminder(reminder.id)}
                  >&#x2715;</div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  render() {
    return(
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline formR">
          <div className="formG">
            <input
              className="form-control inputR formItem"
              placeholder="I have to..."
              onChange = {event => this.setState({text: event.target.value})}
            />
          <DatePicker
            className="form-control inputR formItem"
            dateFormat =  "LLL"
            selected={this.state.dueDate}
            onChange={this.handleChange}
            />
          <button
            type="button"
            className="btn btn-success fromItem"
            onClick={() => this.addReminder()}
            >Add Reminder</button>
          </div>
        </div>
        {this.renderReminders()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addReminder}, dispatch);
// }

export default connect(mapStateToProps, {addReminder, deleteReminder})(App);
