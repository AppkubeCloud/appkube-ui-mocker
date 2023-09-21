import React, { Component } from 'react';
import UserImg from '../assets/images/user-img.png';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import 'simplebar/dist/simplebar.min.css';
import { connect } from 'react-redux'
import { status } from '../_constants';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "US",
      notification: false,
      profile: false,
      profileOnClick: false,
      searchToggle: false,
      notificationData: [],
      autoSelectList: [],
      requiData: {
        ID: null
      },
    }
  }

  // componentDidMount = () => {
  //   const loggedIn = window.localStorage.getItem('userData') !== null;
  //   if (!loggedIn) {
  //     window.location.href = '/'
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.get_notification_status !== prevProps.get_notification_status && this.props.get_notification_status === status.SUCCESS) {
      if (this.props.get_notification_data && this.props.get_notification_data.length > 0) {
        this.setState({ notificationData: this.props.get_notification_data })
      }
    }

    if (this.props.get_company_status !== prevProps.get_company_status && this.props.get_company_status == status.SUCCESS) {
      if (this.props.get_company_status && this.props.get_company_data && this.props.get_company_data.Data) {
       let drop_down_data = [{ ID: "", RemoteCmpName: "select" }]
        this.props.get_company_data.Data.map((itm, indx) => (
          drop_down_data.push(itm)
        )) 
        this.setState({
          autoSelectList: drop_down_data
        })
      }
    }



  }

  handleSelect = (value) => {
    this.setState({
      selected: value
    })
  }

  handleOnClick = () => {
    const { profileOnClick } = this.state;
    let data = !profileOnClick;
    this.setState({
      profileOnClick: data,
      profile: false,
      notification: false,
      searchToggle: false
    })
  }

  openSearchToggle = () => {
    const { searchToggle } = this.state;
    let data = !searchToggle;
    this.setState({
      searchToggle: data,
      profile: false,
      notification: false,
    })
  }

  openNotificationModel = () => {
    const { notification } = this.state;
    let data = !notification;
    this.setState({
      notification: data,
      profile: false,
      profileOnClick: false,
      searchToggle: false
    })
  }

  openLogOutModel = () => {
    const { profile } = this.state;
    let isData = !profile;
    this.setState({
      profile: isData,
      notification: false,
      profileOnClick: false,
      searchToggle: false
    })
  }

  openModelClose = () => {
    this.setState({
      profile: false,
      notification: false,
      profileOnClick: false
    })
  }

  notificationDisplay = () => {
    const { notificationData } = this.state;
    let retData = [];
    for (let i = 0; i < notificationData.length; i++) {
      let data = notificationData[i];
      retData.push(
        <div className="user-details" key={data.title}>
          <ul>
            <li>
              <Avatar alt="Remy Sharp" src={data.img} className="user-image" />
              <div className="user-massage">
                <p style={{ margin: 0 }}>{data.title}</p>
                <span style={{ margin: 0 }}>{data.description.substring(0, 40)}</span>
              </div>
            </li>
          </ul>
        </div>
      )
    }
    return retData;
  }

  componentWillMount() {

    // this.props.dispatch(companyAction.getCompany({}))

    let strCustomer = localStorage.getItem("userData");
    let customer = JSON.parse(strCustomer);

    if (customer) {
      this.setState({
        firstName: customer.UserName,
        isLogin: true,
      });
    }

  }

  logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  handleSelect = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    localStorage.setItem("wareHouseId", value)
    this.setState({
      requiData,
    });
  }

  handleChange = (event, value) => {
    if (value) {
      const selectedOption = this.state.autoSelectList.find((option) => option.RemoteCmpName === value);
      if (selectedOption) {
        localStorage.setItem("selectedOption", JSON.stringify(selectedOption.ID))
      }
    } else {
      console.log('No option selected');
    }
  }

  render() {
    const { profile, firstName, autoSelectList, requiData } = this.state;
    return (
      <>
        <div className="navbar-custom">
          <div className="header">
            <div className="row justify-content-center align-items-center">
              <div className="col-4">
                <span className='company-name-top'>Appkube Ui</span>
              </div>
              <div className="col-xl-8 col-lg-12">
                <div className="d-flex text-right header-notification ">
                  <div className='row header-auto-select-component'>
                    <div className="form-group-common ">
                      <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete

                          onChange={this.handleChange}
                          id="free-solo-2-demo"
                          disableClearable
                          options={autoSelectList.map((option) => option.RemoteCmpName)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search input"
                              InputProps={{
                                ...params.InputProps,
                                type: 'search',
                              }}
                            />
                          )}
                        />
                      </Stack>
                      {/* <FormControl className="select select-component">
                <NativeSelect
                  name="ID"
                   value={requiData.ID}
                   onChange={this.handleSelect}
                >
                  {
                   autoSelectList && autoSelectList.map((list, index)=>(
                    <option value={list.ID}>{list.RemoteCmpName}</option>
                   ))
                  }
                </NativeSelect>
              </FormControl> */}
                    </div>
                    {/* <FormControl className='seletc-auto-complete'>
                      <AutoCompleteComponent
                        handleAutoSelect={this.handleAutoSelect}
                        autoSelectList={autoSelectList}
                      />
                    </FormControl> */}
                    <div className="notification-user">

                      <ul>
                        <li>
                          <Avatar onClick={this.openLogOutModel} alt="Remy Sharp" src={UserImg} className="" />
                        </li>
                        <li>
                          <span className="user-name" onClick={this.openLogOutModel}><strong>{firstName}</strong> <br></br>Super Admin</span>
                        </li>
                        <li className="last" onClick={this.openLogOutModel}>
                          <ArrowDropDownIcon className=".sort-down" />
                        </li>
                      </ul>
                      {profile && (<>
                        <div
                          style={{ position: "fixed", width: "100%", height: "100%", left: "0", top: "0" }}
                          onClick={this.openModelClose}
                        ></div>
                        <div className="profile-menu">
                          <ul>
                            <li onClick={this.logout}><ExitToAppOutlinedIcon className="menu-icon" />Logout</li>
                          </ul>
                        </div>
                      </>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }

}
const mapStateToProps = (state) => {
  const { get_notification_status, get_notification_data, get_company_data,
    get_company_status,
    company_id_list,
    get_company_id_status } = state.hr;
  return {
    get_notification_status,
    get_notification_data,
    get_company_data,
    get_company_status,
    company_id_list,
    get_company_id_status
  }
}

export default connect(mapStateToProps)(Header);