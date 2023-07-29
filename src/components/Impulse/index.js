import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const impulse = props => keyframes`
    0% {
        background: ${props.backcolor};
        transform: scale(1);
        animation-timing-function: cubic-bezier(1,0,0.7,1);
    }
    40% {
        background: ${props.frontcolor};
        transform: scale(1.5);
        animation-timing-function: cubic-bezier(0.3,0,0,1);
    }
    72.5% {
        background:${props.backcolor};
        transform: scale(1);
        animation-timing-function: linear;
    }
    100% {
        background: ${props.backcolor};
        transform: scale(1);
    }
`;

const getBalls = ({ countBalls, frontcolor, backcolor, size, sizeunit }) => {
    const balls = [];
    for (let i = 0; i < countBalls; i++) {
        balls.push(
            <Ball
                frontcolor={frontcolor}
                backcolor={backcolor}
                size={size}
                x={i * (size / 5 + size / 5)}
                y={0}
                key={i.toString()}
                index={i}
                sizeunit={sizeunit}
            />,
        );
    }
    return balls;
};

export const ImpulseSpinner = ({ size, frontcolor, backcolor, loading, sizeunit }) => {
    const countBalls = 3;
    return (
        loading && (
            <Wrapper size={size} sizeunit={sizeunit}>
                {getBalls({
                    countBalls,
                    frontcolor,
                    backcolor,
                    size,
                    sizeunit,
                })}
            </Wrapper>
        )
    );
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${props.size}${props.sizeunit}`};
    height: ${props => `${props.size / 5}${props.sizeunit}`};
`;

const Ball = styled.div`
    position: absolute;
    top: ${props => `${props.y}${props.sizeunit}`};
    left: ${props => `${props.x}${props.sizeunit}`};
    width: ${props => `${props.size / 5}${props.sizeunit}`};
    height: ${props => `${props.size / 5}${props.sizeunit}`};
    border-radius: 50%;
    background-color: ${props => props.frontcolor};
    animation: ${impulse} 1.25s linear infinite;
    animation-delay: ${props => props.index * 0.125}s;
`;

ImpulseSpinner.defaultProps = {
    loading: true,
    size: 40,
    frontcolor: "#ff00aa",
    backcolor: "#4b4c56",
    sizeunit: "px",
};

ImpulseSpinner.propTypes = {
    loading: PropTypes.bool,
    size: PropTypes.number,
    frontcolor: PropTypes.string,
    backcolor: PropTypes.string,
    sizeunit: PropTypes.string,
};