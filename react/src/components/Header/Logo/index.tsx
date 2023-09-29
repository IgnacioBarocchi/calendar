import { FC } from 'react';
import styled from 'styled-components';

const path =
  'M30.723 30.059q-3.418 0-5.293 2.568t-1.875 7.158q0 9.55 7.168 9.55 3.007 0 7.285-1.503v5.078q-3.516 1.465-7.852 1.465-6.23 0-9.531-3.78t-3.3-10.849q0-4.453 1.62-7.803t4.659-5.136 7.119-1.787q4.16 0 8.359 2.011l-1.953 4.922q-1.602-.762-3.223-1.328t-3.183-.566zM52.32 53.984h-5.957v-30.39h5.957v30.39zm29.155 0h-5.957V41.23q0-2.363-.84-3.544t-2.675-1.182q-2.5 0-3.614 1.67t-1.113 5.537v10.273H61.32V32.148h4.55l.802 2.793h.332q.996-1.582 2.744-2.392t3.974-.81q3.81 0 5.782 2.06t1.972 5.947v14.238zm15.797.391q-3.848 0-6.045-2.988t-2.198-8.282q0-5.37 2.237-8.369t6.162-2.998q4.121 0 6.289 3.203h.195q-.449-2.441-.449-4.355v-6.992h5.977v30.39h-4.57l-1.153-2.832h-.254q-2.031 3.223-6.191 3.223zm2.09-4.746q2.285 0 3.35-1.328t1.161-4.512v-.644q0-3.516-1.084-5.04t-3.525-1.523q-1.992 0-3.096 1.69t-1.103 4.912 1.113 4.834 3.184 1.61zm31.245-17.89q1.211 0 2.012.175l-.45 5.586q-.722-.195-1.757-.195-2.852 0-4.444 1.465t-1.591 4.101v11.113h-5.957V32.148h4.511l.88 3.672h.292q1.016-1.836 2.744-2.959t3.76-1.123z';

const LogoContainer = styled.a<{ gridArea: string }>`
  padding-left: 1rem;
  cursor: pointer;
  display: block;
  grid-area: ${({ gridArea }) => gridArea};
  border-bottom: 1px solid ${({ theme }) => theme.palette.foreground.tertiary};
`;

const Logo: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <LogoContainer
      gridArea={gridArea}
      href="https://main--cerulean-gingersnap-166563.netdivfy.app/"
    >
      <svg
        fill="white"
        viewBox="17.325 23.594 115.294 30.781"
        preserveAspectRatio="xMidYMid meet"
        data-bbox="17.325 23.594 115.294 30.781"
        height="45"
        width="135"
        xmlns="http://www.w3.org/2000/svg"
        data-type="shape"
        role="presentation"
        aria-hidden="true"
        aria-label=""
      >
        <g>
          <path d={path}></path>
        </g>
      </svg>
    </LogoContainer>
  );
};

export default Logo;
