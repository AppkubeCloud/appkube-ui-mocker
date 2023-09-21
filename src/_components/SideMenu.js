import React, { Component } from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import navigation from './_nav';
import { Link } from "react-router-dom";

import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { connect } from "react-redux";
import { tabAction } from '../_actions';
import Logo from '../assets/images/logo.png';
class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      activeTab: 0,
      openedSubMenus: [],
      emailLength: 0,
      emailType: 'inbox',
      key: 1
    }
  }

  handleDrawerOpenClose = () => {
    const { isOpen, } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };



  componentDidUpdate(prevProps, prevState) {
    const { get_inbox_status, inbox_data } = this.props;
    let { emailLength } = this.state
    if (JSON.stringify(prevProps.inbox_data) !== JSON.stringify(inbox_data)) {
      emailLength = 0;
      if (inbox_data && inbox_data.length > 0) {
        for (let i = 0; i < inbox_data.length; i++) {
          if (inbox_data[i].isRead === "false" || inbox_data[i].isRead === false) {
            emailLength++;
          }
        }
      }
      this.setState({ emailLength })
    }
  }

  changeActiveTabColor = (location) => {
    if (location && location?.pathname) {
      const pathname = location?.pathname;
      for (let i = 0; i < navigation.length; i++) {
        if (pathname?.indexOf(navigation[i].to) !== -1) {
          this.setState({
            activeTab: i
          });
          break;
        }
      }
    }
  };

  setActiveTab = (index, tabName) => {
    if (tabName) {
      let tabArr = this?.props?.tab_Data?.tabs || []
      if (!tabArr.includes(tabName)) {
        tabArr?.push(tabName)
      }
      this.props.dispatch(tabAction.add([...tabArr], tabName))
      this.setState({
        activeTab: index,
      });
    }
  }

  setOpenClose = (e, index) => {
    e.stopPropagation();
    const { openedSubMenus } = this.state;
    openedSubMenus[index] = !openedSubMenus[index];
    this.setState({
      openedSubMenus
    });
  };


  handelSideNav = () => {
    if (window?.innerWidth < 922) { this.handleDrawerOpenClose() } { }
  }

  displaySidebarMenu = () => {
    const { activeTab, openedSubMenus, emailLength } = this.state;
    let retData = [];
    for (let i = 0; i < navigation.length; i++) {
      let nav = navigation[i];

      retData.push(
        <li className="sidebar-menu" key={nav?.name} onClick={this.handelSideNav}>
          {
            !nav?.children ?

              <ListItem className={activeTab === i ? "active" : ""} tabIndex="0" component={Link != null && Link} to={nav?.to} onClick={() => this.setActiveTab(i, nav.to)}>
                <ListItemIcon className="icon" style={{color:"white"}}>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav && nav?.name} className="name" />
              </ListItem>
              :
              <ListItem className={activeTab === i ? "active" : ""}>
                <ListItemIcon className="icon frist-level-children" style={{color:"white"}}>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav && nav?.name} className="name"  onClick={e => this.setOpenClose(e, i)}/>
              </ListItem>
          }

          {nav.children &&
            <div className="float-right arrow" style={{color:"white"}} onClick={e => this.setOpenClose(e, i)}>
              {!openedSubMenus[i] &&
                <ExpandMoreIcon />
              }
              {openedSubMenus[i] &&
                <ExpandLessIcon />
              }
            </div>
          }
          {(nav.children && openedSubMenus[i]) &&
            <ul tabIndex="0">
              {this.displayChild(nav.children)}
            </ul>
          }
        </li>
      );
    }
    return retData;
  }

  handleTabs = (tabName) => {
    if (tabName) {
      let tabArr = this?.props?.tab_Data?.tabs || []
      if (!tabArr.includes(tabName)) {
        tabArr?.push(tabName)
      }
      this.props.dispatch(tabAction.add([...tabArr], tabName))
    }
  }

  displayChild = (data) => {
    let childData = [];

    for (let j = 0; j < data.length; j++) {
      childData.push(
        <ListItem key={data[j].name}  >
          <Link to={data[j].to} style={{ cursor: "pointer" }} onClick={() => this.handleTabs(data[j].to)} >
            {data[j].name}
          </Link>
        </ListItem>
      );
    }
    return childData;
  }

  render() {
    const { isOpen, activeTab, openedSubMenus, emailLength } = this.state;
    return (
      <>
        <div className="d-block d-lg-none mobile-toggale">
          <IconButton className="menu-toggale"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpenClose}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className={isOpen ? "sidebar open" : "sidebar"}>
          <div className="d-block logo-container">
            <div className="row">
              <div className="col-10">
                <div className="logo">
                  <a href="/"><img src={Logo} alt="" style={{ width: "260px" }} /></a> 
                </div>
              </div>
              <div className="col-2">
                <div className="toggale">
                  <IconButton className="menu-toggale"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpenClose}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <SimpleBar style={{ maxHeight: 'calc(100% - 76px)' }} >
            <List className="sidebar-content" >
              {this.displaySidebarMenu()}
              {/* 
              {
                navigation.map((itm, i) => {

                  <li className="sidebar-menu" key={itm?.name} onClick={this.handelSideNav}>
               
                    <ListItem className={activeTab === i ? "active" : ""} tabIndex="0" component={Link != null && Link} to={itm?.to} onClick={() => this.setActiveTab(i, itm.to)}>
                      <ListItemIcon className="icon">
                        {itm?.icon}
                      </ListItemIcon>
                      <ListItemText primary={itm && itm?.name} className="name" />
                    </ListItem>

                    {itm.children &&
                      <div className="float-right arrow" onClick={e => this.setOpenClose(e, i)}>
                        {!openedSubMenus[i] &&
                          <ExpandMoreIcon />
                        }
                        {openedSubMenus[i] &&
                          <ExpandLessIcon />
                        }
                      </div>
                    } */}

              {/* {
                       itm.children && itm.children.length > 0 &&
                       itm.children.map((item, i)=>{
                        <ListItem key={item.name + i}  >
                          <Link to={item.to} style={{ cursor: "pointer" }} onClick={() => this.handleTabs(item.to)} >
                          {item.name}
                          </Link>
                          </ListItem>
                       })
                    } */}




              {/* {(itm.children && openedSubMenus[i]) &&
                      <ul tabIndex="0">
                        {this.displayChild(itm.children)}
                      </ul>
                    } */}
              {/* </li> */}
              {/* }) */}
              {/* } */}
            </List>
          </SimpleBar>
        </div>
      </>)
  }
}

const mapStateToProps = (state) => {
  const { get_inbox_status, inbox_data, tab_Data, tab_status } = state.hr
  return { get_inbox_status, inbox_data, tab_Data, tab_status }
}
export default connect(mapStateToProps)(SideMenu);