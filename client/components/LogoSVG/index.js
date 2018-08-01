import React from 'react';
import PropTypes from 'prop-types';
import apilogo from '../../images/api-logo.png';

const LogoSVG = props => {
  let length = props.length;
    const  svgHTML2 = `<img src="${apilogo}" width="${length}"/>`
  return (
    <div dangerouslySetInnerHTML={{__html:svgHTML2}} />
  );
};


LogoSVG.propTypes = {
  length: PropTypes.any
};

export default LogoSVG;
