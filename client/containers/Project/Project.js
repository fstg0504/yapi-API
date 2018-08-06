import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';
import { Subnav } from '../../components/index';
import { fetchGroupMsg } from '../../reducer/modules/group';
import { setBreadcrumb } from '../../reducer/modules/user';
import { getProject, getProjectMemberList2 } from '../../reducer/modules/project';
import Interface from './Interface/Interface.js';
import Activity from './Activity/Activity.js';
import Setting from './Setting/Setting.js';
import Loading from '../../components/Loading/Loading';
import ProjectMember from './Setting/ProjectMember/ProjectMember.js';
import ProjectData from './Setting/ProjectData/ProjectData.js';
const plugin = require('client/plugin.js');
@connect(
  state => {
    return {
      curProject: state.project.currProject,
      currGroup: state.group.currGroup,
      user: state.user
    };
  },
  {
    getProject,
    fetchGroupMsg,
    getProjectMemberList2,
    setBreadcrumb
  }
)
export default class Project extends Component {
  static propTypes = {
    match: PropTypes.object,
    curProject: PropTypes.object,
    getProject: PropTypes.func,
    getProjectMemberList2: PropTypes.func,
    location: PropTypes.object,
    fetchGroupMsg: PropTypes.func,
    setBreadcrumb: PropTypes.func,
    currGroup: PropTypes.object
  };

  constructor(props) {
    super(props);
  }
  state = {
      roleid: '', role:''
  }
  async UNSAFE_componentWillMount() {
    await this.props.getProject(this.props.match.params.id);
    await this.props.fetchGroupMsg(this.props.curProject.group_id);
    let crumb;
    if(this.props.curProject.role !== 'owner'){
      crumb = [
          {
              name: this.props.curProject.name
          }
      ];
    } else {
      crumb = [
          {
              name: this.props.currGroup.group_name,
              href: '/group/' + this.props.currGroup._id
          },
          {
              name: this.props.curProject.name
          }
      ];
    }
    this.props.setBreadcrumb(crumb);

    const { user } = this.props;
    this.props.getProjectMemberList2(this.props.match.params.id).then(res => {
      if (res.payload.data.errcode === 0) {
        let memlist = res.payload.data.data;
          for(let i in memlist){
              let node = memlist[i]
              if(node.email === user.email) {
                  this.setState({
                      roleid: node.roleid,
                      role: node.role
                  });
              }
          }
      }
    });
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const currProjectId = this.props.match.params.id;
    const nextProjectId = nextProps.match.params.id;
    if (currProjectId !== nextProjectId) {
      await this.props.getProject(nextProjectId);
      await this.props.fetchGroupMsg(this.props.curProject.group_id);
      this.props.setBreadcrumb([
        {
          name: this.props.currGroup.group_name,
          href: '/group/' + this.props.currGroup._id
        },
        {
          name: this.props.curProject.name
        }
      ]);
    }
  }

  render() {
    const { match, location } = this.props;
    const { roleid, role } = this.state;
    let routers = {
      interface: { name: '接口', path: '/project/:id/interface/:action', component: Interface },
      activity: { name: '动态', path: '/project/:id/activity', component: Activity },
      data: { name: '数据管理', path: '/project/:id/data', component: ProjectData }
        //项目经理才有以下权限
      // members: { name: '成员管理', path: '/project/:id/members', component: ProjectMember },
      // setting: { name: '设置', path: '/project/:id/setting', component: Setting }
    };
    if(role === 'owner'){
        routers.members = { name: '成员管理', path: '/project/:id/members', component: ProjectMember }
        routers.setting = { name: '设置', path: '/project/:id/setting', component: Setting }
    }
    plugin.emitHook('sub_nav', routers);

    let key, defaultName;
    for (key in routers) {
      if (
        matchPath(location.pathname, {
          path: routers[key].path
        }) !== null
      ) {
        defaultName = routers[key].name;
        break;
      }
    }

    // let subnavData = [{
    //   name: routers.interface.name,
    //   path: `/project/${match.params.id}/interface/api`
    // }, {
    //   name: routers.activity.name,
    //   path: `/project/${match.params.id}/activity`
    // }, {
    //   name: routers.data.name,
    //   path: `/project/${match.params.id}/data`
    // }, {
    //   name: routers.members.name,
    //   path: `/project/${match.params.id}/members`
    // }, {
    //   name: routers.setting.name,
    //   path: `/project/${match.params.id}/setting`
    // }];

    let subnavData = [];
    Object.keys(routers).forEach(key => {
      let item = routers[key];
      let value = {};
      if (key === 'interface') {
        value = {
          name: item.name,
          path: `/project/${match.params.id}/interface/api`
        };
      } else {
        value = {
          name: item.name,
          path: item.path.replace(/\:id/gi, match.params.id)
        };
      }
      subnavData.push(value);
    });

    if (this.props.currGroup.type === 'private' || Number(roleid) === 5 || Number(roleid)=== 6) {
      subnavData = subnavData.filter(item => {
        return item.name != '成员管理';
      });
    }

    if (Object.keys(this.props.curProject).length === 0) {
      return <Loading visible />;
    }

    return (
      <div>
        <Subnav default={defaultName} data={subnavData} />
        <Switch>
          <Redirect exact from="/project/:id" to={`/project/${match.params.id}/interface/api`} />
          {/* <Route path={routers.activity.path} component={Activity} />
          
          <Route path={routers.setting.path} component={Setting} />
          {this.props.currGroup.type !== 'private' ?
            <Route path={routers.members.path} component={routers.members.component}/>
            : null
          }

          <Route path={routers.data.path} component={ProjectData} /> */}
          {Object.keys(routers).map(key => {
            let item = routers[key];

            return key === 'members' ? (
              this.props.currGroup.type !== 'private' ? (
                <Route path={item.path} component={item.component} key={key}/>
              ) : null
            ) : (
              <Route path={item.path} component={item.component} key={key}/>
            );
          })}
        </Switch>
      </div>
    );
  }
}
