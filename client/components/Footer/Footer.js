import './Footer.scss';
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

const version = process.env.version;
class Footer extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    footList: PropTypes.array
  };

  render() {
    const origin = '//www.apicloud.com'
    const footerHTML = `
<div class="billfooter">
    <div class="wrap cf">
        <dl class="footer_first">
            <dt>APICloud产品</dt>
            <dd><a href="${origin}/superwebview">SuperWebView</a></dd>
            <dd><a href="${origin}/deepengine">Deep Engine</a></dd>
            <dd><a href="${origin}/cloudservice">数据云</a></dd>
            <dd><a href="${origin}/cloudmanage">运营云</a></dd>
            <dd><a href="${origin}//app.apicloud.com/customIntroduce">APP定制</a></dd>
            <dd><a href="${origin}/modulestore">模板Store</a></dd>
        </dl>
        <dl class="footer_second">
            <dt>VIP服务</dt>
            <dd><a href="${origin}/vipservice/price">VIP服务</a></dd>
            <dd><a href="${origin}/vipservice/plan">云服务价格</a></dd>
            <dd><a href="${origin}/vipservice/channel">渠道打包</a></dd>
            <dd><a href="${origin}/vipservice/enterpEdition">优先技术支持</a></dd>
            <dd><a href="${origin}/vipservice/course">培训课程</a></dd>
            <dd><a href="${origin}/vipservice/course">认证工程师</a></dd>
        </dl>
        <dl>
            <dt>资源</dt>
            <dd><a href="${origin}//docs.apicloud.com/">文档</a></dd>
            <dd><a target="_blank" href="//docs.apicloud.com/APICloud/videos-and-codes">视频教程</a></dd>
            <dd><a target="_blank" href="//docs.apicloud.com/APICloud/download">SDK下载</a></dd>
            <dd><a target="_blank" href="${origin}/devtools">开发工具</a></dd>
            <dd><a target="_blank" href="${origin}/source_code">源码下载</a></dd>
        </dl>
        <dl>
            <dt>APICloud</dt>
            <dd><a href="${origin}/about">关于我们</a></dd>
            <dd><a target="_blank" href="//docs.apicloud.com/%E5%85%B6%E5%AE%83/terms-of-service">服务条款</a></dd>
            <dd><a target="_blank" href="//docs.apicloud.com/%E5%85%B6%E5%AE%83/privacy-policy">隐私条款</a></dd>
            <dd><a href="${origin}/blog">Blog</a></dd>
        </dl>
        <div class="footer-right">
            <div class="row share">
                <a href="javascript:void(0)" class="share-links weixinImg"></a>
                <a rel="nofollow" href="http://weibo.com/u/5217078032" target="_blank" class="share-links weiboImg"></a>
                <a rel="nofollow" href="http://www.facebook.com/pages/APICloud/327050300803122?fref=ts" target="_blank" class="share-links facebook"></a>
                <a rel="nofollow" href="http://twitter.com/api_cloud" target="_blank" class="share-links twitter"></a>
            </div>
            <div class="qrcode" title="APICloud" /></div>
        </div>
    </div>
    <div class="copyright">
        <label>
            &copy;2014-2016&nbsp;APICloud&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action">京ICP备14027692号</a>&nbsp;&nbsp;&nbsp;&nbsp;京ICP证151131号&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020063" target="_blank">京公网安备 11010802020063号</a>
        </label>
    </div>
</div>`
    return (
      <div className="footer-wrapper" dangerouslySetInnerHTML={{__html:footerHTML}} />
    );
  }
}

Footer.defaultProps = {
  footList: [
    {
      title: 'GitHub',
      iconType: 'github',
      linkList: [
        {
          itemTitle: 'YApi 源码仓库',
          itemLink: 'https://github.com/YMFE/yapi'
        }
      ]
    },
    {
      title: '团队',
      iconType: 'team',
      linkList: [
        {
          itemTitle: 'YMFE',
          itemLink: 'https://ymfe.org'
        }
      ]
    },
    {
      title: '反馈',
      iconType: 'aliwangwang-o',
      linkList: [
        {
          itemTitle: 'Github Issues',
          itemLink: 'https://github.com/YMFE/yapi/issues'
        },
        {
          itemTitle: 'Github Pull Requests',
          itemLink: 'https://github.com/YMFE/yapi/pulls'
        }
      ]
    },
    {
      title: 'Copyright © 2018 YMFE',
      linkList: [
        {
          itemTitle: `版本: ${version} `,
          itemLink: 'https://github.com/YMFE/yapi/blob/master/CHANGELOG.md'
        },
        {
          itemTitle: '使用文档',
          itemLink: 'https://yapi.ymfe.org'
        }
      ]
    }
  ]
};

export default Footer;
